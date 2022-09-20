import React, { useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS } from "../../constants/delays";
import style from "./string.module.css";
const { page, input, string, letters, letter } = style;

export const StringComponent: React.FC = () => {
  const [isLoader, setIsLoader] = useState(false);
  const [inputString, setInputString] = useState("");
  const [arrLetters, setArrLetters] = useState<string[]>([]);

  const wrapString = useMemo(
    () => (string: string) => {
      setIsLoader(true);
      setInputString("");
      setArrLetters(string.split(""));
    },
    [setIsLoader, setArrLetters]
  );
  const inputChange = useMemo(
    () => (e: any) => {setInputString(e.target.value)},
    [setInputString]
  );
  return (
    <SolutionLayout title="Строка">
      <div className={page}>
        <Input
          type={"text"}
          maxLength={11}
          value={inputString}
          onChange={inputChange}
        />
        <Button
          text="развернуть"
          isLoader={isLoader}
          disabled={false}
          linkedList={"big"}
          onClick={() => wrapString(inputString)}
        />
      </div>
      <ul className={letters}>
        {arrLetters.map((letter, index) => (
          <li key={index} className={letter}>
            <Circle letter={letter} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
