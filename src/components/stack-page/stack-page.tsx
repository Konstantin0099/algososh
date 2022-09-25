import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { Stack, ElementArray, Node } from "./stack";
import { render } from "@testing-library/react";
//import { clear } from "console";
// import { arrayBuffer } from "stream/consumers";

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

  useEffect(() => {
    // const renderArray: ElementArray<T>[] = [];
  }, []);

  const renderStack = () => {
    // console.log("renderStack");
    const nodeTemp = stack.head;
    nodeTemp && nodeTemp.state && (nodeTemp.state = ElementStates.Default);
    const arrTemp = stack.toArray();
    // nodeTemp && nodeTemp.state && console.log("renderStack", nodeTemp, arrTemp);
    setrenderArray(arrTemp);
    setTimeout(() => {
      // console.log("setTimeout", stack.arr.length - 1);

      // stack.head && (stack.head.state = ElementStates.Default);
      stack.arr.length >= 1 &&
        (stack.arr[stack.arr.length - 1].state = ElementStates.Default);
      // setrenderArray([...stack.toArray()]);
      setrenderArray([...arrTemp]);
      // console.log("перекраска", nodeTemp, arrTemp);
    }, 500);
  };

  // const inputChange = (

  // ) => {};

  const inputChange = (e: any) => {
    // let b1 = buttonState;
    // console.log("inputChange1", b1);
    setInputValue(e.target.value);
    !e.target.value &&
      setBattonState({ ...buttonState, add: { isDisabled: true } });
    e.target.value &&
      setBattonState({ ...buttonState, add: { isDisabled: false } });
    console.log("buttonState", buttonState);
    // let b2 = buttonState;
    // console.log("inputChange2", b2);
    // if (e.target.value) {
    //   setIsDisabled(false);
    // } else {
    //   setIsDisabled(true);
    // }
  };

  const pushStack = (value: string) => {
    let b1 = buttonState;
    if (stack) {
      // console.log("pushStack", value);
      stack.push(value);
    } else {
      setStack(new Stack(value));
    }
    setInputValue("");
    // let b1 = buttonState;
    // console.log("inputChange1", b1);
    setBattonState({
      ...{
        clear: { isDisabled: false },
        add: { isDisabled: true },
        del: { isDisabled: false },
      },
    });
    let b2 = { ...buttonState };
    // console.log("b2 === b1", b2 === b1, b2, b1);
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
    }, 500)
   
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
          // isLoader={isLoader}
          disabled={buttonState.add.isDisabled}
          // linkedList={"small"}
          onClick={() => pushStack(inputValue)}
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
      <ul className={nodeBox}>
        {renderArray &&
          renderArray.map((i, index, arr) => (
            <li key={index} className={i.state}>
              {/* {inputValue} */}
              <Circle
                extraClass={node}
                state={i.state}
                letter={i.value}
                index={index}
                // index={index}
                head={index === arr.length - 1 ? "top" : ""}
              />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
