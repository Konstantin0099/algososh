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
  const [inputNumber, setInputNumber] = useState<number | string>("");
  const [arrNumbers, setArrNumbers] = useState<number[]>([]);

  const lineUp = (arr: number[], q: number | string, s: number, index: number) => {
    console.log("lineUp - start",q , s, index);
    arr.push(s); 
    console.log("arr", arr);
    setArrNumbers(arr);
        if (index < q) {
          let sum = arr[index - 1] + arr[index];
          console.log("sum ", arr, index, arr[index - 1], arr[index] );
          index++;
      setTimeout(() => { lineUp(arr, q, sum, index)}, DELAY_IN_MS);
    } else {setIsDisabled(false); setIsLoader(false);};

    console.log("lineUp - end", arr);
  };

  const onClickButton = useMemo(
    () => (q: number | string) => {
      console.log("onClickButton");
      setIsLoader(true);
      setInputNumber("ожидайте");
      const arr: number[] = [];
      console.log("1");
      if ((q < 0) || (q > 19)) {return} else {arr[0] = 1;}
      setArrNumbers(arr);
      console.log("2", (q > 0));
      if (q > 0) {setTimeout(() => {console.log("3"); lineUp(arr, q, 1, 1); console.log("4");}, DELAY_IN_MS);}

    },
    [setIsLoader, setArrNumbers, setInputNumber]
  );
  const rememberNumber = useMemo(
    () => (e: any) => {
      console.log("rememberNumber");
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
          max={19}
          value={inputNumber}
          isLimitText
          onChange={rememberNumber}
        />
        <Button
          text="Расcчитать"
          isLoader={isLoader}
          disabled={isDisabled}
          linkedList={"small"}
          onClick={() => onClickButton(inputNumber)}
        />
      </div>
      <ul className={letters}>
        {arrNumbers.map((i, index) => (
          <li key={index}  className={numberClass}>
            <Circle extraClass={letter} letter={i} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
