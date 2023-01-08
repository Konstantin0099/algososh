import App from "../app/app";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

jest.setTimeout(155000);
const checkSorting = (arr: HTMLCollectionOf<Element>, toggle: boolean) => {
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
  const getButtonIncreasing = () => screen.getByText(/возрастанию/);
  const getButtonDescending = () => screen.getByText(/убыванию/);
  const getArray = () => document.getElementsByClassName("text_type_column");
  const getNewArr = () => {
    fireEvent.click(buttonNewArr);
    let array = getArray();
    if (array.length < 5) {
      return array;
    } else {
      array = getNewArr();
    }
    return array;
  };
  const waitForSortingToComplete = async (
    btnText: string,
    container: HTMLElement
  ) => {
    await waitFor(() => expect(screen.getByText(btnText)).toBeInTheDocument(), {
      container: container,
      timeout: 155000,
      interval: 500,
    });
  };

  it("++TEST++ sorting", async () => {
    let array = getNewArr();
    fireEvent.click(buttonSelection);
    let buttonDescending = getButtonDescending();
    fireEvent.click(buttonDescending);
    await waitForSortingToComplete("По убыванию", buttonDescending);
    checkSorting(array, true);

    array = getNewArr();
    let buttonIncreasing = getButtonIncreasing();
    fireEvent.click(buttonIncreasing);
    await waitForSortingToComplete("По возрастанию", buttonIncreasing);
    checkSorting(array, false);

    array = getNewArr();
    fireEvent.click(buttonBubble);
    buttonIncreasing = getButtonIncreasing();
    fireEvent.click(buttonIncreasing);
    await waitForSortingToComplete("По возрастанию", buttonIncreasing);
    checkSorting(array, false);

    array = getNewArr();
    buttonDescending = getButtonDescending();
    fireEvent.click(buttonDescending);
    await waitForSortingToComplete("По убыванию", buttonDescending);
    checkSorting(array, true);
  });
});
