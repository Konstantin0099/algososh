import React, { useState, useMemo, useEffect } from "react";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";

import { DELAY_IN_MS } from "../../constants/delays";
import { ARR_CONSTANTS } from "../../constants/arr";
import {
  ElementStates,
  ElementNumberArray,
  Direction,
  SortingMethod,
} from "../../types";
import style from "./sorting-page.module.css";
import { random } from "nanoid";

interface ButtonState {
  [index: string]: {
    isDisabled: boolean;
    isLoading?: boolean;
  };
}

const { page, buttonsBox, box, radio, button, visualizedArray, elementArr } =
  style;

export const SortingPage: React.FC = () => {
  const [isLoader, setIsLoader] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [arrNumbers, setArrNumbers] = useState<ElementNumberArray[]>([]);
  const [buttonState, setBattonState] = useState<ButtonState>({});
  const [sortingMetod, setSortingMethod] = useState<SortingMethod>(
    SortingMethod.Selection
  );

  const randomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const selection = (
    arr: ElementNumberArray[],
    direction: boolean,
    j: number,
    min: { number: number; index: number; indexStart: number }
  ) => {
    j <= arr.length - 1 && (arr[j].state = ElementStates.Changing);
    min.indexStart + 1 < j && (arr[j - 1].state = ElementStates.Default);
    setArrNumbers([...arr]);
  
    if (j <= arr.length - 1 && direction === arr[j].number < min.number) {
      min.number = arr[j].number;
      min.index = j;
    }

    if (j <= arr.length - 1) {
      setTimeout(() => {
        j++;
        selection(arr, direction, j, min);
      }, DELAY_IN_MS);
    } else {
      let idx = min.indexStart;
      if (direction === arr[idx].number > min.number) {
        arr[min.index].number = arr[idx].number;
        arr[idx].number = min.number;
        arr[idx].state = ElementStates.Modified;
        if (idx >= arr.length-1) {setArrNumbers([...arr]);return;}
        min = {
          number: arr[idx + 1].number,
          index: idx + 1,
          indexStart: idx + 1,
        };
        min.index = idx + 1;
        
        selection(arr, direction, idx + 1, min);
      } else {
        arr[idx].state = ElementStates.Modified;
        if (idx >= arr.length-1) {setArrNumbers([...arr]);return;}
        min = {
          number: arr[idx + 1].number,
          index: idx + 1,
          indexStart: idx + 1,
        };
        selection(arr, direction, idx + 1, min);
      }
    }
  };

  const sortSelection = (
    direction: boolean,
    arr: ElementNumberArray[],
    i: number,
    j: number
  ) => {
    if (j > arr.length - 1) return;
    arr[i].state = ElementStates.Changing;
    arr[j].state = ElementStates.Changing;
    let min = { number: arr[i].number, index: i, indexStart: i };
    selection(arr, direction, j, min);
  };

  const sortArray = (direction: Direction) => {
    sortSelection(direction === "ascending" ? true : false, arrNumbers, 0, 1);
  };

  const generateArray = useMemo(
    () => () => {
      const lengthArr = randomNumber(
        ARR_CONSTANTS.minSize,
        ARR_CONSTANTS.maxSize
      );
      const arr = [];
      for (let i = 0; i <= lengthArr - 1; i++) {
        arr[i] = {
          number: randomNumber(ARR_CONSTANTS.minValue, ARR_CONSTANTS.maxValue),
          state: ElementStates.Default,
        };
      }
      setArrNumbers(arr);
    },
    [setArrNumbers]
  );

  useEffect(() => {
    generateArray();
  }, []);
  return (
    <SolutionLayout title="Сортировка массива">
      <div className={page}>
        <div className={buttonsBox}>
          <div className={box}>
            <RadioInput
              extraClass={radio}
              label="Выбор"
              checked={sortingMetod === SortingMethod.Selection}
              onChange={() => setSortingMethod(SortingMethod.Selection)}
            />
            <RadioInput
              extraClass={radio}
              label="Пузырек"
              checked={sortingMetod === SortingMethod.Bubble}
              onChange={() => setSortingMethod(SortingMethod.Bubble)}
            />
          </div>
          <div className={box}>
            <Button
              extraClass={button}
              text="По возрастанию"
              sorting={Direction.Ascending}
              disabled={isDisabled}
              isLoader={isLoader}
              onClick={() => sortArray(Direction.Ascending)}
            />
            <Button
              extraClass={button}
              text="По убыванию"
              sorting={Direction.Descending}
              disabled={isDisabled}
              isLoader={isLoader}
              onClick={() => sortArray(Direction.Descending)}
            />
          </div>
          <Button
            extraClass={button}
            text="Новый массив"
            disabled={isDisabled}
            onClick={generateArray}
          />
        </div>
        <ul className={visualizedArray}>
          {arrNumbers.map((el, index) => (
            <li key={index} className={elementArr}>
              {el.number && <Column index={el.number} state={el.state} />}
            </li>
          ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
