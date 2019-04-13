#!/usr/bin/env python3
# coding=UTF-8
'''
@Description: 
@Author: Peng LIU, Zhihao LI
@LastEditors: Peng LIU
@Date: 2019-04-03 16:58:03
@LastEditTime: 2019-04-13 20:30:38
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
from flask_cors import CORS
import requests

from factors_predict import predict_heart_diease,potential_important_factors,cal

# deal with the records, delete NaN records and seperate into training part & texting part
def dealData(db_file, data_file):
    global clf
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
    data.to_csv('./csvFile/CleanHeart.csv')

    for index, row in data.iterrows():
        info = [(index, row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9], row[10], row[11], row[12], row[13])]
        c.executemany('INSERT INTO ORIGIN VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', info)
    
    #计算潜在的影响性比率
    file = potential_important_factors()
    potential = pd.read_csv(file, header = None)
    tmp = []
    for index,row in potential.iterrows():
        tmp.append(row[1])
    info = tuple(tmp[1:])
    c.executemany('INSERT INTO FACTORS VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,-1)', [info])
    
    #calculate number of samples and features
    #numSamples, numFeatures = data.shape
    clf = predict_heart_diease()
    # #seperate the first 200 records as training set
    # data.head(200).to_csv('train.csv')
    # #seperate the rest records as testing set
    # data.tail(numSamples - 200).to_csv('test.csv')
    # data.to_csv('data.csv')
    conn.commit()
    conn.close()
    return

    conn.commit()
    conn.close()
    return   

def create_db(db_file,table_name):
    conn = sqlite3.connect(db_file)
    c = conn.cursor()

    c.execute(f'DROP TABLE IF EXISTS {table_name}')
    c.execute(f'''CREATE TABLE {table_name}
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
indicator_model = api.model('detail',{
                                            'age':fields.Float, 
                                            'sex':fields.Float,
                                            'chest':fields.Float,
                                            'pressure':fields.Float,
                                            'serum':fields.Float,
                                            'sugar':fields.Float,
                                            'electro':fields.Float,
                                            'heart':fields.Float,
                                            'exercise':fields.Float,
                                            'oldpeak':fields.Float,
                                            'slope':fields.Float,
                                            'vessels':fields.Float,
                                            'thal':fields.Float,
                                            })
create_db('./database/dataSet.db',"ORIGIN")
create_db('./database/dataSet.db',"FACTORS")
dealData('./database/dataSet.db', './csvFile/processed.cleveland.data')


@api.route('/collections')
class collections(Resource):
    @api.response(200, "ok")
    @api.response(404, 'Error')
    @api.expect(indicator_model)
    @api.doc(description="HTTP operation: POST /<collections>")
    def post(self):
        try:
            element = ['age','sex','chest','pressure','serum','sugar','electro','heart','exercise','oldpeak','slope','vessels','thal']
            info = []
            for i in element:
                info.append(api.payload[i])
            pred,pred_proba = cal(clf,info)
            print(pred_proba)
            return {"pred":int(pred[0]),
                    "pred_proba_0":pred_proba[0][0],
                    "pred_proba_1":pred_proba[0][1]}, 200
        except:
            return {'Error': 'DB not established'}, 404

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
            if collection_id != "importance":
                cursor = c.execute(f"SELECT age,sex,{collection_id} FROM ORIGIN")
                for row in cursor:
                    tmp = {'age': row[0], 'sex': row[1], collection_id:row[2]}
                    result.append(tmp)

            elif collection_id == "importance":
                cursor = c.execute(f"SELECT * FROM FACTORS")
                for row in cursor:
                    tmp = {'age': row[1], 'sex': row[2],'chest': row[3], 'pressure': row[4], 
                            'serum': row[5], 'sugar': row[6], 'electro': row[7], 'heart': row[8], 
                            'exercise': row[9], 'oldpeak': row[10], 'slope': row[11], 'vessels': row[12], 
                            'thal': row[13]}
                result.append(tmp)
            return result,200
        except:
            return {'Error': 'DB not established'}, 404



if __name__ == "__main__":
    app.run(debug = True)