from flask import Flask, jsonify
from flask_cors import CORS
from flask import request
import json
import mysql.connector

from assets_local import *


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/test')
def test():
    # get parameters from url:
    aero_capa = float( request.args.get('aero_capa') )
    upper_strength = float( request.args.get('upper_strength') )
    lower_strength = float( request.args.get('lower_strength') )
    balance = float( request.args.get('balance') )
    # iterations = int( request.args.get('iterations') )
    print("User profile: [" + str(aero_capa) + ', ' + str(upper_strength) + ', ' + str(lower_strength) + ', ' + str(balance) + ']')
    
    exercises = load_exercises()

    program, vec_aero_capa, vec_upper_strength, vec_lower_strength, vec_balance, vec_cumul_reward = get_training_week(aero_capa, upper_strength, lower_strength, balance, exercises, iterations=1)
    # print(program)    

    return jsonify(program)


@app.route('/load_exercises')
def load_exercises():
    # cnx = mysql.connector.connect(user='root', password='root', host='localhost', database='fshd', port=8889)
    cnx = mysql.connector.connect(user='fshd_user', password='abcd1234', host='localhost', database='fshd', port=3306)
    cursor = cnx.cursor()
    query = "SELECT * FROM exercices WHERE id != 0"
    # query_prod = "SELECT * FROM exercices WHERE get = 1"
    cursor.execute(query)
    rows = cursor.fetchall()
    
    # Processing:
    exercises = []
    fields_names = [description[0] for description in cursor.description]
    for row in rows:
        exo = dict()
        for f in range(len(fields_names)):
            exo.__setitem__(fields_names[f], row[f])
        exercises.append(exo)

    print(exercises)
    return exercises



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)