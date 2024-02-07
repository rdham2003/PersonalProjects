import sqlite3, os

passwordDB = sqlite3.connect('passwordDB.db')
masterDB = sqlite3.connect('masterPassword.db')
masterDBCursor = masterDB.cursor()
passwordDBCursor = passwordDB.cursor()
os.system('cls')
command1 = """CREATE TABLE IF NOT EXISTS masterPassword(
        username VARCHAR(50),
        password VARCHAR(50)
    )"""
masterDBCursor.execute(command1)
command2 = """CREATE TABLE IF NOT EXISTS passwordDB(
        AccountName VARCHAR(50),
        username VARCHAR(50),
        password VARCHAR(50)
    )"""
passwordDBCursor.execute(command2)
masterDBCursor.execute("SELECT * FROM masterPassword;")
masterPassData = masterDBCursor.fetchall()
# print(masterPassData)
while True:
    if len(masterPassData) == 0:
        print("No account found. Let's create an account")
        print("_________________________________\n")
        masUser = input("Let's start with a username (Less than 50 characters): ")
        while len(masUser) > 50:
            masUser = input("Invalid input. Try again (Less than 50): ")
        masPass = input("Good. Now let's move on to a master password (Less than 50 characters): ")
        while len(masPass) > 50:
            masPass = input("Invalid input. Try again (Less than 50): ")
        masterDB.execute(f'INSERT INTO masterPassword VALUES ("{masUser}", "{masPass}");')
        masterDB.commit()
        print("Successfully created account!")
    else:
        masterUser = input("Welcome Back! Please enter your Master Username!: (Enter 'Esc' to exit) ")
        if masterUser == "Esc":
            break
        masterPass = input("Please enter your Master Password!: (Enter 'Esc' to exit) ")
        if masterPass == "Esc":
            break
        while masterUser != masterPassData[0][0] or masterPass != masterPassData[0][1]:
            print("Error: Your username and or password do not match! Try again!")
            masterUser = input("Please enter your Master Username!: ")
            masterPass = input("Please enter your Master Password!: ")
        while True:
            os.system('cls')
            print("Welcome back to the your password manager!")
            print("______________________________________________\n")
            command = input("What would you like to do today?\n\nCommand List:\n\tView\n\tAdd\n")
            if command == "View":
                os.system('cls')
                passwordDBCursor.execute("SELECT * FROM passwordDB")
                PasswordData = passwordDBCursor.fetchall() 
                print("                                Saved Passwords                                   ")
                print("----------------------------------------------------------------------------------")
                for i in PasswordData:
                    print(f'Account Name: {i[0]}          Username: {i[1]}           Password: {i[2]}')
                    print("\n----------------------------------------------------------------------------------\n")
                goBack = input("Hit enter to return (Or 'Esc' to exit program) ")
                if goBack == "Esc":
                    break
                else:
                    continue
            elif command == "Add":
                os.system('cls')
                newAcc = input("Enter an account name: ")
                newUser = input("Enter the username: ")
                newPass = input("Enter a password: ")
                passwordDBCursor.execute(f'INSERT INTO passwordDB VALUES ("{newAcc}", "{newUser}", "{newPass}")')
                passwordDB.commit()
                print("Successfully added new account information!") 
                goBack = input("Hit enter to return (Or 'Esc' to exit program) ")
                if goBack == "Esc":
                    break
                else:
                    continue   
# masterDBCursor.execute("SELECT * FROM masterPassword;")
# result = masterDBCursor.fetchall()
# print("Master Password data in the database:")
# print(result)
# print(result[0][0])
    
# os.system('cls')
# print("Welcome to your Password Manager")
# print("_________________________________")
# masterUser = input("Enter your master username: ")
# masterPass = input("Enter your master password: ")

# while True:
