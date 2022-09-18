import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS } from "../../constants/delays";
import style from "./string.module.css"
console.log("string");
const { page, input, string, letters, letter } = style;

export const StringComponent: React.FC = () => {
  return (
    <SolutionLayout title="Строка_Строка">
     <div className={page}>
      dfdfdf
      <Input
      />
      <Button
      />
     </div>
     <ul className={letters}>

     </ul>
    </SolutionLayout>
  );
};
