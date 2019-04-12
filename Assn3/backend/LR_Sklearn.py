#!/usr/bin/env python3
# coding=UTF-8
'''
@Description: 
@Author: Peng LIU
@LastEditors: Peng LIU
@Date: 2019-04-12 19:24:46
@LastEditTime: 2019-04-12 20:25:58
'''

from sklearn.linear_model import LogisticRegression
from sklearn.metrics import confusion_matrix
import pandas as pd
import numpy as np

def dataNormalization(filename):
    exdata = pd.read_csv(filename)
    # 开始进行数据处理【没有缺失值】
    nor = [1, 4, 5, 8, 10, 12, 11]  # 标准化处理
    oh = [3, 7, 13, 14] # one_hot编码
    binary = [15]  # 原始类别为1的依然为1类，原始为2的变为0类

    keylist = exdata.keys()
    newexdata = pd.DataFrame()
    for ikey in range(len(keylist)):
        if ikey + 1 in nor:
            newexdata[keylist[ikey]] = (exdata[keylist[ikey]] - exdata[keylist[ikey]].mean()) / exdata[keylist[ikey]].std()
        elif ikey + 1 in binary:
            newexdata[keylist[ikey]] = [1 if inum == 1 else 0 for inum in exdata[keylist[ikey]]]      
        elif ikey + 1 in oh:
            newdata = pd.get_dummies(exdata[keylist[ikey]], prefix=keylist[ikey])
            newexdata = pd.concat([newexdata,newdata], axis=1)
    Data = newexdata.values
    #print(Data)
    x_pre_data = Data[:, :-1]
    y_data = Data[:, -1].reshape(-1, 1)

    #最终的可用于算法的数据
    model_data = [x_pre_data, y_data]
    return model_data

sklr = LogisticRegression(penalty='l2', tol=10, solver='lbfgs',max_iter=9000)


#格式化输出混淆矩阵
from prettytable import PrettyTable

def confusion(ccmatrix):
    mix = PrettyTable()
    type = sorted(list(range(len(ccmatrix))), reverse=True)
    mix.field_names = [' '] + ['predict: type %d'%si for si in type]
    # 字典形式存储混淆矩阵数据
    for fu in type:
        frru = ['truth: type %d'%fu] + list(ccmatrix[fu][::-1])
        mix.add_row(frru)
    return mix

# 主函数
if __name__ == "__main__":
    H_Data = dataNormalization("./CleanHeart.csv")
    regre = sklr.fit(H_Data[0], H_Data[1].T[0])
    #print(regre)
    predata = sklr.predict(H_Data[0])
    

    cm = confusion_matrix(H_Data[1].T[0], predata)

    print('系数为：\n', sklr.coef_, '\n', sklr.intercept_)

    print('混淆矩阵为：\n', confusion(cm))
    


