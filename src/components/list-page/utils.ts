import {LinkedListNode} from "./list"
import { ElementStates} from "../../types";

export const returnArray = (head: LinkedListNode<string> | null | undefined) => {
  let arr: {value: string, state: ElementStates}[] = [{value: "", state: ElementStates.Default}] ;
  if (!head) {return arr}
    // console.log("returnArray", arr);
    let i = 0;
    let circuitBreaker;
    do {
        head.value && (arr[i] = {value: head.value, state: head.state})
        circuitBreaker = head.next;
        head.next && (head = head.next);
        i++
    } while (circuitBreaker)
return  arr;
}

export const rndArr = (n: number) => {
    let arr: string[] = [];
  for (let i = 0; i <= n; i++) {
    arr[i] = String(Math.ceil(Math.random() * 100));
  }
return arr;
}