#include <stdio.h>
#include <stdlib.h>

// Define the structure for a queue node
struct Node {
    int data;
    struct Node* next;
};

// Declare front and rear pointers globally
struct Node* front = NULL;
struct Node* rear = NULL;

// Function to enqueue an element
void addQueue(int value) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = value;
    newNode->next = NULL;

    if (rear == NULL) {
        front = rear = newNode;
    } else {
        rear->next = newNode;
        rear = newNode;
    }

    printf("Added the element in Queue(Enqueued) : %d\n", value);
}

// Function to dequeue an element
void deleteQueue() {
    if (front == NULL) {
        printf("Queue is empty.\n");
        return;
    }

    struct Node* temp = front;
    front = front->next;

    // If front becomes NULL, update rear to NULL as well
    if (front == NULL) {
        rear = NULL;
    }

    printf("Delete Element in Queue(Dequeue): %d\n", temp->data);
    free(temp);
}

// Function to display the queue
void display() {
    struct Node* temp = front;
    if (temp == NULL) {
        printf("Queue is empty.\n");
        return;
    }

    printf("Queue: ");
    while (temp != NULL) {
        printf("| %d |", temp->data);
        temp = temp->next;
    }
    printf("\n");
}

// Main function to test the queue
int main() {
    addQueue(10);
    addQueue(20);
    addQueue(30);
    display();

    deleteQueue();
    display();

    addQueue(40);
    display();

    return 0;
}