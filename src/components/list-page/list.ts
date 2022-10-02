import { ElementStates } from "../../types";
export class LinkedListNode<T> {
  value?: T;
  state: ElementStates;
  next?: LinkedListNode<T> | null;
  constructor(value: T) {
    this.value = value;
    this.state = ElementStates.Default;
    this.next = null;
  }
}
export interface IList<T> {
  addToTop: (element: T, state: ElementStates) => void;
  addToTail: (element: T, state: ElementStates) => void;
  delFromTop: () => void;
  delFromTail: () => void;
  addByIndex: (element: T, index: number, state?: ElementStates) => void;
  delByIndex: (index: number) => void;
}

export class LinkedList<T> implements IList<T> {
  head?: LinkedListNode<T> | null;
  tail: LinkedListNode<T> | null;

  constructor(arr?: T[]) {
    this.head = null;
    this.tail = null;
    if (arr) {
      for (let i = 0; i <= arr.length - 1; i++) {
        this.addToTail(arr[i], ElementStates.Default);
      }
    }
  }

  addToTop = (element: T, state: ElementStates): void => {
    let nodeTemp = new LinkedListNode(element);
    if (this.head === null) {
      this.head = nodeTemp;
      this.head.state = state;
      this.tail = this.head;
    } else {
      nodeTemp.next = this.head;
      this.head = nodeTemp;
      this.head.state = state;
    }
    setTimeout(() => {
      this.head && (this.head.state = ElementStates.Default);
    }, 500);
  };
  addToTail = (element: T, state: ElementStates): void => {
    let nodeTemp = new LinkedListNode(element);
    if (this.tail === null) {
      this.head = nodeTemp;
      this.tail = this.head;
      this.tail.state = state;
    } else {
      this.tail && (this.tail.next = nodeTemp);
      this.tail = nodeTemp;
      this.tail.state = state;
    }
    setTimeout(() => {
      this.tail && (this.tail.state = ElementStates.Default);
    }, 500);
  };
  delFromTop = (): void => {
    if (this.head === null) {
      return;
    } else {
      this.head && (this.head = this.head.next);
    }
  };
  delFromTail = (): void => {
    let nodeTemp = this.head;
    if (nodeTemp === null) {
      return;
    }
    if (nodeTemp && nodeTemp.next === null) {
      this.head = null;
      this.tail = null;
      return;
    }
    while (nodeTemp && nodeTemp !== null && nodeTemp.next !== this.tail) {
      nodeTemp = nodeTemp.next;
    }
    if (nodeTemp) {
      this.tail = nodeTemp;
      this.tail.next = null;
    }
  };

  addByIndex = (element: T, index: number, state?: ElementStates): void => {
    if (this.head === null && index > 0) {
      return;
    }
    let nodeTemp = new LinkedListNode(element);
    if (this.head === null) {
      this.head = nodeTemp;
      state && (this.head.state = state);
      this.tail = this.head;
    } else {
      let i = 0;
      this.head && (nodeTemp.next = this.head);
      while (i < index - 1) {
        nodeTemp.next?.next && (nodeTemp.next = nodeTemp.next.next);
        i++;
      }
      let tempNodeSecond = nodeTemp.next?.next;
      let tempNodeFirst = nodeTemp.next;
      nodeTemp.next && (nodeTemp.next = tempNodeSecond);
      tempNodeFirst && (tempNodeFirst.next = nodeTemp);
      setTimeout(() => {}, 500);
    }
  };
  delByIndex = (index: any): void => {
    let tempNode = this.head;
    if (this.head === null && index > 0) {
      return;
    }
    if (this.head === null) {
      return;
    } else {
      let i = 0;
      while (i < index - 1) {
        tempNode = tempNode?.next;
        i++;
      }
      tempNode && (tempNode.next = tempNode?.next?.next);
    }
  };
}
