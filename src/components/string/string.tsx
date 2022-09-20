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
  //console.log("arr22", j, i, arr);
  const arrTemp = [...arr];
  //console.log("arr[i].letter", i, arrTemp[i].letter, arrTemp);
  const temp = arrTemp[j].letter; arrTemp[j].letter = arrTemp[i].letter; arrTemp[i].letter=temp;
  //console.log("arr[i].letter", i, arrTemp[i].letter, arrTemp);
  //console.log("if", ((j-1) >= 0), ((i-1) < (arr.length - 2)));
  //if ((j-1) >= 0) {arr[j-1].state = ElementStates.Changing;}
  //if ((i-1) < (arr.length - 2)) {arr[i+1].state = ElementStates.Changing};
  return arrTemp;
  //console.log("arr22--", temp, arr);
}

  const rew = (j: number, i: number, arr: El[]) => {
    const n = (arr.length) / 2;
    console.log("rew", n, arr[j], arr[i]);
    arr[j].state = ElementStates.Changing;
    arr[i].state = ElementStates.Changing;
    if (j <= n)
      setTimeout(() => {
       console.log("if", ((j-1) >= 0), ((i-1) < (arr.length - 2)));
      //if ((j-1) >= 0) {arr[j-1].state = ElementStates.Changing;}
      //if ((i-1) < (arr.length - 2)) {arr[i+1].state = ElementStates.Changing};
      // arr[j].state = ElementStates.Changing;
      // arr[i].state = ElementStates.Changing;
       arr = rearrange( j, i, arr);   j++; i--;
       if ((j-1) >= 0) {arr[j-1].state = ElementStates.Changing;}
       //if ((i-1) < (arr.length - 2)) {arr[i+1].state = ElementStates.Changing};
       // console.log("arr22", arr);
        rew(j,  i, arr);
      }, DELAY_IN_MS);
    else return;
    if ((j-1) >= 0) {arr[j-1].state = ElementStates.Modified;}
    if ((i-1) < (arr.length - 2)) {arr[i+1].state = ElementStates.Modified};
    setArrLetters(arr);
  };
  const wrapString = useMemo(
    () => (string: string) => {
      setIsLoader(true);
      setInputString(string);
      console.log("inputString", string);
      const arrStart: El[] = [];
      const arrString: string[] = string.split("");
      for (let i = 0; i <= arrString.length - 1; i++) {
        arrStart[i] = { letter: arrString[i], state: ElementStates.Default };
      }
      arrStart[0].state = ElementStates.Changing;
      arrStart[arrStart.length - 1].state = ElementStates.Changing;
      setArrLetters(arrStart);
      setTimeout(() => {
        // arrStart[0].state = ElementStates.Changing;
        // arrStart[arrStart.length - 1].state = ElementStates.Changing;
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
        {arrLetters.map((i, index) => (
          <li key={index} className={i.letter}>
            <Circle state={i.state} letter={i.letter} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
// {arrLetters.map((i , index) => (
//  <li key={index} className={letter}>
//    {i}
//       <Circle letter={letter} />
//     </li>
//</SolutionLayout>    ))}
