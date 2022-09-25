import React, { useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS } from "../../constants/delays";
import {
  ElementStates,
  ElementNumberArray,
  Direction,
  SortingMethod,
  ButtonState,
} from "../../types";
import style from "./stack-page.module.css";
import {Stack} from "./stack";
//import { clear } from "console";
// import { arrayBuffer } from "stream/consumers";


export const StackPage: React.FC = () => {
  const { page, input, buttonsBox , node, clear, button } = style;
  const [inputValue, setInputValue] = useState("");
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
  const inputChange = () => {};
  const pushStack = () => {};
  const popStack = () => {};
  const clearStack = () => {};



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
          // isLoader={isLoader}
          disabled={buttonState.add.isDisabled}
          // linkedList={"small"}
          onClick={() => pushStack()}
          extraClass={button}
        />
        <Button
          text="Удалить"
          // isLoader={isLoader}
          disabled={buttonState.del.isDisabled}
          // linkedList={"small"}
          onClick={() => popStack()}
          extraClass={button}
        />
        <Button
          text="Очистить"
          // isLoader={isLoader}
          disabled={buttonState.clear.isDisabled}
          // linkedList={"small"}
          onClick={() => clearStack()}
          extraClass={clear}
        />
      </div>
      <ul className={buttonsBox }>
        {stack.arr.map((i, index, arr) => (
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
