from flask import Flask, render_template, request
import numpy as np
import pickle
import time

app = Flask(__name__)

apModel = pickle.load(open('reg.pkl', 'rb'))

@app.route('/')
def main():
    return render_template("index.html")

@app.route("/predict", methods = ["GET", "POST"])
def predict():
    try:
        ageData = int(request.form.get("ageBox"))
        heightData = float(request.form.get("heightBox"))
        weightData = float(request.form.get("weightBox"))
        IQData = int(request.form.get("IQBox"))
        fightData = int(request.form.get("AtoFBox"))
        weaponData = int(request.form.get("weaponsBox"))
        vehicleData = int(request.form.get("vehiclesBox"))
        foodData = float(request.form.get("foodBox"))
        dataArr = np.array([ageData, heightData, weightData, IQData, fightData, weaponData, vehicleData, foodData]).reshape(1, -1)
        print(dataArr)
        pred = apModel.predict(dataArr)
        for i in range(3):
            time.sleep(1)
            print(i+1)
        print(f'Your survival chance based on the given data is {np.round(pred[0],2)}%')
        return render_template("results.html", data=f'Your survival chance based on the given data is {np.round(pred[0],2)}%')
    except Exception as e:
        print(f'Error! Data not valid')
        return render_template("results.html", data="Error! Data not valid")

@app.route("/return", methods = ["GET", "POST"])    
def goBack():
    return render_template("index.html")


if __name__ == '__main__':
    app.run(debug=True)