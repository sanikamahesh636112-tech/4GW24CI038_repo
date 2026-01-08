#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/* Structure definition */
struct Day {
    char *dayName;
    int date;
    char *activity;
};

/* Function to create calendar */
struct Day* create() {
    struct Day *week;
    week = (struct Day*)malloc(7 * sizeof(struct Day));
    return week;
}

/* Function to read data */
void read(struct Day *week) {
    int i;
    char temp[100];

    for (i = 0; i < 7; i++) {
        printf("\nEnter details for Day %d\n", i + 1);

        printf("Day Name: ");
        scanf("%s", temp);
        week[i].dayName = (char*)malloc(strlen(temp) + 1);
        strcpy(week[i].dayName, temp);

        printf("Date: ");
        scanf("%d", &week[i].date);

        printf("Activity Description: ");
        scanf(" %[^\n]", temp);
        week[i].activity = (char*)malloc(strlen(temp) + 1);
        strcpy(week[i].activity, temp);
    }
}

/* Function to display calendar */
void display(struct Day *week) {
    int i;

    printf("\n\nWEEKLY ACTIVITY REPORT\n");
    printf("----------------------\n");

    for (i = 0; i < 7; i++) {
        printf("\nDay       : %s", week[i].dayName);
        printf("\nDate      : %d", week[i].date);
        printf("\nActivity  : %s\n", week[i].activity);
    }
}

/* Main function */
int main() {
    struct Day *calendar;

    calendar = create();
    read(calendar);
    display(calendar);

    return 0;
}