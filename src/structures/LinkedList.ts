import { Nullish } from "types/common";

class LinkedList {
    head: Nullish<LinkedNode> = null;
    next: Nullish<LinkedNode> = null;

    constructor() { }

    add(element: string) {
        const node = new LinkedNode(element);
        let current;

        // empty list
        if (this.head == null) {
            this.head = node;
            this.head.next = this.head;
            this.head.prev = this.head;
        } else {
            current = this.head;
            while (current?.next !== this.head) {
                current = current?.next;
            }

            current.next = node;
            node.next = this.head;
            node.prev = current;
            this.head.prev = node;
        }
    }
}

class LinkedNode {
    id: Nullish<string> = null;
    next: Nullish<LinkedNode> = null;
    prev: Nullish<LinkedNode> = null;

    constructor(id: string) {
        this.id = id;
    }
}

export class LinkedListFromData {
    list: Nullish<LinkedList> = null;

    constructor(data: string[]) {
        this.list = new LinkedList();
        data.forEach(element => this.list?.add(element));
    }
}

