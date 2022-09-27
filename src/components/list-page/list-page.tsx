
import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates, ButtonState } from "../../types";
import style from "./list-page.module.css";
import { LinkedListNode, LinkedList, IList } from "./list";

export const ListPage: React.FC = () => {
  const { page, input, buttonsBox, node, clear, button, nodeBox } = style;
  const [inputValue, setInputValue] = useState("");
  const [inputIndex, setInputIndex] = useState("");
  const [head, setHead] = useState<number | null>(null);
  const [tail, setTail] = useState<number | null>(null);
  const [renderArray, setRenderArray] = useState<LinkedListNode<string | number>[] | []>(
    []
  );
  const [linkedList, setLinkedList] = useState(new LinkedList<string>());
  const [buttonState, setBattonState] = useState<ButtonState>({
    add: {
      isDisabled: true,
    },
    del: {
      isDisabled: true,
    },
    clear: {
      isDisabled: true,
    },
  });
  useEffect(() => {

  }, [setRenderArray, setLinkedList]);

  const renderList = () => {
    setRenderArray([]);
    setTimeout(() => {
    
    }, DELAY_IN_MS / 1.59);
  };

  const inputChangeValue = (e: any) => {
    setInputValue(e.target.value);
    !e.target.value &&
      setBattonState({ ...buttonState, add: { isDisabled: true } });
    e.target.value &&
      setBattonState({ ...buttonState, add: { isDisabled: false } });
  };
  const inputChangeIndex = (e: any) => {
    setInputIndex(e.target.value);
    !e.target.value &&
      setBattonState({ ...buttonState, add: { isDisabled: true } });
    e.target.value &&
      setBattonState({ ...buttonState, add: { isDisabled: false } });
  };

  const enqueue = (value: string) => {
  
  };

  const dequeue = () => {
   
  };
  

  return (
    <SolutionLayout title="Связный список">
      <div className={page}>
        <Input
          extraClass={input}
          type={"text"}
          maxLength={4}
          value={inputValue}
          isLimitText
          onChange={inputChangeValue}
        />
        <Button
          text="Добавить в head"
          disabled={buttonState.add.isDisabled}
          onClick={() => enqueue(inputValue)}
          extraClass={button}
        />
         <Button
          text="Добавить в tail"
          disabled={buttonState.add.isDisabled}
          onClick={() => enqueue(inputValue)}
          extraClass={button}
        />
        <Button
          text="Удалить из head"
          disabled={buttonState.del.isDisabled}
          onClick={() => dequeue()}
          extraClass={button}
        />
        <Button
          text="Удалить из tail"
          disabled={buttonState.del.isDisabled}
          onClick={() => dequeue()}
          extraClass={button}
        />
      </div>
      <div className={page}>
        <Input
          extraClass={input}
          type={"text"}
          maxLength={2}
          value={inputIndex}
          isLimitText
          onChange={inputChangeIndex}
        />
        <Button
          text="Добавить по индексу"
          disabled={buttonState.add.isDisabled}
          onClick={() => enqueue(inputIndex)}
          extraClass={button}
        />
        <Button
          text="Удалить по индексу"
          disabled={buttonState.del.isDisabled}
          onClick={() => dequeue()}
          extraClass={button}
        />
      </div>
      <ul className={nodeBox}>
        {renderArray &&
          renderArray.map((i, index, arr) => (
            <li key={index} className={i.state}>
              <Circle
                extraClass={node}
                state={i.state}
                letter={i.value}
                index={index}
                head={index === 0 ? "head" : ""}
                tail={index === arr.length ? "tail" : ""}
              />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};