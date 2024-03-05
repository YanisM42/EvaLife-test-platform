from flask import Flask, jsonify
from flask_cors import CORS
from flask import request
import json

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
    print("User profile: [" + str(aero_capa) + ', ' + str(upper_strength) + ', ' + str(lower_strength) + ', ' + str(balance) + ']')
    # program, vec_aero_capa, vec_upper_strength, vec_lower_strength, vec_balance, vec_cumul_reward = test_algorithm(aero_capa, upper_strength, lower_strength, balance)
    # print("ret value: " + str(program))
    return jsonify(aero_capa)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)