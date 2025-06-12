import numpy as np
import pickle

# Load saved model parameters
with open("model/parameters.pkl", "rb") as f:
    parameters = pickle.load(f)

X_mean = np.load("model/X_mean.npy")
X_std = np.load("model/X_std.npy")


def linear_f(A, W, b):
    Z = np.dot(W, A) + b
    cache = (A, W, b)
    return Z, cache


def relu_f(A_prev, W, b):
    Z, linear_cache = linear_f(A_prev, W, b)
    A = np.maximum(0, Z)
    cache = (linear_cache, Z)
    return A, cache


def sigmoid_f(A_prev, W, b):
    Z, sigmoid_cache = linear_f(A_prev, W, b)
    A = 1 / (1 + np.exp(-Z))
    cache = (sigmoid_cache, Z)
    return A, cache


def forward(X, parameters):
    caches = []
    A_prev = X
    L = len(parameters) // 2  # Number of layers

    for i in range(1, L):
        A, cache = relu_f(A_prev, parameters['W' + str(i)], parameters['b' + str(i)])
        caches.append(cache)
        A_prev = A

    AL, cache = sigmoid_f(A_prev, parameters['W' + str(L)], parameters['b' + str(L)])
    caches.append(cache)

    return AL, caches


def predict(parameters, X):
    AL, _ = forward(X, parameters)
    predictions = (AL > 0.3).astype(int)  # Custom threshold used in your notebook
    return predictions
