import { snapshot } from "utils/snapshot";

/** Accepts items OR arrays of such items, but will flatten any arrays and treat all the items enqueued as individual items.
 *
 * Given two items: assuming the 1st item is an array of ["foo", "bar"], and the 2nd item an array of ["baz"], the `FlatQueue` will NOT treat the line as:
 *
 *  * Pos 1: string[];
 *  * Pos 2: string[];
 *  * Line length: 2;
 *
 * Instead `FlatQueue` WILL treat the line as:
 *
 *  * Pos 1: "foo";
 *  * Pos 2: "bar";
 *  * Pos 3: "baz";
 *  * Line length: 3;
 *
 * In other words, `FlatQueue` will flatten any arrays passed to it and enqueue the ELEMENTS OF the array individually.
 *
 * As the name `FlatQueue` would suggest. */
export class FlatQueue<T> {
  private backingStore: T[] = [];

  get length() {
    return this.backingStore.length;
  }

  constructor(...data: T[]) {
    this.enq(...data);
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
  enq(...item: T[]) {
    return this.backingStore.push(...(item.flat(Infinity) as T[]));
  }
}

/////////////////////////////////////////////////////////////

// All strings no, problem

const stringQueue = new FlatQueue("woot", "damn", "son");

stringQueue.enq("Hello");

stringQueue.enq("My");
stringQueue.enq("Name");
stringQueue.enq("Is");
stringQueue.enq("Hurrrgus");

snapshot(stringQueue);
snapshot(stringQueue.deq());
snapshot(stringQueue.deq());
snapshot(stringQueue.deq());
snapshot(stringQueue.deq());

let item: any = true;
while (item) {
  item = stringQueue.deq();
  snapshot(item);
}

snapshot(stringQueue);

/////////////////////////////////////////////////////////

// All string arrays, no problem

const stringArrayQueue = new FlatQueue(["woot", ["damn", "son"]]);

stringArrayQueue.enq(["Hello"]);

stringArrayQueue.enq(["My"]);
stringArrayQueue.enq(["Name"]);
stringArrayQueue.enq(["Is"]);
stringArrayQueue.enq(["Hurrrgus"]);

snapshot(stringArrayQueue);
snapshot(stringArrayQueue.deq());
snapshot(stringArrayQueue.deq());
snapshot(stringArrayQueue.deq());
snapshot(stringArrayQueue.deq());

let item2: any = true;
while (item2) {
  item2 = stringArrayQueue.deq();
  snapshot(item2);
}

snapshot(stringArrayQueue);
