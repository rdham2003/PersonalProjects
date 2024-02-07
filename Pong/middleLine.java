import java.awt.*;
import javax.swing.*;

public class middleLine{
    private int height;
    private int width;
    private int xpos;
    private int ypos;
    private Color color;
    private JPanel panel;

    public middleLine(int height, int width, int xpos, int ypos, Color color){
        this.height = height;
        this.width = width;
        this.xpos = xpos;
        this.ypos = ypos;
        this.color = color;
        this.panel = new JPanel();
    }
    public void setLine(){
        panel.setBackground(this.color);
        panel.setBounds(this.xpos,this.ypos,this.height,this.width);       
    }
    public JPanel getLine() {
        return panel;
    }
}