public class StackDS {
    Action[] stack;
    int top = -1;
    int size;

    StackDS(int size) {
        this.size = size;
        stack = new Action[size];
    }

    boolean isEmpty() {
        return top == -1;
    }

    void push(Action a) {
        stack[++top] = a;
    }

    Action pop() {
        if (!isEmpty())
            return stack[top--];
        return null;
    }

    void clear() {
        top = -1;
    }
}
