#include <stdio.h>

char STR[100], PAT[50], REP[50], ANS[200];
int i = 0, j = 0, k = 0, found = 0;

/* Function to read strings */
void readStrings() {
    printf("Enter Main String: ");
    scanf(" %[^\n]", STR);

    printf("Enter Pattern String: ");
    scanf(" %[^\n]", PAT);

    printf("Enter Replace String: ");
    scanf(" %[^\n]", REP);
}

/* Function to perform pattern matching and replacement */
void findAndReplace() {
    int m = 0, n = 0, c = 0;

    while (STR[c] != '\0') {
        if (STR[m] == PAT[n]) {
            m++;
            n++;

            if (PAT[n] == '\0') {
                found = 1;
                /* Copy replacement string */
                for (i = 0; REP[i] != '\0'; i++, k++)
                    ANS[k] = REP[i];

                n = 0;
                c = m;
            }
        } else {
            ANS[k++] = STR[c++];
            m = c;
            n = 0;
        }
    }
    ANS[k] = '\0';
}

/* Function to display result */
void display() {
    if (found)
        printf("\nModified String: %s\n", ANS);
    else
        printf("\nPattern not found in the given string.\n");
}

/* Main function */
int main() {
    readStrings();
    findAndReplace();
    display();
    return 0;
}