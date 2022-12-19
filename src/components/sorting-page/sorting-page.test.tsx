import App from "../app/app";
import { render, screen, fireEvent } from "@testing-library/react";

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
});
