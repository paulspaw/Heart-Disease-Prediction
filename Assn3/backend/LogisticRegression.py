import numpy as np
import pandas as pd

#sigmoid函数
def sigmoid(z):
    return 1 / (1 + np.exp(-z))

#data, labels, weights, num_epochs, learning_rate
def logistic_regression(data, labels, weights, num_epochs, learning_rate):
    n_samples, n_features = data.shape
    for _ in range(num_epochs):
        y_predict = sigmoid(np.dot(data,weights[1:3])+weights[0])
        cost = (-1/n_samples)*np.sum(labels*np.log(y_predict)+(1-labels)*(np.log(1 - y_predict)))
        dw = (np.dot(data.T,(y_predict-labels)))
        db = (np.sum(y_predict - labels))

        weights[1:3] = weights[1:3] - learning_rate * dw
        weights[0] = weights[0] - learning_rate * db

    return weights