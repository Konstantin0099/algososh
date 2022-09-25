import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates, ButtonState } from "../../types";
import style from "./stack-page.module.css";
import { Stack, ElementArray, Node } from "./stack";

export const StackPage: React.FC = () => {
  const { page, input, buttonsBox, node, clear, button, nodeBox } = style;
  const [inputValue, setInputValue] = useState("");
  const [renderArray, setrenderArray] = useState<ElementArray<string>[] | []>(
    []
  );
  const [stack, setStack] = useState(new Stack<string>());
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

  const renderStack = () => {
    const nodeTemp = stack.head;
    nodeTemp && nodeTemp.state && (nodeTemp.state = ElementStates.Default);
    const arrTemp = stack.toArray();

    setrenderArray(arrTemp);
    setTimeout(() => {
      stack.arr.length >= 1 &&
        (stack.arr[stack.arr.length - 1].state = ElementStates.Default);

      setrenderArray([...arrTemp]);
    }, DELAY_IN_MS);
  };

  const inputChange = (e: any) => {
    setInputValue(e.target.value);
    !e.target.value &&
      setBattonState({ ...buttonState, add: { isDisabled: true } });
    e.target.value &&
      setBattonState({ ...buttonState, add: { isDisabled: false } });
  };

  const pushStack = (value: string) => {
    let b1 = buttonState;
    if (stack) {
      stack.push(value);
    } else {
      setStack(new Stack(value));
    }
    setInputValue("");

    setBattonState({
      ...{
        clear: { isDisabled: false },
        add: { isDisabled: true },
        del: { isDisabled: false },
      },
    });
    let b2 = { ...buttonState };

    renderStack();
  };

  const popStack = () => {
    stack.arr.length >= 1 &&
      (stack.arr[stack.arr.length - 1].state = ElementStates.Changing);
    renderStack();

    setTimeout(() => {
      stack.pop();
      renderStack();
      stack.arr.length === 0 &&
        setBattonState({
          ...buttonState,
          clear: { isDisabled: true },
          del: { isDisabled: true },
        });
    }, DELAY_IN_MS);
  };
  const clearStack = () => {
    stack.clear();
    renderStack();
    setBattonState({
      add: { isDisabled: true },
      del: { isDisabled: true },
      clear: { isDisabled: true },
    });
  };

  return (
    <SolutionLayout title="Стек">
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
          onClick={() => pushStack(inputValue)}
          extraClass={button}
        />
        <Button
          text="Удалить"
          disabled={buttonState.del.isDisabled}
          onClick={() => popStack()}
          extraClass={button}
        />
        <Button
          text="Очистить"
          disabled={buttonState.clear.isDisabled}
          onClick={() => clearStack()}
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
                head={index === arr.length - 1 ? "top" : ""}
              />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
