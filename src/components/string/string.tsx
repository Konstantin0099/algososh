import React, { useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates, ElementArray } from "../../types";
import style from "./string.module.css";
const { page, input, letters, letter } = style;

export const StringComponent: React.FC = () => {
  const [isLoader, setIsLoader] = useState(false);
  const [inputString, setInputString] = useState("");
  const [arrLetters, setArrLetters] = useState<ElementArray[]>([]);

  const rearrange = (j: number, i: number, arr: ElementArray[]) => {
    const arrTemp = [...arr];
    const temp = arrTemp[j].letter;
    arrTemp[j].letter = arrTemp[i].letter;
    arrTemp[i].letter = temp;
    return arrTemp;
  };

  const rew = (j: number, i: number, arr: ElementArray[]) => {
    const n = Math.floor(arr.length / 2);
    if (j <= i) {
      arr[j].state = ElementStates.Changing;
      arr[i].state = ElementStates.Changing;
    }
    if (j <= n && j <= i) {
      setTimeout(() => {
        arr = rearrange(j, i, arr);
        arr[j].state = ElementStates.Modified;
        arr[i].state = ElementStates.Modified;
        j++;
        i--;
        rew(j, i, arr);
      }, DELAY_IN_MS);
    } else {
      if (j - 1 >= 0) {
      }
      setArrLetters(arr);
      setIsLoader(false);
      return;
    }
    if (j - 1 >= 0) {
      arr[j - 1].state = ElementStates.Modified;
    }
    if (i - 1 < arr.length - 2) {
      arr[i + 1].state = ElementStates.Modified;
    }
    setArrLetters(arr);
  };
  const wrapString = useMemo(
    () => (string: string) => {
      setIsLoader(true);
      const arrStart: ElementArray[] = [];
      const arrString: string[] = string.split("");
      for (let i = 0; i <= arrString.length - 1; i++) {
        arrStart[i] = { letter: arrString[i], state: ElementStates.Default };
      }
      setArrLetters(arrStart);
      setTimeout(() => {
        arrStart[0].state = ElementStates.Changing;
        arrStart[arrStart.length - 1].state = ElementStates.Changing;
        setArrLetters([...arrStart]);
      }, DELAY_IN_MS);
      setTimeout(() => {
        rew(0, arrStart.length - 1, arrStart);
      }, DELAY_IN_MS * 2);
    },
    [setIsLoader, setArrLetters]
  );

  const inputChange = useMemo(
    () => (e: any) => {
      setInputString(e.target.value);
    },
    [setInputString]
  );
  return (
    <SolutionLayout title="Строка">
      <div className={page}>
        <Input
          extraClass={input}
          type={"text"}
          maxLength={11}
          value={isLoader ? "ожидайте завершения разворота" : inputString}
          isLimitText
          onChange={inputChange}
        />
        <Button
          text="Развернуть"
          isLoader={isLoader}
          disabled={inputString ? false : true}
          linkedList={"small"}
          onClick={() => wrapString(inputString)}
        />
      </div>
      <ul className={letters}>
        {arrLetters.map((i, index) => (
          <li key={index} className={i.letter}>
            <Circle extraClass={letter} state={i.state} letter={i.letter} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
