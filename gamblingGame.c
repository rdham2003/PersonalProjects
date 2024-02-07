#include <stdio.h>
#include <ctype.h>
#include <stdlib.h>
#include <time.h>

int main(){
    float money = 50.00;
    float bet;
    int player;
    int num1;
    int num2;
    int num3;
    srand(time(NULL));
    while (money > 0)
    {
        float winnings;
        num1 = rand() % 10 + 1;
        num2 = rand() % 10 + 1;
        while (num2 == num1)
        {
            num2 = rand() % 10 + 1;
        }
        num3 = rand() % 10 + 1;
        while (num3 == num1 && num3 == num2)
        {
            num3 = rand() % 10 + 1;
        }
        // printf("%d\n", num1);
        // printf("%d\n", num2);
        // printf("%d\n", num3);
        printf("How much money would you like to bet?(Current balance: $%.2f) ", money);
        while (scanf("%f", &bet) != 1) {
            printf("Invalid input. Please enter a numeric value for bet: ");
            while (getchar() != '\n');
        }

        while (bet > money || bet < 0)
        {
            printf("You don't have enough money\n");
            printf("How much money would you like to bet?(Current balance: $%.2f) ", money);
            scanf("%f", &bet);
        }

        printf("Which player would you like to bet on? (Number between 1-10) ");
        while (scanf("%d", &player) != 1) 
        {
            printf("Invalid input. Please enter a numeric value for bet: ");
            while (getchar() != '\n');
        }

        while (player < 1 || player > 10)
        {
            printf("This player is not competing\n");
            printf("Which player would you like to bet on? (Number between 1-10) ");
            scanf("%d", &player);
        }
        if (player == num1)
        {
            winnings = bet;
            printf("The player you bet on won first place. You won $%.2f\n", winnings);
            money += winnings;
        }
        else if (player == num2)
        {
            winnings = 0.5 * bet;
            printf("The player you bet on won second place. You won $%.2f\n", winnings);
            money += winnings;
        }
        else if (player == num3)
        {
            printf("The player you bet on won third place.You don't win or lose anything\n");
        }
        else{
            printf("Your player did not place. You lose $%.2f\n", bet);
            money -= bet;
        }
    }
    printf("You're bankrupt! Oh no!");
    return 0;
}