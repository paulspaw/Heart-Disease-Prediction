#!/usr/bin/env python3
# coding=UTF-8
'''
@Description: 
@Author: Peng LIU, Zhihao LI
@LastEditors: Peng LIU
@Date: 2019-04-03 16:58:03
@LastEditTime: 2019-04-10 16:48:33
'''
import pandas as pd
import requests
import numpy as np
import sqlite3
from flask import Flask
from flask import request
from flask_restplus import Resource, Api
from flask_restplus import fields
from flask_restplus import inputs
from flask_restplus import reqparse
import LogisticRegression as lr
from flask_cors import CORS

# deal with the records, delete NaN records and seperate into training part & texting part
def dealData(db_file, data_file):
    conn = sqlite3.connect(db_file)
    c = conn.cursor()

    data = pd.read_csv(data_file, header = None)
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
    #print(data.shape)
    #find NaN and remove
    data = data.replace(to_replace = '?',value = np.nan)
    data = data.dropna(how = "any")

    #change "target" column, "0" is NO, "1" is Yes
    data = data.replace(to_replace = {"target":[2,3,4,5,6,7,8,9]},value = 1)

    for index, row in data.iterrows():
        info = [(index, row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9], row[10], row[11], row[12], row[13])]
        c.executemany('INSERT INTO ORIGIN VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', info)

    #calculate number of samples and features
    numSamples,numFeatures = data.shape
    #print(data[1:20])

    #seperate the first 200 records as training set
    data.head(200).to_csv('train.csv')
    #seperate the rest records as testing set
    data.tail(numSamples - 200).to_csv('test.csv')
    conn.commit()
    conn.close()
    return

def readData():
    dataTrain=pd.read_csv("train.csv", usecols=range(3,15))
    dataTrainMatrix=dataTrain.values
    dataTrainMatrix = np.insert(dataTrainMatrix, 0, values=1, axis=1)
    #数据分离，dataMat为x矩阵，第二列到第十一列，共12列
    dataMat = (dataTrainMatrix[:,0:12])
    #数据分离，dataLab为y矩阵，第13列
    dataLab = dataTrainMatrix[:,12:13]
    print(dataMat[1:10]) 

def create_db(db_file):
    conn = sqlite3.connect(db_file)
    c = conn.cursor()

    c.execute('DROP TABLE IF EXISTS ORIGIN')
    c. execute('''CREATE TABLE ORIGIN
        (person    INT    PRIMARY KEY    NOT NULL,
         age       FLOAT,
         sex       FLOAT,
         chest     FLOAT,
         pressure  FLOAT,
         serum     FLOAT,
         sugar     FLOAT,
         electro   FLOAT,
         heart     FLOAT,
         exercise  FLOAT,
         oldpeak   FLOAT,
         slope     FLOAT,
         vessels   FLOAT,
         thal      FLOAT,
         target    FLOAT
        );''')

    conn.commit()
    conn.close()
    return


app = Flask(__name__)
CORS(app)
api = Api(app,
          default="Heart Disease",  # Default namespace
          title="Heart Disease detection",  # Documentation Title
          description="This is just a simple example to show how publish data as a service.")

create_db('./database/dataSet.db')
dealData('./database/dataSet.db', './processed.cleveland.data')

@api.route('/collections')
class collections(Resource):

    @api.response(200, "ok")
    @api.response(404, 'Error')
    @api.doc(description="HTTP operation: GET /<collections>")
    def get(self):
        try:
            conn = sqlite3.connect('./database/dataSet.db')
            c = conn.cursor()

            result = []
            cursor = c.execute(f'SELECT * FROM ORIGIN;')
            for row in cursor:
                info = {
                    'chest': row[3], 'pressure': row[4], 'serum': row[5], 'sugar': row[6], 
                    'electro': row[7], 'heart': row[8], 'exercise': row[9], 'oldpeak': row[10], 
                    'slope': row[11], 'vessels': row[12], 'that': row[13]
                    }
                temp = {'person': row[0], 'age': row[1], 'sex': row[2], 'target': row[14], 'info': info}
                result.append(temp)
                
            conn.commit()
            conn.close()
            return result, 200
        except:
            return {'Error': 'DB not established'}, 404

@api.route("/collections/<collection_id>")
class Collection_id(Resource):
    @api.response(200, "ok")
    @api.response(404, 'Error')
    @api.doc(description="HTTP operation: GET /<collections>/<collection_id>")
    
    def get(self,collection_id):
        try:
            conn = sqlite3.connect('./database/dataSet.db')
            c = conn.cursor()

            result = []
            cursor = c.execute(f"SELECT age,sex,{collection_id} FROM ORIGIN")
            for row in cursor:
                tmp = {'age': row[0], 'sex': row[1],collection_id:row[2]}
                result.append(tmp)
            return result,200
        except:
            return {'Error': 'DB not established'}, 404

if __name__ == "__main__":
    app.run(debug = True)
