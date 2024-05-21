 #include <stdlib.h>

#ifndef DICTIONARY_H
#define DICTIONARY_H

#define MAX_WORD_LEN 128
#define INITIAL_HASH_TABLE_SIZE 50000

// Data type for nodes in linked list
typedef struct list_node {
    char word[MAX_WORD_LEN]; // Word, as a null-terminated string
    struct list_node *next;  // next in chain     
} list_node_t;

// Data type for a hash table. Use chaining for collisions, so array of list_nodes
typedef struct {
    list_node_t **array; // base array for hash table
    unsigned int length; // Length of base array
} table_t;

// Data type for a dictionary
typedef struct {
    table_t *table;   // Hash table that stores words
    unsigned size;    // Number of words stored in the dictionary
} dictionary_t;

/*
 * Create a new hash table
 * Returns: Pointer to a table_t representing an empty hash table
 *          or NULL if an error occurs
 */
table_t *create_table();

/*
 * Create a new empty dictionary
 * Returns: Pointer to a dictionary_t representing an empty dictionary
 *          or NULL if an error occurs
 */
dictionary_t *create_dictionary();

/*
 * Return an acceptable hash code for a given string
 * word: The word to get a hash code for
 * Returns: an int that can be used as a hash code
 *  Note: There are no guarantees on the bounds of this int, it 
 *      is up to the caller to use module or other operations to
 *      convert the result into a table index
 * _good_ hash codes will try to avoid clustering
 */
int hash_code(const char* word);

/*
 * Resize a hash table
 * Returns a new hash table that has all the same data as original,
 *  but with a larger array. Frees the original table 
 */
table_t* resize_table(table_t* orig);

/*
 * Add a new word to the dictionary 
 * dict: A pointer to a dictionary to add the word to
 * word: The new word to add, as a null-terminated string
 * Returns: 0 if the word was successfully added
 *          or -1 if the word could not be added
 */
int dict_insert(dictionary_t *dict, const char *word);

/*
 * Search for a specific word in the dictionary
 * dict: A pointer to the dictionary to search
 * query: The word to search for, as a null-terminated string
 * Returns: 1 if the score was found in the dictionary, 0 otherwise
 */
int dict_find(const dictionary_t *dict, const char *query);

/*
 * Print out all words in a dictionary, in arbitrary order
 * dict: A pointer to the dictionary containing all words to print
 */
void dict_print(const dictionary_t *dict);

/*
 * Frees all memory used to store the contents of a dictionary
 * dict: A pointer to the dictionary to free
 */
void dict_free(dictionary_t *dict);

/*
 * Create a new dictionary containing all words listed in a text file
 * file_name: The name of the file to read words from
 * Returns: A pointer to a new dictionary containing all of the file's words
 *          or NULL if the read operation fails
 */
dictionary_t *read_dict_from_text_file(const char *file_name);

/*
 * Writes the contents of a dictionary to a text file
 * dict: The dictionary to write
 * file_name: The name of the text file to write to
 * Returns: 0 on success or -1 on failure
 */
int write_dict_to_text_file(const dictionary_t *dict, const char *file_name);

#endif // DICTIONARY_H
