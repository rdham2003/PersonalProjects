import java.awt.*;
import javax.swing.*;
import java.util.Random;

public class Ball {
    private int height;
    private int width;
    private int xpos;
    private int ypos;
    private Color color;
    private JPanel panel;
    private int xVel;
    private int yVel;
    private int speeed;
    private int leftScore;
    private int rightScore;
    public Ball(int height, int width, int xpos, int ypos, Color color){
        this.height = height;
        this.width = width;
        this.xpos = xpos;
        this.ypos = ypos;
        this.color = color;
        this.panel = new JPanel();
        Random random = new Random();
        int rand = random.nextInt(4)+1;
        switch(rand){
            case(1):
                this.xVel = 4;
                this.yVel = 4;
                break;
            case(2):
                this.xVel = -4;
                this.yVel = 4;
                break;
            case(3):
                this.xVel = 4;
                this.yVel = -4;
                break;
            case(4):
                this.xVel = -4;
                this.yVel = -4;
                break;
        }
        this.speeed = 0;
        this.leftScore = 0;
        this.rightScore = 0;
    }
    public void setBall(){
        panel.setBackground(this.color);
        panel.setBounds(this.xpos,this.ypos,this.height,this.width);       
    }
    public JPanel getBallPanel() {
        return panel;
    }
    public void speed(){
        if (xVel < 0)
            this.xpos += xVel - speeed;
        else
            this.xpos += xVel + speeed;
        if (yVel < 0)
            this.ypos += yVel - speeed;
        else
            this.ypos += yVel + speeed;
        if (topCollision() || bottomCollision()){
            yVel = -yVel;
            speeed++;
        }
        if (leftCollision()){
            this.xpos = 540;
            this.ypos = 360;
            speeed = 0;
            leftScore++;
        }
        if (rightCollision()){
            this.xpos = 540;
            this.ypos = 360;
            speeed = 0;
            rightScore++;
        }
        System.out.print(xpos);
        System.out.print(",");
        System.out.print(ypos);
        System.out.print(",");
        System.out.print(xVel);
        System.out.print(",");
        System.out.print(yVel);
        System.out.print(",");
        System.out.print(speeed);
        System.out.println("");
        panel.setBounds(xpos, ypos, height, width);
    }
    public boolean topCollision(){
        return this.ypos <= 20;
    }
    public boolean bottomCollision(){
        return this.ypos >= 670;
    }
    public boolean leftCollision(){
        return this.xpos <= -10;
    }
    public boolean rightCollision(){
        return this.xpos >=1060;
    }
    public int getXpos(){
        return this.xpos;
    }
    public int getYpos(){
        return this.ypos;
    }
    public int getXvel(){
        return this.xVel;
    }
    public int getvel(){
        return this.yVel;
    }
    public void setXvel(int xVel){
        this.xVel = xVel;
    }
    public void setYvel(int yVel){
        this.yVel = yVel;
    }
    public Color getBallColor(){
        return this.color;
    }
    public Rectangle getBounds(){
        return new Rectangle(this.xpos,this.ypos,this.width,this.height);
    }
    public int getSpeed(){
        return this.speeed;
    }
    public void setSpeed(int speeed){
        this.speeed = speeed;
    }
    public int getLeftScore(){
        return this.leftScore;
    }
    public int getRightScore(){
        return this.rightScore;
    }
}

