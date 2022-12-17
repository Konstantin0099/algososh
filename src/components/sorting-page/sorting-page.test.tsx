import App from "../app/app";
// import {StringComponent} from "./string";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  findByText,
} from "@testing-library/react";
import renderer from "react-test-renderer";
import { Link } from "react-router-dom";
import styles from "./main-page.module.css";

const fun = (arr: HTMLCollectionOf<Element>, toggle: boolean) => {
  for (let i = 0; i <= arr.length - 2; i++) {
    toggle
      ? expect(Number(arr[i].innerHTML) >= Number(arr[i + 1].innerHTML)).toBe(
          true
        )
      : expect(Number(arr[i].innerHTML) <= Number(arr[i + 1].innerHTML)).toBe(
          true
        );
  }
};

describe("<<<<<StringComponent>>>>>>", () => {
  render(<App />);
  const linkElement = screen.getAllByRole("link");
  fireEvent.click(linkElement[2]);
  const buttonSelection = screen.getByText("Выбор");
  const buttonBubble = screen.getByText("Пузырек");
  const buttonNewArr = screen.getByText("Новый массив");
  const buttonDescending = screen.getByText(/убыванию/);
  const buttonIncreasing = screen.getByText(/возрастанию/);

  it("++TEST++ sorting", () => {
    fireEvent.click(buttonSelection);
    fireEvent.click(buttonDescending);
    let array = document.getElementsByClassName("text_type_column");
    fun(array, true);
    fireEvent.click(buttonNewArr);
    array = document.getElementsByClassName("text_type_column");
    fireEvent.click(buttonIncreasing);
    fun(array, false);
    fireEvent.click(buttonNewArr);
    fireEvent.click(buttonBubble);
    array = document.getElementsByClassName("text_type_column");
    fireEvent.click(buttonDescending);
    fun(array, true);
    fireEvent.click(buttonNewArr);
    array = document.getElementsByClassName("text_type_column");
    fireEvent.click(buttonIncreasing);
    fun(array, false);
  });

  // const elementInput = screen.getByPlaceholderText('Введите текст');

  // it("++TEST++ line reversal 0 item", async () => {
  //     fireEvent.change(elementInput, {target: {value: ''}})
  //     fireEvent.click(elementButton);
  //     const circList = document.getElementsByClassName("text_type_circle");
  //     expect(circList[0]).toBeUndefined;
  // for (let i = 0; i <= array.length-2; i++ )  {
  //     console.log(array[i].innerHTML, array[i+1].innerHTML, (Number(array[i].innerHTML) >= Number(array[i+1].innerHTML)), "<<<");
  //     expect(Number(array[i].innerHTML) >= Number(array[i+1].innerHTML)).toBe(true);
  // }
  // });
});
// render(<App />);
// const linkElementString = screen.getAllByRole('link');
// fireEvent.click(linkElementString[0]);
// const elementInput = screen.getByPlaceholderText('Введите текст');
// const elementButton = screen.getByText('Развернуть');
// console.log(circList[0]);
// const arrString = [];
// for (let i = 0; i <= circList.length-1; i++ )  {
//     expect(circList[i].innerHTML).toBe(arrString[i])
// }
// expect(linkElementString[0]).toBeInTheDocument();
// expect(elementInput).toBeInTheDocument();
// let circleElements = screen.getAllByRole('listitem');
// expect(circleElements.length).toBe(4);
// jest.useFakeTimers();
// jest.spyOn(global, 'setTimeout');
// // jest.setTimeout(5000);
// jest.useRealTimers
