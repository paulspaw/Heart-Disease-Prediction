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
    conn = sqlite3.connect(db_file)
    c = conn.cursor()

    c.execute('DROP TABLE IF EXISTS INFO')
    c.execute('''CREATE TABLE INFO 
        (    PERSON    INT    PRIMARY KEY    NOT NULL,
             AGE       FLOAT,
             SEX       INT, 
             CHEST     INT,
             PRESSURE  FLOAT,
             SERUM     FLOAT,
             SUGAR     INT,
             ELECTRO   INT,
             HEART     FLOAT,
             EXERCISE  INT,
             OLDPEAK   FLOAT,
             SLOPE     FLOAT,
             VESSELS   FLOAT,
             THAL      FLOAT,
             TARGET    INT
        );''')
    conn.commit()
    conn.close()
    return

def data_cleaning(data_file):
    create_db('./db/info.db')
    
    conn = sqlite3.connect('./db/info.db')
    c = conn.cursor()

    data = pd.read_csv(data_file, header=None)
    data.columns = ['age', 'sex', 'chest', 'pressure', 'serum', 'sugar',
                'electro', 'heart', 'exercise', 'oldpeak', 'slope',
                'vessels', 'thal', 'target']
    result = []
    for index, row in data.iterrows():
        # person
        # int
        person = index

        # age
        # float
        age = float(row[0])

        # sex (1 = male; 0 = female)
        # int
        sex = int(row[1])
        

        # chest pain type 
        # (1=typical angina 典型 ,2=atypical angina 非典型 ,3=non-anginal pain 非心绞痛 ,4=asymptomatic 无临床症状)
        # int
        chest = int(row[2])

        # resting blood pressure 静息血压
        # float
        pressure = float(row[3])

        # serum cholestoral in mg/dl 血清胆汁淤青
        # float
        serum = float(row[4])

        # fasting blood sugar > 120 mg/dl, 0.0: normal, 1.0: fasting 空腹血糖
        # int
        sugar = int(row[5])

        # resting electrocardiographic results (0=normal, 1=having ST-T wave abnormality 
        # (T wave inversions and/or ST elevation or depression of > 0.05 mV),
        # 2=showing probable or definite left ventricular hypertrophy by Estes’ criteria)
        # int
        electro = int(row[6])

        # maximum heart rate achieved 最大心率
        # float
        heart = float(row[7])

        # exercise induced angina 0.0: True, 1.0: False 运动引发的心绞痛
        # int
        exercise = int(row[8])

        # oldpeak = ST depression induced by exercise relative to rest 由与相对休息有明显差异的运动诱导的ST段压低
        # float
        oldpeak = float(row[9])

        # the slope of the peak exercise ST segment 运动高峰期的ST段斜率
        # float
        slope = float(row[10])

        # number of major vessels (0-3) colored by flourosopy 被透视荧光检查（flourosopy）标注颜色的大血管的数量 (0-3)
        # float
        if row[11] == '?':
            continue
        vessels = float(row[11])

        # thal(Thalassemia): 3 = normal; 6 = fixed defect; 7 = reversable defect 
        # 地中海贫血症 3 = 正常; 6 = 固有缺陷; 7 = 可修复缺陷
        # float
        if row[12] == '?':
            continue
        thal = float(row[12])

        #  target: have disease or not (0=no,otherwise yes). 心脏病的诊断 (冠状动脉疾病状态)
        # int
        if int(row[13]) == 0:
            target = 0
        else:
            target = 1

    return


data_cleaning('./processed.cleveland.data')


