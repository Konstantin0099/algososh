import { ElementStates } from "../../types";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";

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
    }, SHORT_DELAY_IN_MS );
    // console.log("addToTop:", this.head, this.tail);
  };
  addToTail = (element: T, state: ElementStates): void => {
    let nodeTemp = new LinkedListNode(element);
    if (this.tail === null) {
      // console.log("addToTail this.tail1=", this.tail, this.head, nodeTemp)
      nodeTemp.next = this.head;
      this.head = nodeTemp;
      this.tail = this.head;
      this.tail.state = state;
    } else {
      // console.log("addToTail this.tail2=", this.tail)
      this.tail && (this.tail.next = nodeTemp);
      this.tail.next && (this.tail = this.tail.next);
      this.tail.state = state;
    }
    setTimeout(() => {
      this.tail && (this.tail.state = ElementStates.Default);
    }, SHORT_DELAY_IN_MS);
    // console.log("addToTail:", this.head, this.tail);
  };
  delFromTop = (): void => {
    if (this.head === null) {
      return;
    } else {
      if (this.head === this.tail) {
        this.head = null;
        this.tail = null;
      } else {
        this.head && (this.head = this.head.next);
      }
    }
    // console.log("delFromTop:", this.head, this.tail);
  };
  delFromTail = (): void => {
    // console.log("delFromTail=", this.head, this.tail);
    let nodeTemp = this.head;
    if (nodeTemp === null) {
      return;
    }
    if (nodeTemp && nodeTemp.next === null) {
      this.head = null;
      this.tail = null;
      console.log("---delFromTail:", this.head, this.tail);
      return;
    }
    // while (nodeTemp && nodeTemp !== null && nodeTemp.next !== this.tail) {
    while (nodeTemp && nodeTemp.next !== this.tail) {
      // console.log(" while", (nodeTemp && nodeTemp.next !== this.tail));
      nodeTemp = nodeTemp.next;
    }
    // console.log("delFromTail=if", nodeTemp, this.tail);
    if (nodeTemp) {
      nodeTemp.next = null;
      this.tail = nodeTemp;
      // this.tail.next = null;
    }
    // console.log("delFromTail:", this.head, this.tail);
  };

  addByIndex = (element: T, index: number): void => {

    let nodeTemp = new LinkedListNode(element);

    switch (index) {
      case 0:
        if (this.head === null) {
          this.head = nodeTemp;
          this.tail = this.head;
        } else {
          nodeTemp.next = this.head;
          this.head = nodeTemp;
        }
        break;
      default:
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
    }
    // console.log("addByIndex:", this.head, this.tail);
  };

  delByIndex = (index: number): void => {
    switch (index) {
      case 0:
        this.head = this.head?.next;
        (this.head === null) && (this.tail = null);
        break;
      case 1:
        // console.log("this.head=", this.head);
        this.head && (this.head.next = this.head?.next?.next);
        this.head && (this.head.next === null) && (this.tail = this.head);
        break;
      default:
        // console.log("default1:", this.tail);
        let i = 0;
        let tempNode = this.head;
        while (i < index - 1) {
          // console.log("i:=", i);
          tempNode = tempNode?.next;
          i++;
        }
        tempNode && (tempNode.next === this.tail) && (this.tail = tempNode);
        tempNode && (tempNode.next = tempNode?.next?.next);
        // console.log("default2:", tempNode && (tempNode.next === this.tail));
      }
      // console.log("delByIndex:", this.head, this.tail);
  };
}
