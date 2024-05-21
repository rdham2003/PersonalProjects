from flask import Flask, render_template, request, jsonify
import sqlite3

productDB = sqlite3.connect("productDB.db")
accountDB = sqlite3.connect("accountDB.db")
productCursor = productDB.cursor()
accountCursor = accountDB.cursor()

createProducts = """CREATE TABLE IF NOT EXISTS Products(
    product VARCHAR(50),
    price DOUBLE,
    image VARCHAR(50),
    tag1 VARCHAR(50),
    tag2 VARCHAR(50),
    tag3 VARCHAR(50),
    tag4 VARCHAR(50),
    tag5 VARCHAR(50),
    tag6 VARCHAR(50),
    tag7 VARCHAR(50),
    tag8 VARCHAR(50)
    )"""
productCursor.execute(createProducts)

createAccount = """CREATE TABLE IF NOT EXISTS Accounts (
                username VARCHAR(50),
                email VARCHAR(50),
                phoneNumber VARCHAR(50),
                password VARCHAR(50)
    )"""
accountCursor.execute(createProducts)


productCursor.execute("SELECT * FROM Products;")
productData = productCursor.fetchall()
if len(productData) == 0:
    productList = []
    with open("products.csv", 'r') as file:
        for line in file:
            newLine = line.split(',')
            for i in range(len(newLine)-2):
                newLine[i+2] = newLine[i+2][1:]
            newLine[1] = float(newLine[1])
            newLine[-1] = newLine[-1][:-1]
            productList.append(newLine)
    # print((productList))
    for i in range(len(productList)):
        productCursor.execute(f'INSERT INTO Products VALUES ("{productList[i][0]}", "{productList[i][1]}", "{productList[i][2]}", "{productList[i][3]}", "{productList[i][4]}", "{productList[i][5]}", "{productList[i][6]}", "{productList[i][7]}", "{productList[i][8]}", "{productList[i][9]}", "{productList[i][10]}");')
    productDB.commit()
    print("Successfully created product table")
productCursor.execute("SELECT * FROM Products;")
products = productCursor.fetchall()
for product in products:
    print(product)
while True:
    search = input("What are you searching for today?: ")
    productLst = []
    for product in products:
        # print(product)
        for i in range(len(product)):
            if i == 0:
                if product[i].lower().find(search.lower()) != -1:
                    productLst.append((product[0], product[1], product[2]))
                    break
            if i == 1:
                continue
            if product[i].lower() == search.lower():
                productLst.append((product[0], product[1], product[2]))
    print(f'Showing results for {search}: ')
    print(productLst)
        