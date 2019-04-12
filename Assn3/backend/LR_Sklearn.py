#!/usr/bin/env python3
# coding=UTF-8
'''
@Description: 
@Author: Peng LIU
@LastEditors: Peng LIU
@Date: 2019-04-12 19:24:46
@LastEditTime: 2019-04-13 00:57:08
'''

from sklearn.linear_model import LogisticRegression
from sklearn.metrics import confusion_matrix
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import matplotlib

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
    mix.field_names = [' '] + ['Predict: type %d'%si for si in type]
    # 字典形式存储混淆矩阵数据
    for fu in type:
        frru = ['Actual: type %d'%fu] + list(ccmatrix[fu][::-1])
        mix.add_row(frru)
    return mix


def divided(xdata, ydata, percent=0.3):
    sign_list = list(range(len(xdata)))
    #用于测试的序号
    select_sign = sorted(np.random.choice(sign_list, int(len(xdata)*percent), replace=False))

    #用于训练的序号
    no_select_sign = [isign for isign in sign_list if isign not in select_sign]

    #测试数据
    x_predict_data = xdata[select_sign]
    y_predict_data = ydata[select_sign].reshape(len(select_sign), 1)#转化数据结构

    #训练数据
    x_train_data = xdata[no_select_sign]
    y_train_data = ydata[no_select_sign].reshape(len(no_select_sign), 1)#转化数据结构

    return x_train_data, y_train_data, x_predict_data, y_predict_data #训练的x，y;  测试的x，y

def fir(datax, datay, nametotle='Training data scatter diagram'):
    #生成散点图需要的数据，将X数据分为2类
    datax1 = datax[datay.T[0] == 1]
    datax2 = datax[datay.T[0] == 0]

    # 散点图
    plt.scatter(datax1[:, 0], datax1[:, -1], c='r', s=28)
    plt.scatter(datax2[:, 0], datax2[:, -1], marker='^', c='b', s=28)
    plt.title(nametotle)
    plt.xlabel('X1 value')
    plt.ylabel('X2 value')

#输出分割线的表达式
def outexpre(weifgt, x=['x1', 'x2', '']):
    expression = ''
    for hh in range(len(weifgt)):
        if hh == 0:
            expression += '%s%s'%(weifgt[hh][0], x[hh])
        else:
            if weifgt[hh] > 0:
                expression += '+%s%s'%(weifgt[hh][0], x[hh])
            else:
                expression += '%s%s'%(weifgt[hh][0], x[hh])
    return expression

def tnd_ydata(datdxx, weights):
    dmin = datdxx[:, 0]
    minm = dmin.min()
    maxm = dmin.max()
    xda =  np.linspace(minm - 0.2, maxm + 0.2, 1000)
    yda = [(- weights[2][0] - hh * weights[0][0]) / weights[1][0] for hh in xda]
    return xda, yda


# 主函数
if __name__ == "__main__":
    # H_Data = dataNormalization("./CleanHeart.csv")
    # alldata = divided(H_Data[0], H_Data[1])
    # train_x_data, train_y_data, pre_x_data, pre_y_data = alldata
    # regre = sklr.fit(train_x_data, train_y_data.T[0])
    # predata = sklr.predict(pre_x_data)
    # weig = regre.coef_.T
    # weig = np.array([np.append(weig, regre.intercept_)]).T
    # dm = confusion_matrix(pre_y_data.T[0], predata)
    # print('混淆矩阵：\n', confusion(dm))
    # print(train_x_data,train_y_data.T[0])
    
    # Sk_data = tnd_ydata(train_x_data, weig)

    # plt.plot()
    # fir(train_x_data, train_y_data) #绘制训练数据
    # plt.plot(Sk_data[0], Sk_data[1], '-', c='r', linewidth=1)
    # plt.title('Sklearn')
    # #plt.legend(['Sklearn：%s'%outexpre(weig),'type 1', 'type 0'])
    # plt.legend(['Sklearn:','type 1', 'type 0'])
    # plt.show()
#------------------------随机300个数字对比-----------------------
    x_data = np.random.random((297, 2))
    y_data = np.array([[1] if 0.3*a[0] + 0.6*a[1] + 0.55 >= 1 else [0] for a in x_data])
    alldata = divided(x_data, y_data)
    train_x_data, train_y_data, pre_x_data, pre_y_data = alldata
    regre = sklr.fit(train_x_data, train_y_data.T[0])
    pfdata = sklr.predict(pre_x_data)
    weig = regre.coef_.T
    weig = np.array([np.append(weig, regre.intercept_)]).T
    dm = confusion_matrix(pre_y_data.T[0], pfdata)
    print('混淆矩阵：\n', confusion(dm))
    
    Sk_data = tnd_ydata(train_x_data, weig)
    plt.plot()
    fir(train_x_data, train_y_data) #绘制训练数据
    plt.plot(Sk_data[0], Sk_data[1], '-', c='r', linewidth=1)
    plt.title('Sklearn')
    #plt.legend(['Sklearn：%s'%outexpre(weig),'type 1', 'type 0'])
    plt.legend(['Sklearn:','type 1', 'type 0'])
    plt.show()
#---------------------------------------------------------------
    # H_Data = dataNormalization("./CleanHeart.csv")
    # regre = sklr.fit(H_Data[0], H_Data[1].T[0])
    # #print(regre)
    # predata = sklr.predict(H_Data[0])

    # cm = confusion_matrix(H_Data[1].T[0], predata)

    # print('系数为：\n', sklr.coef_, '\n', sklr.intercept_)

    # print('混淆矩阵为：\n', confusion(cm))
    
    # alldata = divided(H_Data[0], H_Data[1].T[0])
    # #训练的Xdata
    # train_x_data, train_y_data, pre_x_data, pre_y_data = alldata

    # weig = regre.coef_.T
    # #weig = np.array([np.append(weig, regre.intercept_)]).T

    # Sk_data = tnd_ydata(train_x_data, weig)

    # plt.plot()
    # fir(train_x_data, train_y_data) #绘制训练数据
    # plt.plot(Sk_data[0], Sk_data[1], '-', c='r', linewidth=1)
    # plt.title('Sklearn')
    # #plt.legend(['Sklearn：%s'%outexpre(weig),'type 1', 'type 0'])
    # plt.legend(['Sklearn:','type 1', 'type 0'])
    # plt.show()
    # fig = matplotlib.pyplot.gcf()
    # fig.set_size_inches(18.5, 10.5)
    # fig.savefig('image.png', dpi=100)