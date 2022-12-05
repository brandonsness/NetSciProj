# NetSciProj
This is a individual project done for CS 5483 Network Science at the University of Oklahoma Fall '22. This particular repositiory has two main components. The first is a React app found in src/web-app. You can run it by being in the web-app directory and running the command `npm start`. You will need to run `npm install` before the first run. The second part of the application is the backend using python and Flask. you can run this by being in the src/python directory and running the command `python3 app.py`. With both ends running, you can use the application.

This application takes in the steam ids of users to produce graphs that represent connections between the commonly owned games of the users. The program spits out a graph.gexf file which can be used with the Gephi network application. 

Please note that the user will need to create a config.ini file with your steam api key. I can not supply you a key
