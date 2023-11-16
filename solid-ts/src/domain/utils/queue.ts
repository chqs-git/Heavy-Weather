interface queueObject<T> {
    [index: number] : T;
}

// @todo(add comments!)
export class Queue<T> {
    private queue : queueObject<T>;
    private head : number;
    private tail : number;

    constructor() {
        this.queue = { };
        this.head = 0;
        this.tail = 0;
    }

    get isEmpty() {
        return this.size === 0;
    }

    get size() {
        return this.tail - this.head;
    }

    enqueue(value : T) : void {
        this.queue[this.tail] = value;
        this.tail++;
    }

    // returns null if queue is empty
    dequeue() : T {
        const value = this.queue[this.head];
        delete this.queue[this.head];
        this.head++
        return value;
    }

    // returns null if queue is empty
    peek() : T {
        return this.queue[this.head];
      }

    clear(): void {
        this.queue = {};
        this.head = 0;
        this.tail = 0;
    }
}
