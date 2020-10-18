type Temp<T> =
  // Empty state
  | []
  // Item added
  | [item: T]
  // Priority added
  | [item: T, priority: number];

export class PriorityQueue<T> {
  private backingStore = new Map<number, T[]>();

  get length() {
    return this.backingStore.size;
  }

  private temp: Temp<T> = [];

  /** Say it loud. "De-queue".
   *
   * Returns whatever (if anything) currently occupying the first place in line. */
  deq(priority: number) {
    return this.backingStore.get(priority);
  }

  /** Returns an array containing all the items in the queue, if any.
   *
   * Then resets the queue to a new empty state. */
  flush() {
    const line = [...this.backingStore];

    this.backingStore = new Map<number, T[]>();

    return line;
  }

  /** Say it loud. "En-queue".
   *
   * Takes an item and places it at the back of line. */
  enq(item: T) {
    // [] -> [item];
    this.temp = [item];

    return this;
  }

  at(priority: number) {
    if (this.temp.length) {
      const item = this.temp[0];
      // [item] -> [item, priority];
      this.temp = [item, priority];
    }
  }
}

const pq = new PriorityQueue();

pq.enq("Foo").at(0);
