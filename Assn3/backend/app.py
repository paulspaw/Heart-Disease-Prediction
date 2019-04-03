import pandas as pd
import requests
from flask import Flask
from flask import request
from flask_restplus import Resource, Api
from flask_restplus import fields
from flask_restplus import inputs
from flask_restplus import reqparse

data = pd.read_csv('./processed.cleveland.data', header = None)
data.columns = ['age', 
                'sex',
                'chest',
                'pressure',
                'serum',
                'sugar',
                'electro',
                'heart',
                'exercise',
                'oldpeak',
                'slope',
                'vessels',
                'thal',
                'target']
print(data)
