import matplotlib
import matplotlib.pyplot as plt
import numpy as np
from sklearn.linear_model import LogisticRegression
import LR_Sklearn as LR_S  # Sklearn

#随机生成二元二分类的数据: 训练数据和预测数据的比例为7:3。预测数据不能重新随机生成，因为分布不同了。
#np.random.seed(828)
x_data = np.random.random((900, 2))
y_data = np.array([[1] if 0.3*a[0] + 0.6*a[1] + 0.55 >= 1 else [0] for a in x_data])

#拆分为训练数据集和预测数据集
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


alldata = divided(x_data, y_data)


#训练的Xdata
train_x_data, train_y_data, pre_x_data, pre_y_data = alldata




#Sklearn
# regre = LR_S.sklr.fit(train_x_data, train_y_data.T[0])
# pfdata = LR_S.sklr.predict(pre_x_data)
# weig = regre.coef_.T
# weig = np.array([np.append(weig, regre.intercept_)]).T
# dm = LR_S.confusion_matrix(pre_y_data.T[0], pfdata)
# print('混淆矩阵：\n', LR_S.confusion(dm))


###############结果图示输出

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

Sk_data = tnd_ydata(train_x_data, weig)

plt.plot()
fir(train_x_data, train_y_data) #绘制训练数据
plt.plot(Sk_data[0], Sk_data[1], '-', c='r', linewidth=1)
plt.title('Sklearn')
#plt.legend(['Sklearn：%s'%outexpre(weig),'type 1', 'type 0'])
plt.legend(['Sklearn:','type 1', 'type 0'])
#plt.show()
fig = matplotlib.pyplot.gcf()
fig.set_size_inches(18.5, 10.5)
fig.savefig('image.png', dpi=100)
