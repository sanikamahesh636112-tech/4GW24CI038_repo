#include <stdio.h>
#define SIZE 5

int queue[SIZE];
int front = -1, rear = -1;

// Enqueue operation
void addQ(int value) {
    if (rear == SIZE - 1) {
        printf("Queue Overflow! Cannot insert %d\n", value);
        return;
    }
    if (front == -1) front = 0;
    rear++;
    queue[rear] = value;
    printf("Inserted %d into Queue\n", value);
}

// Dequeue operation
void deleteQ() {
    if (front == -1) {
        printf("Queue Underflow! Nothing to delete\n");
        return;
    }
    printf("Deleted %d from Queue\n", queue[front]);
    front++;
}

// Display operation
void display() {
    if (front == -1) {
        printf("Queue is Empty\n");
        return;
    }
    printf("Queue contents:\n");
    printf("FRONT → ");
    for (int i = front; i <= rear; i++) {
        printf("[%d] ", queue[i]);
    }
    printf("← REAR\n");
}

int main() {
    int choice, value;
    do {
        printf("\nMenu:\n");
        printf("1. AddQ\n2. DeleteQ\n3. Display\n4. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);
        switch (choice) {
            case 1:
                printf("Enter value to insert: ");
                scanf("%d", &value);
                addQ(value);
                break;
            case 2:
                deleteQ();
                break;
            case 3:
                display();
                break;
            case 4:
                printf("Exiting Queue Program\n");
                break;
            default:
                printf("Invalid choice!\n");
        }
    } while (choice != 4);
    return 0;
}