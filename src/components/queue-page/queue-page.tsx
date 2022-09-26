import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates, ButtonState } from "../../types";
import style from "./queue-page.module.css";
import { Queue, ElementArray, IQueue } from "./queue";

export const QueuePage: React.FC = () => {
  const { page, input, buttonsBox, node, clear, button, nodeBox } = style;
  const [inputValue, setInputValue] = useState("");
  const [head, setHead] = useState<number | null>(null);
  const [tail, setTail] = useState<number | null>(null);
  const [renderArray, setRenderArray] = useState<ElementArray<string>[] | []>(
    []
  );
  const [queue, setQueue] = useState(new Queue<string>());
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
    setQueue(new Queue());
    // console.log("useEffect", queue, renderArray);
    setRenderArray(queue.arr);
  }, [setRenderArray, setQueue]);

  const renderQueue = () => {
    setRenderArray([...queue.arr]);
    setTimeout(() => {
      (queue.tail === 0 || queue.tail) &&
        (queue.arr[queue.tail].state = ElementStates.Default);
      setRenderArray([...queue.arr]);
    }, DELAY_IN_MS / 1.59);
  };

  const inputChange = (e: any) => {
    setInputValue(e.target.value);
    !e.target.value &&
      setBattonState({ ...buttonState, add: { isDisabled: true } });
    e.target.value &&
      setBattonState({ ...buttonState, add: { isDisabled: false } });
  };

  const enqueue = (value: string) => {
    queue.enqueue(value);
    (head === null) && setHead(queue.head);
    setTail(queue.tail);
    renderQueue();
    setInputValue("");
    setBattonState({
      ...{
        clear: { isDisabled: false },
        add: { isDisabled: true },
        del: { isDisabled: false },
      },
    });
  };

  const dequeue = () => {
    if (queue.head === null) {return}
    let headTemp = queue.head;
    if (queue.dequeue()) return;
    (tail === null) && setTail(queue.tail);
    renderArray[headTemp] = {
      ...renderArray[headTemp],
      state: ElementStates.Changing,
    };
    setRenderArray([...renderArray]);
    setTimeout(() => {
    setHead(queue.head);
    setTail(queue.tail);
    renderQueue();
    ;}, DELAY_IN_MS / 1.59)
  };
  const clearQueue = () => {
    queue.clear();
    setHead(queue.head);
    setTail(queue.tail);
    setRenderArray([...queue.arr]);

    // renderQueue();
    // queue.clear();
    // renderQueue();
    // setBattonState({
    //   add: { isDisabled: true },
    //   del: { isDisabled: true },
    //   clear: { isDisabled: true },
    // });
    // setQueue(new Queue());
    // setRenderArray(queue.arr);
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={page}>
        <Input
          extraClass={input}
          type={"text"}
          maxLength={4}
          value={inputValue}
          isLimitText
          onChange={inputChange}
        />
        <Button
          text="Добавить"
          disabled={buttonState.add.isDisabled}
          onClick={() => enqueue(inputValue)}
          extraClass={button}
        />
        <Button
          text="Удалить"
          disabled={buttonState.del.isDisabled}
          onClick={() => dequeue()}
          extraClass={button}
        />
        <Button
          text="Очистить"
          disabled={buttonState.clear.isDisabled}
          onClick={() => clearQueue()}
          extraClass={clear}
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
                head={index === head ? "head" : ""}
                tail={index === tail ? "tail" : ""}
              />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
