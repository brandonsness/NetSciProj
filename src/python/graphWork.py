import requests
import json
import networkx as nx
from datetime import datetime

#Returns the json of the steam games owned by the specified player
def getPlayerGames(steamid, API_KEY):
    response = requests.get(f"https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key={API_KEY}&steamid={steamid}&include_appinfo=True&include_played_free_games=True")
    return response.json()

def getCommonGames(player1, player2):
    common = []
    for game1 in player1:
        if game1 in player2:
            common.append(game1)
    return common

def getWeight(game1, game2, lastPlayed, gameTimes, player1, player2, p1games, p2games, recent, timeCheck, time_threshold):
    total = 0
    timestamp = int(datetime.timestamp(datetime.now()))
    
    #Get indicies for both players
    p1g1idx = p1games.index(game1)
    p2g1idx = p2games.index(game1)
    p1g2idx = p1games.index(game2)
    p2g2idx = p2games.index(game2)
    
    #get last times
    p1g1last = lastPlayed[player1][p1g1idx]
    p2g1last = lastPlayed[player2][p2g1idx]
    p1g2last = lastPlayed[player1][p1g2idx]
    p2g2last = lastPlayed[player2][p2g2idx]
    last_times = [p1g1last, p2g1last, p1g2last, p2g2last]
    
    #get total times
    p1g1total = gameTimes[player1][p1g1idx]
    p2g1total = gameTimes[player2][p2g1idx]
    p1g2total = gameTimes[player1][p1g2idx]
    p2g2total = gameTimes[player2][p2g2idx]
    total_times = [p1g1total, p2g1total, p1g2total, p2g2total]
    
    #If we want to wight recent or not
    if (recent):
        for time in last_times:
            timeCheck = timestamp - time
            if timeCheck < 1209600: #two weeks unix time
                total += 0.25
    if (timeCheck):
        for time in total_times:
            if (time > time_threshold*60):
                total += 0.25
        
    
    return total

#Gets all the player games and adds them as nodes
def addGamesToGraph(G, players, game_id_map, owned_count, API_KEY, recent, timeCheck, time_threshold):
    player_games = {}
    player_gametimes = {}
    player_last_played = {}

    #Nodes
    for player in players:
        gamejson = getPlayerGames(player, API_KEY)
        games = [i['name'] for i in gamejson['response']['games']]
        game_ids = [i['appid'] for i in gamejson['response']['games']]
        gametimes = [i['playtime_forever'] for i in gamejson['response']['games']]
        gamelasttime = [i['rtime_last_played'] for i in gamejson['response']['games']]
        player_games[player] = games
        player_gametimes[player] = gametimes
        player_last_played[player] = gamelasttime
        #len(games)
        for i, v in enumerate(games):
            game_id_map[v] = game_ids[i]
            if v in owned_count.keys():
                owned_count[v] += 1
            else:
                owned_count[v] = 1
        
        G.add_nodes_from(games)
    #Edges
    playercounted = []
    for player, games in player_games.items():
        playercounted.append(player)
        
        #Get second player
        for pl, gm in player_games.items():
            #Don't double count
            if pl in playercounted:
                continue
            common = getCommonGames(games, gm)
            
            for game1 in common:
                for game2 in common:
                    #No self loops
                    if game1 == game2:
                        continue
                    weight_factor = getWeight(game1, game2, player_last_played, player_gametimes, player, pl, games, gm, recent, timeCheck, time_threshold)
                    #Increase weight if multiple people own both games
                    if (game1, game2) in G.edges:
                        #recently played: 
                        G[game1][game2]['weight'] += 1 + weight_factor
                    #Edge if two or more people own the two specified games
                    else:
                        G.add_edge(game1, game2, weight=1 + weight_factor)
    G.remove_nodes_from(list(nx.isolates(G)))