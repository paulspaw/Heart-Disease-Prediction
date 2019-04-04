#!/usr/bin/env python3
# coding=UTF-8
'''
@Description: 
@Author: Peng LIU, Zhihao LI
@LastEditors: Peng LIU
@Date: 2019-04-03 16:58:03
@LastEditTime: 2019-04-04 11:23:21
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
    data = data.replace(to_replace='?',value=np.nan)
    data = data.dropna(how = "any")

    #calculate number of samples and features
    numSamples,numFeatures = data.shape
    
    #读取前200行为训练集
    data.head(200).to_csv('train.csv')
    #读取剩余行为测试集
    data.tail(numSamples - 200).to_csv('test.csv')

if __name__ == "__main__":
    dealData();