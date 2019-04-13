#!/usr/bin/env python3
# coding=UTF-8
'''
@Description: 
@Author: Peng LIU
@LastEditors: Peng LIU
@Date: 2019-04-13 12:32:48
@LastEditTime: 2019-04-13 14:31:51
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
    global X, Y
    df = pd.read_csv("./csvFile/CleanHeart.csv")
    df = df.drop(columns = ['Unnamed: 0'])

    f, ax = plt.subplots(figsize=(5, 5))
    corrmat = df.corr()
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
    return X_train, X_test, Y_train, Y_test, gbr


def potential_important_factors(X_train, X_test, Y_train, Y_test, gbr):

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

def predict_heart_diease(X_train, X_test, Y_train, Y_test, gbr):

    #创建逻辑回归模型
    clf = LogisticRegression(solver='liblinear')
    #训练数据
    clf.fit(X_train, Y_train)
    #模型评估：准确率
    model_accur = clf.score(X_test,Y_test)
    #预测值
    pred = clf.predict(X_test)
    pred_proba = clf.predict_proba(X_test)

    rmse = np.sqrt(mean_squared_error(Y_test, pred))
    score = r2_score(Y_test,pred)

    print("SCORE:")
    print(cross_val_score(clf, X_train, Y_train, cv=5))
    print('\nRMSE:')
    print(rmse)
    print("\nR^2:")
    print(score)
    print('\ncoefficient:')
    print(clf.coef_)
    print('\nintercept:')
    print(clf.intercept_)

if __name__ == "__main__":
    X_train, X_test, Y_train, Y_test, gbr = dataDeal()
    potential_important_factors(X_train, X_test, Y_train, Y_test, gbr)
    predict_heart_diease(X_train, X_test, Y_train, Y_test, gbr)