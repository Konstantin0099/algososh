import React, { useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS } from "../../constants/delays";
import style from "./fibonacci-page.module.css";
import { flushSync } from "react-dom";
const { page, input, numberClass, numbers } = style;

export const FibonacciPage: React.FC = () => {
  const [arrNumbers, setArrNumbers] = useState<number[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [inputNumber, setInputNumber] = useState<number | string>("");

  const lineUp = (
    arr: number[],
    q: number | string,
    s: number,
    index: number
  ) => {
    arr = [...arr, s];
    flushSync(() => {
      setArrNumbers(arr);
    });
    if (index < q) {
      let sum = arr[index - 1] + arr[index];
      index++;
      setTimeout(() => {
        lineUp(arr, q, sum, index);
      }, DELAY_IN_MS);
    } else {
      setIsDisabled(true);
      setIsLoader(false);
    }
    flushSync(() => {
      setArrNumbers(arr);
    });
  };

  const onClickButton = useMemo(
    () => (q: number | string) => {
      setIsLoader(true);
      const arr: number[] = [];
      arr[0] = 1;
      if (q > 0 && q <= 19) {
        setTimeout(() => {
          lineUp(arr, q, 1, 1);
        }, DELAY_IN_MS);
      }
      setArrNumbers(arr);
      return;
    },
    [setIsLoader, setInputNumber, setArrNumbers, lineUp]
  );
  const rememberNumber = useMemo(
    () => (e: any) => {
      const valueInput = e.target.value;
      if (
        valueInput >= 0 &&
        valueInput <= 19 &&
        Number.isInteger(Number(valueInput))
      ) {
        setInputNumber(valueInput);
        if (valueInput) {
          setIsDisabled(false);
        } else {
          setIsDisabled(true);
        }
      }
    },
    [setInputNumber, setIsDisabled]
  );

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={page}>
        <Input
          placeholder="Введите число"
          extraClass={input}
          type="number"
          max={19}
          value={inputNumber}
          isLimitText
          maxLength={2}
          onChange={rememberNumber}
        />
        <Button
          text="Рассчитать"
          isLoader={isLoader}
          disabled={isDisabled}
          linkedList={"small"}
          onClick={() => onClickButton(inputNumber)}
        />
      </div>
      <ul className={numbers}>
        {arrNumbers.map((i, index) => (
          <li key={index} className={numberClass}>
            <Circle letter={i} index={index} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
