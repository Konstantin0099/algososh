import React, { useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import style from "./string.module.css";
const { page, input, string, letters, letter } = style;
const a = ["qwert", "tyuio", "asdfg", "ghjjk", "cbbxmvmfnvj", "hhhhhhhhh"];

interface El {
  letter: string;
  state: ElementStates;
}

export const StringComponent: React.FC = () => {
  const [isLoader, setIsLoader] = useState(false);
  const [inputString, setInputString] = useState("");
  const [arrLetters, setArrLetters] = useState<El[]>([]);

  const rearrange = (j: number, i: number, arr: El[]) => {
    const arrTemp = [...arr];
    const temp = arrTemp[j].letter;
    arrTemp[j].letter = arrTemp[i].letter;
    arrTemp[i].letter = temp;
    return arrTemp;
  };

  const rew = (j: number, i: number, arr: El[]) => {
    const n = arr.length / 2;
    if (j <= i) {
      arr[j].state = ElementStates.Changing;
      arr[i].state = ElementStates.Changing;
    }
    if (j <= n)
      setTimeout(() => {
        arr = rearrange(j, i, arr);
        j++;
        i--;
        rew(j, i, arr);
      }, DELAY_IN_MS);
    else {
      if (j - 1 >= 0) {
        arr[j - 1].state = ElementStates.Modified;
      }
      setArrLetters(arr);
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
      setInputString(string);
      const arrStart: El[] = [];
      const arrString: string[] = string.split("");
      for (let i = 0; i <= arrString.length - 1; i++) {
        arrStart[i] = { letter: arrString[i], state: ElementStates.Default };
      }
      arrStart[0].state = ElementStates.Changing;
      arrStart[arrStart.length - 1].state = ElementStates.Changing;
      setArrLetters(arrStart);
      setTimeout(() => {
        rew(0, arrStart.length - 1, arrStart);
      }, 2000);
    },
    [setIsLoader, setArrLetters, setInputString]
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
          value={inputString}
          onChange={inputChange}
        />
        <Button
          text="развернуть"
          isLoader={isLoader}
          disabled={false}
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
