import { ElementStates } from "../../types";
export class ElementArray<T> {
  value?: T;
  state: ElementStates;
  constructor(value: T) {
    this.value = value;
    this.state = ElementStates.Changing;
  }
}
export class Node<T> extends ElementArray<T> {
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    super(value);
    this.next = next === undefined ? null : next;
  }
}

export interface IStack<T> {
  push: (element: T) => void;
  pop: (element: T, position: number) => void;
  peak: () => Node<T> | null;
  clear: () => void;
  getSize: () => number;
  toArray: () => ElementArray<T>[];
}

export class Stack<T> implements IStack<T> {
  head: Node<T> | null;
  private size: number;
  arr: ElementArray<T>[];
  constructor(value?: T) {
    this.head = null;
    this.size = 0;
    this.arr = [];
  }
  push = (element: T): void => {
    const newNode = new Node(element);
    newNode.next = this.head;
    this.head = newNode;
    this.arr = [...this.arr, { value: element, state: ElementStates.Changing }];
  };
  pop = (): void => {
    this.head !== null && this.head.next !== null
      ? (this.head = this.head.next)
      : (this.head = this.head);
    this.arr.pop();
  };
  peak = (): Node<T> | null => {
    return this.head;
  };
  clear = (): void => {
    this.head = null;
    this.size = 0;
    this.arr = [];
  };
  getSize = (): number => {
    return this.arr.length;
  };
  toArray = (): ElementArray<T>[] => {
    return this.arr;
  };
}
