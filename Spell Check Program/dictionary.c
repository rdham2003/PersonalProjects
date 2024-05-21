#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "dictionary.h"

#define INITIAL_HASH_TABLE_SIZE 1301
#define MAX_WORD_LEN 128

table_t *create_table() {
    table_t *table = malloc(sizeof(table_t));
    if (table == NULL){
        return NULL;
    }
    table->array = malloc(sizeof(list_node_t*) * INITIAL_HASH_TABLE_SIZE);
    if (table->array == NULL){
        free(table->array);
        return NULL;
    }
    for (int i = 0; i < INITIAL_HASH_TABLE_SIZE; i++){
        table->array[i] = NULL;
    }
    table->length = INITIAL_HASH_TABLE_SIZE;
    return table;
}

dictionary_t *create_dictionary() {
    dictionary_t *dict = malloc(sizeof(dictionary_t));
    if (dict == NULL) {
        return NULL;
    }
    dict->table = create_table();
    if (dict->table == NULL) {
        free(dict->table);
        return NULL;
    }
    dict->size = 0;
    return dict;
}

int hash_code(const char* word) {
    int length = strnlen(word, MAX_WORD_LEN);
    int hash = 0;
    for (int i = 0; i < length; i++)
    {
        hash += word[i] * INITIAL_HASH_TABLE_SIZE;
    }
    return hash % INITIAL_HASH_TABLE_SIZE;
}

int dict_insert(dictionary_t *dict, const char *word) {
    if (word == NULL || dict == NULL) //checks if arguments are valid
    {
        return -1; 
    }
    int index = hash_code(word); 
    list_node_t *new_word = malloc(sizeof(list_node_t));
    if (new_word == NULL){
        free(new_word);
        return -1;
    }
    new_word->next = dict->table->array[index]; 
    strncpy(new_word->word,word, MAX_WORD_LEN-1);
    dict->table->array[index] = new_word;
    // dict->table->length++;
    dict->size++;
    return 0;
}

int dict_find(const dictionary_t *dict, const char *query) {
    int index = hash_code(query);
    list_node_t *tmp = dict->table->array[index]; //finds the index of the linked list of the inputed word
    while (tmp != NULL){
        if(strcmp(tmp->word, query) == 0){
            return 1; //returns 1 if a the word is found in the dictonary
        }
        else{
        tmp = tmp->next;
        }
    }
    return 0; //returns 0 if the word is not found
}

void dict_print(const dictionary_t *dict) {
    if (dict == NULL){
        return;
    }
    for (int i = 0; i < dict->table->length; i++){ //for loop is used to travere the hash table and all its linked lists at each hash index
        list_node_t *ptr = dict->table->array[i];
        while (ptr != NULL){ //traverses each linked list and continues printing their values until no word is found
            printf("%s\n", ptr->word);
            ptr = ptr->next;
        }
    }
}


void dict_free(dictionary_t *dict) {
    if (dict == NULL){
        return;
    }
    for (int i = 0; i < dict->table->length; i++){ //loops through the entire table of the dictionary
        list_node_t *ptr = dict->table->array[i]; //every array is traversed through.
        while (ptr != NULL){
            list_node_t *tmp = ptr;
            ptr = ptr->next; 
            free(tmp);
        }
    }
    free(dict->table->array);
    free(dict->table);
    free(dict);
}

dictionary_t *read_dict_from_text_file(const char *file_name) {
    FILE *file = fopen(file_name, "r"); //opens the file to be read
    char file_data[255];

    dictionary_t *new_dict = create_dictionary();
    if (file == NULL){ //checks the validity of the file
        dict_free(new_dict);
        return NULL;
    }
    while (fgets(file_data, sizeof(file_data), file) != NULL){ //reads through each line of the file
        file_data[strcspn(file_data, "\n")] = '\0'; //strncspn is used to find the first index of '\n'. When it is found, it is changed to be a null terminator in order to prevent extra new linings for each word
        
        if (dict_insert(new_dict, file_data) == -1){
            free(new_dict);
            return NULL;
        }
    }
    fclose(file); //closes file
    return new_dict;
}


int write_dict_to_text_file(const dictionary_t *dict, const char *file_name) {
    FILE *file = fopen(file_name, "w"); //opens the file to be written
    if (dict == NULL || file == NULL){ //checks the validity of the dictionary and file in the arguments
        return -1;
    }
    for (int i = 0; i < dict->table->length; i++){ //traverses all hash indexes of the hash table
        list_node_t *ptr = dict->table->array[i];
        while (ptr != NULL){
            fprintf(file,"%s\n", ptr->word); //fprintf is used to write onto a new file
            ptr = ptr->next;
        }
    }
    fclose(file); //closes file
    return 0;
}
