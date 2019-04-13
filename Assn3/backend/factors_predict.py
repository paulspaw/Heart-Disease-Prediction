#!/usr/bin/env python3
# coding=UTF-8
'''
@Description: 
@Author: Peng LIU
@LastEditors: Peng LIU
@Date: 2019-04-13 12:32:48
@LastEditTime: 2019-04-13 18:49:18
'''
import matplotlib
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns
from prettytable import PrettyTable
from sklearn import neighbors
from sklearn.datasets import make_regression
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.model_selection import cross_val_score, train_test_split
from sklearn.preprocessing import LabelEncoder


def dataDeal():
    df = pd.read_csv("./csvFile/CleanHeart.csv")
    df = df.drop(columns = ['Unnamed: 0'])

    f, ax = plt.subplots(figsize=(5, 5))
    corrmat = df.corr()
    #print(corrmat)
    sns.heatmap(corrmat, vmax=.8, square=True)
    fig = matplotlib.pyplot.gcf()
    fig.set_size_inches(18.5, 10.5)
    fig.savefig('./image/Q2_image.png')

    X = df.drop(['target'], axis=1)
    Y = df.target
    X = pd.get_dummies(data=X)

    alldata = train_test_split(X,Y, test_size=0.3)
    X_train, X_test, Y_train, Y_test = alldata
    gbr = GradientBoostingRegressor(loss ='ls', max_depth=6)
    return X, Y, X_train, X_test, Y_train, Y_test, gbr


def potential_important_factors():
    X, Y, X_train, X_test, Y_train, Y_test, gbr = dataDeal()
    gbr.fit (X_train, Y_train)
    predicted = gbr.predict(X_test)
    rmse = np.sqrt(mean_squared_error(Y_test, predicted))
    scores = cross_val_score(gbr, X, Y, cv=12)

    # print('\nCross Validation Scores:')
    # print(scores)
    # print('\nMean Score:')
    # print(scores.mean())
    # print('\nRMSE:')
    # print(rmse)

    cdf = pd.DataFrame(data = gbr.feature_importances_, index = X.columns, columns = ['Importance'])
    cdf.to_csv('./csvFile/importance.csv')

from sklearn import preprocessing
def predict_heart_diease(info):
    _, _, X_train, X_test, Y_train, Y_test, gbr = dataDeal()
    #创建逻辑回归模型
    clf = LogisticRegression(solver='liblinear')
    #训练数据
    clf.fit(X_train, Y_train)
    #模型评估：准确率
    model_accur = clf.score(X_test,Y_test)
    # print(model_accur)
    # 预测值
    # pred = clf.predict(X_test)
    # pred_proba = clf.predict_proba(X_test)

    # rmse = np.sqrt(mean_squared_error(Y_test, pred))
    # score = r2_score(Y_test,pred)

    arr = dealInfo(info)
    pred = clf.predict(arr)
    pred_proba = clf.predict_proba(arr)
    
    return pred,pred_proba,model_accur
    #result = clf.predict(info)
    #return result

    # coefficient = clf.coef_
    # intercept = clf.intercept_
    # print("SCORE:")
    # print(cross_val_score(clf, X_train, Y_train, cv=5))
    # print('\nRMSE:')
    # print(rmse)
    # print("\nR^2:")
    # print(score)
    #print('\ncoefficient:')
    #print(clf.coef_)
    # print('\nintercept:')
    # print(clf.intercept_)
def dealInfo(info):
    result = []
    for e in info:
        result.append([e])
    result = np.array(result).T
    return result
# if __name__ == "__main__":
#     #potential_important_factors()
#     info = [63,	1,	4,	130,	254,	0,	2,	147,	0,	1.4	,2,	1,	7]
#     pred,pred_proba,e=predict_heart_diease(info)
#     print(pred,pred_proba,e)