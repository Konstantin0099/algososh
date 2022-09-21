import React, { useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS } from "../../constants/delays";
import style from "./fibonacci-page.module.css";
const { page, input, numberClass, letters, letter } = style;

export const FibonacciPage: React.FC = () => {
  const [isLoader, setIsLoader] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [inputNumber, setInputNumber] = useState("");
  const [arrNumbers, setArrNumbers] = useState([]);

  const lineUp = (n: number, s: number, index: number) => {
    setTimeout(() => {}, DELAY_IN_MS);
    if (0) {
    }

    console.log("lineUp - end");
  };

  const onClickButton = useMemo(
    () => (string: string) => {
      setIsLoader(true);
      setInputNumber("ожидайте");
      const arrStart: [] = [];
      if (0) {
      }
    },
    [setIsLoader, setArrNumbers, setInputNumber]
  );
  const rememberNumber = useMemo(
    () => (e: any) => {
      setInputNumber(e.target.value);
      //console.log(!!e.target.value);
      if (e.target.value) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    },
    [setInputNumber, setIsDisabled]
  );

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={page}>
        <Input
          extraClass={input}
          type={"number"}
          maxLength={11}
          value={inputNumber}
          isLimitText
          onChange={rememberNumber}
        />
        <Button
          text="Развернуть"
          isLoader={isLoader}
          disabled={isDisabled}
          linkedList={"small"}
          onClick={() => onClickButton(inputNumber)}
        />
      </div>
      <ul className={letters}>
        {arrNumbers.map((i, index) => (
          <li key={index} className={numberClass}>
            <Circle extraClass={letter} letter={letter} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
