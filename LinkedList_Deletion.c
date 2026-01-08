#include <stdio.h>
#define SIZE 5

int queue[SIZE];
int front = 0, rear = 0, count = 0;

// Enqueue operation
void addQ(int value) {
    if (count == SIZE) {
        printf("Queue Overflow! Cannot insert %d\n", value);
        return;
    }
    queue[rear] = value;
    rear = (rear + 1) % SIZE;
    count++;
    printf("Inserted %d into Circular Queue\n", value);
}

// Dequeue operation
void deleteQ() {
    if (count == 0) {
        printf("Queue Underflow! Nothing to delete\n");
        return;
    }
    printf("Deleted %d from Circular Queue\n", queue[front]);
    front = (front + 1) % SIZE;
    count--;
}

// Display operation
void display() {
    if (count == 0) {
        printf("Circular Queue is Empty\n");
        return;
    }
    printf("Circular Queue contents:\n");
    printf("FRONT → ");
    for (int i = 0; i < count; i++) {
        int index = (front + i) % SIZE;
        printf("[%d] ", queue[index]);
    }
    printf("← REAR\n");
}

int main() {
    int choice, value;
    do {
        printf("1. AddQueue\n 2. DeleteQueue\n 3. Display\n 4. Exit\n");
        printf("Enter the choice: ");
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
                printf("Exiting Circular Queue Program\n");
                break;
            default:
                printf("Invalid choice\n");
        }
    } while (choice != 4);
    return 0;
}