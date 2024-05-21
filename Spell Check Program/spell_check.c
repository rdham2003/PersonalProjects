#include <ctype.h>
#include <stdio.h>
#include <string.h>

#include "dictionary.h"

#define MAX_CMD_LEN 128

int strToList(char *str, char wordList[][MAX_CMD_LEN]){
    int wordCount = 0;
    char *stringEl = strtok(str, " "); //strtok is similar to .split() method in Python. It creates a type of list where the elements, called tokens, are separted by a space.
    while (stringEl != NULL){
        strcpy(wordList[wordCount], stringEl); //Although the strtok seperates each word. To get better access to each seperated value. I used a list of strings.
        wordCount++;
        stringEl = strtok(NULL, " "); //this line points to the next token in stringEl, which points to NULL when there are no more tokens in stringEl.
    }
    return wordCount; //word count of each line is returned to make iteration in the main spell_check_file easier.
}

int spell_check_file(const char *file_name, const dictionary_t *dict) {
    if (dict == NULL){ //checks validity of dictionary
        return -1;
    }
    FILE *file = fopen(file_name, "r"); //opens file to be read
    if (file == NULL){ //checks validity of file
        printf("Spell check failed\n");
        return -1;
    }
    char file_data[MAX_CMD_LEN]; //the file_data only allows the MAX_CMD_LEN, which is 128
    while (fgets(file_data, sizeof(file_data), file) != NULL){
        file_data[strcspn(file_data, "\n")] = '\0';
        char wordList[100][MAX_CMD_LEN]; //this list is used to store the words
        int lenData = strToList(file_data, wordList);
        for (int i = 0; i < lenData; i++){
            if (dict_find(dict, wordList[i]) == 1){ 
                printf("%s ", wordList[i]);
            }
            else{
                printf("%s[X] ", wordList[i]);
            }
        }
        printf("\n");
    }
    fclose(file); 
    return 0;
}

int main(int argc, char **argv) {
    dictionary_t *dict = create_dictionary();
    write_dict_to_text_file(dict, "words.txt");
    dict_print(dict);
    char cmd[MAX_CMD_LEN];
    dict_free(dict);
    return 0;
}
