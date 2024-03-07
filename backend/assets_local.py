import sys

ALG_DIR = '/Users/yanismarchand/Documents/physical-activity-recommendation/'
sys.path.append(ALG_DIR)

import matplotlib.pyplot as plt
import numpy as np
# import sys

from stable_baselines3.common.env_checker import check_env

from stable_baselines3 import PPO
from stable_baselines3.common.env_util import make_vec_env
from stable_baselines3.common.vec_env import DummyVecEnv

from User import User

from EnvV1 import EnvV1

import json
from assets import *
from characterisations import characterisations

def display_profile(a, us, ls, b):
    vec = np.array([a, us, ls, b], dtype='float')
    print(vec)
    return np.min(vec)

def test_algorithm(a, us, ls, b, interactive=False, iterations=2):
    # Opening JSON file
    with open('out.json') as json_file:
        exercises = json.load(json_file)

    # A model has to be stored:
    print("=== Use stored model ===")
    trained_model_name = "4qualities"
    print("Will use: " + str(trained_model_name))
    model = PPO.load(trained_model_name)
    
    user_test = User(a, us, ls, b)
    # outdir = './output/'
    # filename = 'a_' + str(user_test.getAeroCapa()) + '-ls_' + str(user_test.getLowerStrength()) + '-us_' + str(user_test.getUpperStrength()) + '-b_' + str(user_test.getBalance())
    # f = open(outdir + filename + '.txt', "w")
    program = []
    
    vec_env_test = make_vec_env(
        EnvV1,
        n_envs=1,
        env_kwargs={
            "user": user_test,
            "characterisations": characterisations,
            # "outTextFile": f,
            "program": program,
            "exercises": exercises,
            "test": True
        }
    )    

    obs = vec_env_test.reset()
    # vec_env.render()

    # declare vectors to store values
    vec_aero_capa = np.zeros(iterations + 1,)
    vec_upper_strength = np.zeros(iterations + 1,)
    vec_lower_strength = np.zeros(iterations + 1,)
    vec_balance = np.zeros(iterations + 1,)
    vec_cumul_reward = np.zeros(iterations + 1,)

    # initialise vectors
    vec_aero_capa[0] = obs[0][0]
    vec_upper_strength[0] = obs[0][1]
    vec_lower_strength[0] = obs[0][2]
    vec_balance[0] = obs[0][3]
    vec_cumul_reward[0] = 0

    cumul_reward = 0

    for i in range(iterations):
        print("\n\n###############################################")
        print("\n################### Week " + str(i) + " ###################")

        user_qualities = np.array([obs[0][0], obs[0][1], obs[0][2]], obs[0][3])
        
        action, _states = model.predict(obs, deterministic=False)

        # Collect feedback:
        if (interactive):
            env1 = vec_env_test.envs[0]
            env1.unwrapped.collect_feedback(exercise)

        obs, reward, done, info = vec_env_test.step(action)
        print("State of program variable: " + str(program))

        # carry_on = input("Shall we carry on? [y/N] ")
        # if (carry_on == 'N' or carry_on == 'n'):
        #     return

        user_qualities = np.array([obs[0][0], obs[0][1], obs[0][2], obs[0][3]]) # update after session
        # write_info_to_file(f, i, user_qualities, target_characterisation, exercise, diff, level, maxLevel)
        print('\nUser profile after session: [' + '%.3f'%(user_qualities[0]) + ', ' + '%.3f'%(user_qualities[1]) + ', ' + '%.3f'%(user_qualities[2]) + ', ' + '%.3f'%(user_qualities[3]) + ']')
        # user_carac = '\n    User profile after session: [' + '%.3f'%(user_qualities[0]) + ', ' + '%.3f'%(user_qualities[1]) + ', ' + '%.3f'%(user_qualities[2]) + ', ' + '%.3f'%(user_qualities[3]) + ']\n'
        # f.write(user_carac)

        # update values
        cumul_reward = reward[0]
        new_aero_capa = obs[0][0]
        new_upper_strength = obs[0][1]
        new_lower_strength = obs[0][2]
        new_balance = obs[0][3]

        # update vectors
        vec_aero_capa[i+1] = new_aero_capa
        vec_upper_strength[i+1] = new_upper_strength
        vec_lower_strength[i+1] = new_lower_strength
        vec_balance[i+1] = new_balance
        vec_cumul_reward[i+1] = cumul_reward

        # print("obs =", obs, "reward=", reward, "done =", done)
        # vec_env.render()
        if done:
            print("Goal reached!", "reward=", reward)
            break
    print("Number of weeks: " + str(len(program)))
    for w in range(len(program)):
        print(" - Week " + str(w+1) + ": ")
        week = program[w]
        for ses in range(len(week)):
            print("    o Session " + str(ses+1) + ": ")
            sessionx = week[ses]['session']
            print_session( destructure_session(sessionx) )
    return program, vec_aero_capa, vec_upper_strength, vec_lower_strength, vec_balance, vec_cumul_reward
