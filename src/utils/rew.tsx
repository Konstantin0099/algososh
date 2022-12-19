import React, { useMemo, useState } from "react";
// import { SolutionLayout } from "../ui/solution-layout/solution-layout";
// import { Input } from "../ui/input/input";
// import { Button } from "../ui/button/button";
// import { Circle } from "../ui/circle/circle";
// import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates, ElementArray } from "../types";
// import style from "./string.module.css";
// const { page, input, letters, letter } = style; 

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
    if ((j <= n) && (j <= i))
    {
      setTimeout(() => {
        arr = rearrange(j, i, arr);
        arr[j].state = ElementStates.Modified;
        arr[i].state = ElementStates.Modified;
        j++;
        i--;
        rew(j, i, arr);
      }, 300);
      // }, DELAY_IN_MS);
  }
    else {
      if (j - 1 >= 0) {
      }
      // setArrLetters(arr);
      // setIsLoader(false);
      // setInputString({preloaderText: "", text: inputString.text});
      return;
    }
    if (j - 1 >= 0) {
      arr[j - 1].state = ElementStates.Modified;
    }
    if (i - 1 < arr.length - 2) {
      arr[i + 1].state = ElementStates.Modified;
    }
    // setArrLetters(arr);
  };