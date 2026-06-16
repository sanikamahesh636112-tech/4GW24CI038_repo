#include <stdio.h>
#include <stdlib.h>

// Define the node structure
struct Node {
    int data;
    struct Node* next;
};

// Head pointer
struct Node* head = NULL;

// Function to create a new node
struct Node* createNode(int value) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = value;
    newNode->next = NULL;
    return newNode;
}

// Insert at the beginning
void insertFirst(int value) {
    struct Node* newNode = createNode(value);
    newNode->next = head;
    head = newNode;
}

// Insert at the end
void insertRear(int value) {
    struct Node* newNode = createNode(value);
    if (head == NULL) {
        head = newNode;
        return;
    }
    struct Node* temp = head;
    while (temp->next != NULL)
        temp = temp->next;
    temp->next = newNode;
}

// Insert at a specific position (middle)
void insertMiddle(int value, int position) {
    if (position == 1) {
        insertFirst(value);
        return;
    }
    struct Node* newNode = createNode(value);
    struct Node* temp = head;
    for (int i = 1; i < position - 1 && temp != NULL; i++)
        temp = temp->next;
    if (temp == NULL) {
        printf("Position out of bounds.\n");
        return;
    }
    newNode->next = temp->next;
    temp->next = newNode;
}

// Display the list
void displayList() {
    struct Node* temp = head;
    printf("Linked List: ");
    while (temp != NULL) {
        printf("%d -> ", temp->data);
        temp = temp->next;
    }
    printf("NULL\n");
}

// Main function with switch-case menu
int main() {
    int choice, value, position;
    while (1) {
        printf("1. Insert at First\n2. Insert at Rear\n3. Insert at Middle\n4. Display\n5. Exit\nEnter your choice: ");
        scanf("%d", &choice);
        switch (choice) {
            case 1:
                printf("Enter value to insert at first: ");
                scanf("%d", &value);
                insertFirst(value);
                break;
            case 2:
                printf("Enter value to insert at rear: ");
                scanf("%d", &value);
                insertRear(value);
                break;
            case 3:
                printf("Enter value and position to insert in middle: ");
                scanf("%d %d", &value, &position);
                insertMiddle(value, position);
                break;
            case 4:
                displayList();
                break;
            case 5:
                exit(0);
            default:
                printf("Invalid choice. Try again.\n");
        }
    }
    return 0;
}