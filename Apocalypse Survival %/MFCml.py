import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import torch as tc
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error as MSE
from sklearn.metrics import mean_absolute_error as MAE
from sklearn.metrics import r2_score as R2 
import pickle

df = pd.read_csv('Data\\apocalypse_data.csv')

def preprocess_data(df):
    df.dropna(inplace=True)
    df.drop_duplicates(inplace=True)
    
preprocess_data(df)

print(df.head()) 

correlation_matrix = df.corr()
plt.figure(figsize=(15,8))
sns.heatmap(correlation_matrix, annot=True, cmap='RdBu')
plt.title("Apocalyptic Survival Chance")
plt.show()

#I genuinely have no idea what this shit means I thought it just looked cool tbh...

#x is the independent variables of the dataset
#y is the dependent variable of the dataset
#test_size is the % of data that will be used for testing purposes. Data Split purposes: 80% Training, 20% Testing
x = df.drop(['Survival %'], axis=1)
y = df['Survival %']

#Model Training here
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=1)

reg = LinearRegression()

reg.fit(x_train, y_train)
y_pred = reg.predict(x_test)

mse = MSE(y_test, y_pred)
rmse = mse ** (1/2)
mae = MAE(y_test, y_pred)
r2 = R2(y_test, y_pred)

print(f"Mean Squared Error (MSE): {np.round(mse,4)}")
print(f"Root Mean Squared Error (RMSE): {np.round(rmse,4)}")
print(f"Mean Absolute Error (MAE): {np.round(mae,4)}")
print(f"R-squared (R²): {np.round(r2,4)}")

#MSE: 1.7488 (Average squared difference between actual and predicted values. Lower values indicate more accurate performance)
#RMSE: 1.3224 (Average difference between actual and predicted values, in the same units as the target variable)
#MAE: 1.0626 (Average absolute difference between actual and predicted values)
#R-squared: 0.9948 (Closer to 1 indicates the model's predictions fit the data sheet very well)

plt.scatter(y_test, y_pred, c="blue")
plt.plot([min(y_test), max(y_test)], [min(y_test), max(y_test)], color="red")
plt.xlabel('Actual Survival %')
plt.ylabel('Predicted Survival %')
plt.title("Actual vs Predicted Survival %")
plt.show()

#Test prediction
print(np.array([19,1.76,80.0,170,4,0,0,260.0]).reshape(1, -1))
pred = reg.predict(np.array([19,1.76,80.0,170,4,0,0,260.0]).reshape(1, -1))
print(f'Your survival chance based on the given data is {np.round(pred[0],2)}%')

#Saving Model to a file
with open('reg.pkl', 'wb') as reg_file:
    pickle.dump(reg, reg_file)
    print("Saved model to pickle file")