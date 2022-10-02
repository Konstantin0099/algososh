import { ElementStates } from "../../types";
import { MAX_QUEUE } from "../../constants/element-captions";
export class ElementArray<T> {
  value?: T;
  state: ElementStates;
  constructor(value: T) {
    this.value = value;
    this.state = ElementStates.Default;
  }
}
export interface IQueue<T> {
  enqueue: (element: T) => void;
  dequeue: (element: T, position: number) => void;
  clear: () => void;
}

export class Queue<T> implements IQueue<T> {
  head: number | null;
  tail: number | null;
  size: number;
  arr: ElementArray<T>[];

  constructor(value?: T) {
    this.head = null;
    this.tail = null;
    this.size = MAX_QUEUE;
    this.arr = [];
    for (let i = 0; i <= 6; i++) {
      this.arr[i] = { value: value, state: ElementStates.Default };
    }
  }
  enqueue = (element: T): void => {
    if (this.head === MAX_QUEUE) {
      return;
    }
    if (this.head === null) {
      this.head = 0;
      this.tail = 0;
      this.arr[this.tail] = {
        value: element,
        state: ElementStates.Changing,
      };
    } else {
      if (this.tail !== null) {
        if (this.tail + 1 <= this.size) {
          this.tail++;
          this.arr[this.tail] = {
            value: element,
            state: ElementStates.Changing,
          };
        } else {
          return;
        }
      } else {
        this.tail = this.head;
        this.arr[this.tail] = {
          value: element,
          state: ElementStates.Changing,
        };
      }
    }
  };

  dequeue = (): boolean => {
    if (this.head === null) return true;
    if (this.tail !== null) {
      if (this.head + 1 <= this.tail) {
        this.arr[this.head] = {
          state: this.arr[this.head].state,
        };
        this.head++;
      } else {
        this.arr[this.head] = {
          state: this.arr[this.head].state,
        };
        this.tail = null;
      }
    } else {
      return true;
    }
    return false;
  };

  clear = (): void => {
    this.head = null;
    this.tail = null;
    for (let i = 0; i <= 6; i++) {
      this.arr[i] = { state: ElementStates.Default };
    }
  };
}
