import java.awt.*;
import javax.swing.*;

public class Paddle{
    private int height;
    private int width;
    private int xpos;
    private int ypos;
    private Color color;
    private JPanel panel;
    private int speed;
    private int score;

    public Paddle(int height, int width, int xpos, int ypos, Color color){
        this.height = height;
        this.width = width;
        this.xpos = xpos;
        this.ypos = ypos;
        this.color = color;
        this.panel = new JPanel();
        this.speed = 50;
        this.score = 0;
    }
    public void setPaddle(){
        panel.setBackground(this.color);
        panel.setBounds(this.xpos,this.ypos,this.height,this.width);     
    }
    public JPanel getPaddlePanel() {
        return panel;
    }
    public void moveUp(){
        if (this.ypos <= 0)
            this.ypos = 0;
        else
            this.ypos -= this.speed;
        panel.setBounds(this.xpos,this.ypos,this.height,this.width);
        // System.out.println(this.ypos);
    }
    public void moveDown(){
        if (this.ypos >= 580)
            this.ypos = 580;
        else
            this.ypos += this.speed;
        panel.setBounds(this.xpos,this.ypos,this.height,this.width);
        // System.out.println(this.ypos);
    }
    public int getXpos(){
        return this.xpos;
    }
    public int getYpos(){
        return this.ypos;
    }
    public Color getPaddleColor(){
        return this.color;
    }
    public Rectangle getBounds(){
        return new Rectangle(this.xpos,this.ypos,this.width,this.height);
    }
    public int getScore(){
        return this.score;
    }
    public void setScore(int score){
        this.score = score;
    }
}


