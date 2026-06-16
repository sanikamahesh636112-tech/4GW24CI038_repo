import java.util.Scanner;

public class UndoRedoSystem {

    static StackDS undoStack = new StackDS(10);
    static StackDS redoStack = new StackDS(10);s

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        int choice;

        do {
            System.out.println("\n1. Perform Action");
            System.out.println("2. Undo");
            System.out.println("3. Redo");
            System.out.println("4. Exit");
            System.out.print("Enter choice: ");
            choice = sc.nextInt();
            sc.nextLine();

            switch (choice) {

                case 1:
                    System.out.print("Enter action: ");
                    String act = sc.nextLine();
                    undoStack.push(new Action(act));
                    redoStack.clear();
                    System.out.println("Action saved.");
                    break;

                case 2:
                    Action undo = undoStack.pop();
                    if (undo != null) {
                        redoStack.push(undo);
                        System.out.println("Undo: " + undo.text);
                    } else {
                        System.out.println("Nothing to undo.");
                    }
                    break;

                case 3:
                    Action redo = redoStack.pop();
                    if (redo != null) {
                        undoStack.push(redo);
                        System.out.println("Redo: " + redo.text);
                    } else {
                        System.out.println("Nothing to redo.");
                    }
                    break;

                case 4:
                    System.out.println("Project Finished.");
                    break;
            }
        } while (choice != 4);
    }
}
