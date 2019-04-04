#!/usr/bin/env python3
# coding=UTF-8
'''
@Description: 
@Author: Peng LIU, Zhihao LI
@LastEditors: Peng LIU
@Date: 2019-04-03 16:58:03
@LastEditTime: 2019-04-04 12:08:40
'''
import pandas as pd
import requests
import numpy as np
from flask import Flask
from flask import request
from flask_restplus import Resource, Api
from flask_restplus import fields
from flask_restplus import inputs
from flask_restplus import reqparse
import LogisticRegression as lr

# deal with the records, delete NaN records and seperate into training part & texting part
def dealData():
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
    #print(data.shape)
    #find NaN and remove
    data = data.replace(to_replace = '?',value = np.nan)
    data = data.dropna(how = "any")

    #change "target" column, "0" is NO, "1" is Yes
    data = data.replace(to_replace = {"target":[2,3,4,5,6,7,8,9]},value = 1)

    #calculate number of samples and features
    numSamples,numFeatures = data.shape
    #print(data[1:20])

    #seperate the first 200 records as training set
    data.head(200).to_csv('train.csv')
    #seperate the rest records as testing set
    data.tail(numSamples - 200).to_csv('test.csv')

def readData():
    dataTrain=pd.read_csv("train.csv", usecols=range(3,15))
    dataTrainMatrix=dataTrain.values
    dataTrainMatrix = np.insert(dataTrainMatrix, 0, values=1, axis=1)
    #数据分离，dataMat为x矩阵，第二列到第十一列，共12列
    dataMat = (dataTrainMatrix[:,0:12])
    #数据分离，dataLab为y矩阵，第13列
    dataLab = dataTrainMatrix[:,12:13]
    print(dataMat[1:10]) 

if __name__ == "__main__":
    dealData()
    readData()