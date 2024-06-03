import pandas as pd
import numpy as np

samples = 10000

#For independent Variable
def survivalChance(age, height, weight, IQ, fight, weapons, vehicles, food):
    return np.round(100-age+(height/(weight**2)) * (IQ/100) + (2**fight) + (2**weapons) + (2**vehicles) * (food/300),2) #I made this shit up

#Dependent Variable Dictionary
data = {
    'Age': np.random.randint(18, 80, size=samples),
    'Height': np.round(np.random.uniform(1.5, 2.0, size=samples),2),  # Height in meters
    'Weight': np.round(np.random.uniform(50, 120, size=samples),2),  # Weight in kg
    'IQ': np.random.randint(80, 160, size=samples),
    'Ability to fight': np.random.randint(0, 4, size=samples), #0-None, 1-Basic, 2-Intermediate, 3-Advanced, 4-Expert
    'Weapons?': np.random.randint(0, 3, size=samples),  #0-None, 1-Kitchen Utensils, 2-Guns, 3- Artillery
    'Vehicles?': np.random.randint(0, 4, size=samples),  #0-None, 1-Bikes, 2-Motor Vehicles, 3-Helicopters, 4-Planes
    'Food amount': np.round(np.random.uniform(0, 365, size=samples),2),  # Food amount in days
}

#Making the Independent Variable Array and adding that to the big dictionary
survivalPercent = []
for i in range(samples):
    survival_percent = survivalChance(data['Age'][i], data['Height'][i], data['Weight'][i], data['IQ'][i], data['Ability to fight'][i], data['Weapons?'][i], data['Vehicles?'][i], data['Food amount'][i])
    survivalPercent.append(survival_percent)
data['Survival %'] = survivalPercent

#Turns the dictionary into a spreadsheet
df = pd.DataFrame(data)
print(df)


df.to_csv('apocalypse_data.csv', index=False)

print("CSV generated.")


