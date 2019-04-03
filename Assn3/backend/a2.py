'''
COMP9321 2019 Term 1 Assignment Two Code Template
Student Name:
Student ID:
'''

import re
from datetime import datetime
import sqlite3
import json
import pandas as pd
import requests
from flask import Flask
from flask import request
from flask_restplus import Resource, Api
from flask_restplus import fields
from flask_restplus import inputs
from flask_restplus import reqparse


def create_db(db_file):
    '''
    uase this function to create a db, don't change the name of this function.
    db_file: Your database's name.
    '''
    conn = sqlite3.connect(db_file)
    c = conn.cursor()

    c.execute('DROP TABLE IF EXISTS CHILD;')
    c.execute('DROP TABLE IF EXISTS PARENT;')

    c.execute('''CREATE TABLE CHILD
        (   ID         INT     PRIMARY KEY    NOT NULL,
            COUNTRY    STRING                         ,
            DATE       STRING                         ,
            VALUE      FLOAT                          ,
            ENTRIES_ID INT                    NOT NULL
        );''')

    c.execute('''CREATE TABLE PARENT
        (  COLLECTION_ID      INT     PRIMARY KEY    NOT NULL,
           INDICATOR          TEXT                   NOT NULL,
           INDICATOR_VALUE    TEXT                   NOT NULL,
           CREATION_TIME      STRING                 NOT NULL,
           ENTRIES            INT                    NOT NULL,
           FOREIGN KEY(ENTRIES)       REFERENCES     CHILD(ID)
        );''')

    conn.commit()
    conn.close()
    return

'''
Put your API code below. No certain requriement about the function name as long as it works.
'''

# create_db("bank.db")

app = Flask(__name__)
api = Api(app,
          default="World_Bank",  # Default namespace
          title="World_Bank Dataset",  # Documentation Title
          description="This is just a simple example to show how publish data as a service.")

entries_model = api.model('entries', {
    'country': fields.String,
    'date': fields.Integer,
    'value': fields.Float
})

data_model = api.model('World_Bank', {
    'collection_id': fields.String,
    'indicator': fields.String('change id here'),
    'indicator_value': fields.Float,
    'creation_time': fields.String,
    'entries': fields.List(fields.Nested(entries_model))
})

create_db("bank.db")

@api.route('/collections')
class Q1Q3(Resource):

    @api.response(200, "ok")
    @api.response(404, 'Error')
    @api.doc(description="HTTP operation: GET /<collections>")
    def get(self):
        try:
            conn = sqlite3.connect('bank.db')
            c = conn.cursor()
            
            result = []
            collections = []
            cursor1 = c.execute(f'SELECT collection_id, indicator, creation_time from PARENT;')
            for row in cursor1:
                collections.append(row[0])
                indicator = row[1]
                creation_time = row[2]
            for collection in collections:
                print(collection)
                cursor2 = c.execute(f'SELECT CHILD.id from CHILD INNER JOIN PARENT ON CHILD.entries_id = PARENT.entries where PARENT.collection_id={collection}')
                for item in cursor2:
                    temp = {"location" : f"/<{collection}>/<{item[0]}>",
                            "collection_id" : f"{item[0]}",
                            "creation_time": f"{creation_time}",
                            "indicator": f"{indicator}" }
                    result.append(temp)
            conn.commit()
            conn.close()
            return result, 200    
        except:
            return {'Error': 'DB not established'}, 404        

    @api.response(200, "Ok")
    @api.response(201, 'Created')
    @api.response(404, 'Error') 
    @api.doc(description="HTTP operation: POST /<collections>")
    @api.expect(data_model)
    def post(self): #Q1 POST
        try:
            indicator_id = api.payload['indicator']
            url1 = f"http://api.worldbank.org/v2/countries/all/indicators/{indicator_id}?date=2013:2018&format=json&page=1"
            url2 = f"http://api.worldbank.org/v2/countries/all/indicators/{indicator_id}?date=2013:2018&format=json&page=2"
            rawData1 = requests.get(url=url1)
            rawData2 = requests.get(url=url2)
            dataSet = rawData1.json()[1] + rawData2.json()[1]

            conn = sqlite3.connect('bank.db') 
            c = conn.cursor() 

            count = 0
            cursor = c.execute("SELECT INDICATOR from PARENT")       
            for row in cursor:
                if row[0] == indicator_id:
                    conn.commit()
                    conn.close()
                    return {'Ok': 'Indicator already has imported'}, 200
                count += 1

        
            collection_id = count+1
            indicator = indicator_id
            indicator_value = dataSet[0]['indicator']['value']
            creation_time = str(datetime.now())
            info = [(collection_id, indicator, indicator_value, creation_time, collection_id)]
            c.executemany('INSERT INTO PARENT VALUES (?,?,?,?,?)', info)
            conn.commit()

            id = 0
            cursor = c.execute("SELECT * FROM CHILD")
            for row in cursor:
                id += 1

            for data in dataSet:
                country = data['country']['value']
                date = data['date']
                value = data['value']
                info = [(id, country, date, value, collection_id)]
                
                c.executemany('INSERT INTO CHILD VALUES (?, ?, ?, ?, ?)', info)
                id += 1
            conn.commit()
            conn.close()
            return {'Created': 'Indicator created'}, 201

        except:
            return {'Errors': "the input indicator id doesn't exist in the data source"}, 404


@api.response(200, 'Ok')
@api.response(404, 'Error')
@api.route('/collections/<collection_id>')
class Q2Q4(Resource):
    @api.doc(description="HTTP operation: DELETE /<collections>/{collection_id}")
    def delete(self, collection_id):
        # try:
        conn = sqlite3.connect('bank.db')
        c = conn.cursor()

        cursor = c.execute(f'SELECT id FROM CHILD INNER JOIN PARENT ON CHILD.entries_id = PARENT.entries WHERE PARENT.collection_id={collection_id}')
        for row in cursor:
            c.execute(f"DELETE from CHILD where id={row[0]};")

        c.execute(f"DELETE from PARENT where collection_id={collection_id};")
        conn.commit()
        conn.close()
        return {"message" : f"Collection = <{collection_id}> is removed from the database!"}, 200
        # except:
        #     return {'Error': 'DB not established or ID not exists'}, 404

    @api.doc(description="HTTP operation: GET /<collections>/{collection_id}")
    def get(self, collection_id):
        try:    
            conn = sqlite3.connect("bank.db")
            c = conn.cursor()

            entry = []
            cursor = c.execute(f'SELECT CHILD.country, CHILD.date, CHILD.value FROM CHILD INNER JOIN PARENT ON CHILD.entries_id = PARENT.entries WHERE PARENT.collection_id={collection_id}')
            for row in cursor:
                temp = {'country': row[0], 'date': row[1], 'value': row[2]}
                entry.append(temp)
            
            result = []
            cursor = c.execute(f"SELECT indicator, indicator_value, creation_time FROM PARENT WHERE collection_id={collection_id}")
            for row in cursor:
                temp = {'collection_id': collection_id, 'indicator': row[0], 'indicator_value': row[1], 'creation_time': row[2], 'entries': entry}
                result.append(temp)

            return result, 200
        except:
            return {'Error': 'DB not established or collection_id not exists'}, 404


@api.response(200, 'Ok')
@api.response(404, 'Error')
@api.route('/collections/<collection_id>/<country>/<year>')
class Q5(Resource):
    @api.doc(description="HTTP operation: GET /<collections>/{collection_id}/{year}/{country}")
    def get(self, collection_id, country, year):
        try:
            conn = sqlite3.connect("bank.db")
            c = conn.cursor()

            result = []

            cursor1 = c.execute(f"SELECT indicator FROM PARENT WHERE collection_id={collection_id}")
            for row1 in cursor1:
                cursor2 = c.execute(f'''SELECT country, date, CHILD.value FROM CHILD WHERE entries_id={collection_id} and date={year}''')
                for row2 in cursor2:
                    if row2[0] == country:
                        temp = { "collection_id": collection_id, "indicator": row1[0], "country": row2[0], "year": row2[1], "value": row2[2] }
                        result.append(temp)
            return result, 200

        except:
            return({'Error': 'DB not established'}), 404


parser = reqparse.RequestParser()
parser.add_argument("query", type=str, help='Format should be topN or bottomN', required=False)

@api.response(200, 'Ok')
@api.response(404, 'Error')
@api.route('/collections/<collection_id>/<year>')
class Q6(Resource):
    @api.expect(parser, validate=True)
    @api.doc(description="HTTP operation: GET /<collections>/{collection_id}/{year}?q=<query>")
    def get(self, collection_id, year):
        try:
            conn = sqlite3.connect('bank.db')
            c = conn.cursor()

            args = parser.parse_args()
            key = args.get('query')
            if key == None:
                return {'Error': 'Invalid query'}, 404

            query_num = int(re.search(r"[0-9]+", key).group())
            query_pos = str(re.search(r"[a-z]+", key, re.I).group())
            if query_num < 1 or query_num >= 100:
                return {'Error': 'Invalid query'}, 404
            if query_pos != "top" and query_pos != "Top" and query_pos != "bottom" and query_pos != "Bottom":
                return {'Error': 'Invalid query'}, 404

            entry = []
            cursor = c.execute(f"SELECT country, date, value FROM CHILD WHERE entries_id={collection_id} and date={year}")
            for row in cursor:
                temp = {'country': row[0], 'date': row[1], 'value': row[2]}
                entry.append(temp)

            entry = sorted(entry, key=lambda k: k['value'], reverse=True)
            if query_pos == 'top' or query_pos == 'Top':
                if len(entry) >= query_num:
                    entry = entry[0:query_num]
            else:
                if len(entry) >= query_num:
                    query_num = -1-query_num
                    entry = entry[-1:query_num:-1]
                else:
                    entry = entry[::-1]

            result = []
            cursor = c.execute(f"SELECT indicator, indicator_value FROM PARENT WHERE collection_id={collection_id}") 
            for row in cursor:
                temp = {'indicator': row[0], 'indicator_value': row[1], 'entries': entry}
                result.append(temp)

            return result, 200  

        except:
            return {'error': 'DB not established'}, 404   


if __name__ == '__main__':
    app.run(debug=True)
            




