export class Queue<T> {
  private backingStore: T[] = [];

  get length() {
    return this.backingStore.length;
  }

  constructor(firstItem?: T) {
    if (firstItem) {
      this.enq(firstItem);
    }
  }

  /** Say it loud. "De-queue".
   *
   * Returns whatever (if anything) currently occupying the first place in line. */
  deq() {
    return this.backingStore.shift();
  }

  /** Returns an array containing all the items in the queue, if any.
   * 
   * Then resets the queue to a new empty state. */
  flush() {
    const line = [...this.backingStore];

    this.backingStore = [];

    return line;
  }

  /** Say it loud. "En-queue".
   *
   * Takes an item and places it at the back of line. */
  enq(item: T) {
    return this.backingStore.push(item);
  }
}
