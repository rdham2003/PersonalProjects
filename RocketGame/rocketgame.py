import turtle, random, math, os, time, sys, subprocess

class Game:
    '''
       Purpose: This class runs the game in the turtle window using every other class to do so.
       Instance variables: Self.player is the spacecraft the player controls, self.obstacles are the balls and stars are the white dots in the background that represent stars
       Methods: __init__ initializes the instance variables and ensures the keyboard controls work. Crash checks if the player crashes into an obstacle. Gameloop ensures the game
       runs by making every object move continously until the game ends.
    '''
    def __init__(self):
        #Bottom left corner of screen is (0, 0)
        #Top right corner is (500, 500)
        turtle.setworldcoordinates(0, 0, 500, 500)
        cv = turtle.getcanvas()
        cv.adjustScrolls()
        #Ensure turtle is running as fast as possible
        turtle.delay(0)
        self.player = SpaceCraft(random.uniform(100.0,400.0), random.uniform(250.0,450.0), random.uniform(-4.0,4.0), random.uniform(-2,0))
        self.screen = turtle.Screen()
        self.player.goto(250, 500)
        self.player.color("White")
        turtle.bgcolor("Black")
        self.fuel_display = turtle.Turtle()
        self.fuel_display.penup()
        self.fuel_display.goto(10, 480)
        self.fuel_display.color("White")
        self.update_fuel_display()
        self.fuel_display.hideturtle()  
        self.result = turtle.Turtle()
        self.result.penup()
        self.result.goto(216,250)
        self.result.color("White")
        self.result.hideturtle()
        turtle.delay(0)
        stars = []
        for i in range(40):
            stars.append(Stars(random.uniform(0.0,500.0),random.uniform(0,500)))
        turtle.onkeypress(self.player.thrust, 'Up')
        turtle.onkeypress(self.player.left_turn, 'Left')
        turtle.onkeypress(self.player.right_turn, 'Right')
        self.obstacles = []
        for i in range (8):
            self.obstacles.append(Obstacles(random.uniform(100.0,400.0), random.uniform(250.0,450.0), random.choice(['blue']), random.uniform(-4.0,4.0), random.uniform(-2,0)))
        self.gameloop()
        #These two lines must always be at the BOTTOM of __init__
        turtle.listen()
        turtle.mainloop()
    def update_fuel_display(self):
        self.fuel_display.clear()
        self.fuel_display.write(f"Fuel: {self.player.fuel}", align="left", font=("Arial", 14, "normal"))
    def crash(self):
        Spacecraftx = self.player.xcor()
        Spacecrafty = self.player.ycor()
        for i in range(8):
            obstaclex = self.obstacles[i].xcor()
            obstacley = self.obstacles[i].ycor()
            dist = math.sqrt(((obstaclex-Spacecraftx)**2)+((obstacley-Spacecrafty)**2))
            if dist < 10:
                self.player.hideturtle()
                explosion = Obstacles(self.player.xcor(),self.player.ycor(),"Orange",0.0,0.0)
                self.result.write(f"Failure!", align="left", font=("Arial", 24, "normal"))
                turtle.done()   
    def gameloop(self):
        self.player.move()
        for i in range(len(self.obstacles)):
            self.obstacles[i].move()
        self.crash()
        if self.player.ycor() > 5:
            self.update_fuel_display()
            turtle.ontimer(self.gameloop, 30)
        else:
            if (((self.player.xvel > -2 and self.player.xvel < 2) and (self.player.yvel > -2 and self.player.yvel < 2)) and (self.player.facing_north())):
                self.result.write(f"Sucess!", align="left", font=("Arial", 24, "normal"))
            else:
                self.player.hideturtle()
                self.result.write(f"Failure!", align="left", font=("Arial", 24, "normal"))
                explosion = Obstacles(self.player.xcor(),self.player.ycor(),"Orange",0.0,0.0)
    def retry(self):
        self.__init__()
        play_again = input("Do you want to play again? (yes/no): ").lower()
        if play_again == 'yes':
            self.retry()
    def reset_game(self):
        self.screen.clear() 
        self.screen.bgcolor("Black")
        self.screen.delay(0)
        self.__init__()

class SpaceCraft(turtle.Turtle):
    '''
       Purpose: This class creases the spacecraft object that the player controls and manuevers throughout the entire game.
       Instance variables: self.goto sets the spacecraft's initial position, self.xvel sets the velocity in the x direction while self.yvel sets the velocity in the y direction.
       self.fuel is the amount of fuel, or times a player can turn and thrust, has. Self.left is the starting direction of the spacecraft.
       Methods: __init__ initializes the instance variables, move updates the position of the spacecraft and pulls it down due to gravity. Move also ensures if the spacecraft goes
       off into the left or right side, it will reappear on the other side. Move will also ensure if the player tries to go above the screen, it will bounce back into the screen.
       The thrust method pushes the spacecraft forward against gravity using the angle its facing. Self_left and Self_right turn the spacecraft left or right in thier respective
       order.
    '''
    def __init__(self,xpos,ypos,xvel,yvel):
        turtle.Turtle.__init__(self)
        self.penup()
        self.goto(xpos,ypos)
        self.xvel = xvel
        self.yvel = yvel
        self.fuel = 40
        self.left(90)
    def move(self):
        self.yvel -= 0.0486
        newxpos = self.xcor() + self.xvel
        newypos = self.ycor() + self.yvel
        self.goto(newxpos,newypos)
        self.goto(newxpos,newypos)
        if self.xcor() <= -5.0:
            self.goto(500, self.ycor())
        if self.xcor() >= 505.0:
            self.goto(0,self.ycor())
        if self.ycor() >= 510.0:
            self.goto(self.xcor(),500.0)
    def thrust(self):
        if self.fuel > 0:
            self.fuel -= 1
            ship_angle = math.radians(self.heading())
            self.xvel += math.cos(ship_angle)
            self.yvel += math.sin(ship_angle) 
    def left_turn(self):
        if self.fuel > 0:
            self.fuel -= 1
            self.left(15)
    def right_turn(self):
        if self.fuel > 0:
            self.fuel -= 1
            self.right(15)
    def facing_north(self):
        return self.heading() == 90

class Obstacles(turtle.Turtle):
    '''
    Purpose: Creates obstacles to provide the player with a challange.
    Instance variables: self.goto sets the spacecraft's initial position, self.xvel sets the velocity in the x direction while self.yvel sets the velocity in the y direction.
    Self.color sets the object to its respective color, and self.shape gives the object its shape.
    Methods: __init__ initilizes the instance variables and the move method updates the position of the obstacle and bounces it off the edges if it comes into contact with it.
    '''
    def __init__(self, posx, posy, color, velx, vely):
        turtle.Turtle.__init__(self)
        self.penup()
        self.goto(posx, posy)
        self.velx = velx
        self.vely = vely
        self.color(color)
        self.shape('circle')
    def move(self):
        newxpos = self.xcor() + self.velx
        newypos = self.ycor() + self.vely
        self.goto(newxpos,newypos)
        if self.xcor() <= 0.0 or self.xcor() >= 500.0:
            self.velx = -1 * (self.velx)
        if self.ycor() <= 0.0 or self.ycor() >= 500.0:
            self.vely = -1 * (self.vely)

class Stars(turtle.Turtle):
     '''
    Purpose: Creastes stars to add to the background
    Instance variables: self.goto sets the location of the star and self.dot creates the star itself
    Methods: __init__ initilizes the instance variables.
    '''
     def __init__(self, posx, posy):
        turtle.Turtle.__init__(self)
        self.penup()
        self.goto(posx,posy)
        self.dot(5,"White")

def set_cursor_position(x, y):
    sys.stdout.write(f"\033[{y};{x}H")

if __name__ == '__main__':
    os.system('cls')
    command = "hw13.py"
    print("DhamOS 7.0.0.2")
    print("Initializing")
    for i in range(random.randint(10,20)):
        print("...")
        time.sleep(random.uniform(0.1,2.1))
    print("Ready!")
    time.sleep(1)
    game_instance = Game()
    game_instance.retry()
