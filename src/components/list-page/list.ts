import { ElementStates } from "../../types";
import { INIT_LENGTH_LIST } from "../../constants/element-captions";
export class LinkedListNode<T> {
  value?: T;
  state: ElementStates;
  next: LinkedListNode<T> | null;
  constructor(value: T) {
    this.value = value;
    this.state = ElementStates.Default;
    this.next = null;
  }
}
export interface IList<T> {
  addToTop: (element: T) => void;
  addToTail: (element: T) => void;
  delFromTop: () => void;
  delFromTail: () => void;
  //   dequeue: (element: T, position: number) => void;
}

export class LinkedList<T> implements IList<T> {
  head: LinkedListNode<T> | null;
  tail: LinkedListNode<T> | null;

  constructor(arr: T[]) {
    this.head = new LinkedListNode(arr[0]);
    this.tail = new LinkedListNode(arr[0]);
    for (let i = 0; i <= arr.length - 1; i++) {
      //   let nodeTemp: LinkedListNode<T> = new LinkedListNode(arr[i]);
      let nodeTemp = null;
      if ((i = 0)) {
        this.head = new LinkedListNode(arr[i]);
        this.head.next = null;
        nodeTemp = this.head;
      } else {
        this.tail = new LinkedListNode(arr[i]);
        this.tail.next = nodeTemp;
        nodeTemp = this.tail;
      }
    }
  }
  addToTop = (element: T): void => {
    let nodeTemp = new LinkedListNode(element);
    if (this.head === null) {
      this.head = nodeTemp;
      this.tail = this.head;
    } else {
      nodeTemp.next = this.head;
      this.head = nodeTemp;
    }
  };
  addToTail = (element: T): void => {
    let nodeTemp = new LinkedListNode(element);
    if (this.head === null) {
      this.head = nodeTemp;
      this.tail = this.head;
    } else {
      this.tail && (this.tail.next = nodeTemp);
      this.tail = nodeTemp;
    }
  };
  delFromTop = (): void => {
    if (this.head === null) {
      return;
    } else {
      this.head = this.head.next;
    }
  };
  delFromTail = (): void => {
    let nodeTemp = this.head;
    if ((nodeTemp === null)) {return}
    if ((nodeTemp.next === null)) {
        this.head = null;
        this.tail = null;
    }
    while (nodeTemp.next !== this.tail) {
        nodeTemp = nodeTemp.next
      }
    }
  };

