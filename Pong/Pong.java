import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;
import java.io.IOException;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.util.Set;
import java.util.HashSet;

public class Pong implements KeyListener{
    private static Paddle player1;
    private static Paddle player2;
    private static JFrame frame;
    private Set<Integer> keysPressed1 = new HashSet<>();
    private Set<Integer> keysPressed2 = new HashSet<>();
    private static int player1Score;
    private static int player2Score;
    private static Timer timer;
    public static void main(String[] args) throws FontFormatException, IOException {
        final int GAME_HEIGHT = 720;
        final int GAME_WIDTH = 1080;
        final int SCORE_TO_WIN = 5;
        frame = new JFrame();
        frame.setTitle("Pong");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(GAME_WIDTH,GAME_HEIGHT);
        frame.getContentPane().setBackground(new Color(0,0,0));
        frame.setLayout(null);
        frame.addKeyListener(new Pong());
        player1Score = 0;
        player2Score = 0;
        JLabel score1 = new JLabel(String.valueOf(player1Score));
        score1.setForeground(new Color(255,255,255));
        score1.setBounds(400,20,150,30);
        JLabel score2 = new JLabel(String.valueOf(player2Score));
        score2.setForeground(new Color(255,255,255));
        score2.setBounds(680,20,150,30);
        JLabel victor = new JLabel();
        victor.setForeground(new Color(255,255,255));
        victor.setBounds(350,300,400,100);
        player1 = new Paddle(10, 100, 0, 300, new Color(255,0,0));
        player2 = new Paddle(10,100,1050,300, new Color(0,0,255));
        Ball ball = new Ball(12,12,540,360, new Color(255,255,255));
        player1.setPaddle();
        player2.setPaddle();
        ball.setBall();;

        frame.add(player1.getPaddlePanel());
        frame.add(player2.getPaddlePanel());
        frame.add(ball.getBallPanel());

        for (int i = 0; i <= GAME_HEIGHT; i=i+30){
            middleLine line = new middleLine(6,6,540,i,new Color(255,255,255));
            line.setLine();
            frame.add(line.getLine());
        }

        Font gameFont = Font.createFont(Font.TRUETYPE_FONT, new File("Pong\\PressStart2P-Regular.ttf")); 
        gameFont = gameFont.deriveFont(Font.PLAIN, 30);
        score1.setFont(gameFont);
        score2.setFont(gameFont);
        victor.setFont(gameFont);

        frame.setVisible(true);
        frame.add(score1);
        frame.add(score2);
        frame.add(victor);


        ImageIcon img = new ImageIcon("Pong\\pong.png");
        frame.setIconImage(img.getImage());

        timer = new Timer(16, new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e){
                ball.speed();
                ball.topCollision();
                ball.bottomCollision();
                ball.leftCollision();
                ball.rightCollision();
                score1.setText(String.valueOf(ball.getRightScore()));
                score2.setText(String.valueOf(ball.getLeftScore()));
                // double dist1 = Math.sqrt(Math.pow(ball.getXpos()-player1.getXpos(),2) + Math.pow(ball.getYpos()-player1.getYpos(),2));
                // double dist2 = Math.sqrt(Math.pow(ball.getXpos()-player2.getXpos(),2) + Math.pow(ball.getYpos()-player2.getYpos(),2));
                //.intersects(ball.getBounds())
                // System.out.print(player1.getPaddlePanel().getBounds().intersects(ball.getBounds()));
                // System.out.print(",");
                // System.out.print(player2.getPaddlePanel().getBounds().intersects(ball.getBounds()));
                // System.out.println("");
                if (player2.getPaddlePanel().getBounds().intersects(ball.getBallPanel().getBounds()) || 
                player1.getPaddlePanel().getBounds().intersects(ball.getBallPanel().getBounds())){
                    ball.setXvel(-(ball.getXvel()));
                    ball.setSpeed(ball.getSpeed()+1);
                }
                if (ball.getRightScore() == SCORE_TO_WIN){
                    victor.setText("Player 1 Wins");
                    timer.stop();
                }
                if (ball.getLeftScore() == SCORE_TO_WIN){
                    victor.setText("Player 2 Wins");
                    timer.stop();
                }
                frame.repaint();
            }
        });
        timer.start();
    }

    @Override
    public void keyTyped(KeyEvent e) {

    }

    @Override
    public void keyPressed(KeyEvent e) {
        int key = e.getKeyCode();
        // System.out.println((key));
        if (key == 87 || key == 83)
            keysPressed1.add(key);
        else if (key == 38 || key == 40)
            keysPressed2.add(key);
        if (keysPressed1.contains(KeyEvent.VK_W))
            player1.moveUp();
        else if (keysPressed1.contains(KeyEvent.VK_S))
            player1.moveDown();

        if (keysPressed2.contains(KeyEvent.VK_UP))
            player2.moveUp();
        else if (keysPressed2.contains(KeyEvent.VK_DOWN))
            player2.moveDown();

        frame.repaint();
    }
    @Override
    public void keyReleased(KeyEvent e) {
        keysPressed1.remove(e.getKeyCode());
        keysPressed2.remove(e.getKeyCode());
        frame.repaint();
    }
}
