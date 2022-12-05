from flask import Flask
from flask_restful import Resource, Api, reqparse
from flask import request
from flask import jsonify
from flask_cors import CORS
import json
import configparser
import networkx as nx
import graphWork as gw

app = Flask(__name__)
#api = Api(app)
CORS(app)

def get_steam_api_key():
    config = configparser.ConfigParser()
    config.read('config.ini')
    return config['steamWebApi']['api']


@app.route('/data', methods=['GET', 'POST'])
def handleUsers():
    if request.method == 'GET':
        response = jsonify({})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    elif request.method == 'POST':
        requestJson = json.loads(request.get_data())
        steam_ids = requestJson['users']
        recent = requestJson['playedRecent']
        timeCheck = requestJson['useTime']
        time_threshold = float(requestJson['threshold'])

        game_id_map = {}
        owned_count = {}
        G = nx.Graph()
        gw.addGamesToGraph(G, steam_ids, game_id_map, owned_count, get_steam_api_key(), recent, timeCheck, time_threshold)

        #add info to the graph nodes
        pagerank = nx.pagerank(G)
        for val in G.nodes():
            G.nodes[val]['cluster'] = owned_count[val]
            G.nodes[val]['pagerank'] = pagerank[val]

        #write out to local file
        nx.write_gexf(G, "graph.gexf")

        response = jsonify({"sounds good man": True})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

if __name__ == '__main__':
    app.run()