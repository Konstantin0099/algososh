import React, { useState, useMemo} from "react";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { DELAY_IN_MS } from "../../constants/delays";
import { ARR_CONSTANTS } from "../../constants/arr";
import style from "./sorting-page.module.css";

const {page, buttonsBox, box} = style;


export const SortingPage: React.FC = () => {
  return (
    <SolutionLayout title="Сортировка массива">
<div className={page}>
<div className={buttonsBox}>
  <div className={box}>
    <RadioInput
     label="Выбор"
    />
        <RadioInput
label="Пузырек"
/>
  </div>
  <div className={box}>
    <Button 
    text="По возрастанию"
    />
     <Button 
     text="По убыванию"
    />
  </div>
  <Button 
     text="Новый массив"
    />
</div>

</div>
    </SolutionLayout>
  );
};
