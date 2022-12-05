from flask import Flask
from flask_restful import Resource, Api, reqparse
from flask import request
from flask import jsonify
import requests
import json
import networkx as nx
from datetime import datetime



app = Flask(__name__)
api = Api(app)

user_data_path = '../../data/users.csv'

@app.route('/users', methods=['GET', 'POST'])
def handleUsers():
    if request.method == 'GET':
        response = jsonify({})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    elif request.method == 'POST':
        return {}, 200

if __name__ == '__main__':
    app.run()