#include <iostream>
using namespace std;

class Node {
public:
    string url;
    Node* prev;
    Node* next;

    Node(string u) {
        url = u;
        prev = NULL;
        next = NULL;
    }
};

class BrowserHistory {
private:
    Node* current;

public:
    BrowserHistory(string homepage) {
        current = new Node(homepage);
    }

    void visit(string url) {
        Node* newNode = new Node(url);

        current->next = NULL;
        newNode->prev = current;
        current->next = newNode;

        current = newNode;
    }

    void back() {
        if (current->prev != NULL)
            current = current->prev;
        else
            cout << "No previous page\n";
    }

    void forward() {
        if (current->next != NULL)
            current = current->next;
        else
            cout << "No forward page\n";
    }

    void showCurrent() {
        cout << "Current Page: " << current->url << endl;
    }

    void showHistory() {
        Node* temp = current;

        while (temp->prev != NULL)
            temp = temp->prev;

        cout << "History:\n";

        while (temp != NULL) {
            if (temp == current)
                cout << "-> ";
            cout << temp->url << endl;
            temp = temp->next;
        }
    }
};

int main() {
    BrowserHistory bh("google.com");

    bh.visit("youtube.com");
    bh.visit("github.com");
    bh.visit("leetcode.com");

    bh.back();
    bh.back();

    bh.forward();

    bh.visit("stackoverflow.com");

    bh.showCurrent();
    bh.showHistory();

    return 0;
}