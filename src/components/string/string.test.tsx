import App from "../app/app";
import {
  render,
  fireEvent,
  waitFor,
  RenderResult,
} from "@testing-library/react";

jest.setTimeout(25000);
const checTurn = (circList: HTMLCollectionOf<Element>, arrString: string[]) => {
  for (let i = 0; i <= circList.length - 1; i++) {
    expect(circList[i].innerHTML).toBe(arrString[i]);
  }
};
const asyncWaitFor = async (cont: RenderResult, elementButton: HTMLElement) =>
  waitFor(() => expect(cont.getByText("Развернуть")).toBeInTheDocument(), {
    container: elementButton,
    timeout: 6000,
    interval: 500,
  });
const initializingNewData = (
  cont: RenderResult,
  elementInput: HTMLElement,
  string: string
) => {
  fireEvent.change(elementInput, { target: { value: string } });
  const elementButton = cont.getByText("Развернуть");
  fireEvent.click(elementButton);
  const queryButton: HTMLElement | null = cont.queryByText("Развернуть");
  const btn = { queryButton: queryButton, elementButton: elementButton };
  return btn;
};

describe("<<<<<StringComponent>>>>>>", () => {
  const setUp = () => {
    const cont = render(<App />);
    const linkElementString = cont.getAllByRole("link");
    fireEvent.click(linkElementString[0]);
    expect(cont.queryByPlaceholderText("Развернуть")).toBe(null);
    const elementInput = cont.getByPlaceholderText("Введите текст");
    const elementButton = cont.getByText("Развернуть");
    return {
      cont,
      elementInput,
      elementButton,
    };
  };

  it("++TEST++ line reversal 4 item", async () => {
    let { cont, elementInput } = setUp();
    let btn = initializingNewData(cont, elementInput, "XZQW");

    expect(btn.queryButton).toBe(null);
    await asyncWaitFor(cont, btn.elementButton);
    let circList = document.getElementsByClassName("text_type_circle");
    let arrString = ["W", "Q", "Z", "X"];
    checTurn(circList, arrString);

    btn = initializingNewData(cont, elementInput, "RTY");
    expect(btn.queryButton).toBe(null);
    await asyncWaitFor(cont, btn.elementButton);
    checTurn(document.getElementsByClassName("text_type_circle"), [
      "Y",
      "T",
      "R",
    ]);

    btn = initializingNewData(cont, elementInput, "RT");
    expect(btn.queryButton).toBe(null);
    await asyncWaitFor(cont, btn.elementButton);
    checTurn(document.getElementsByClassName("text_type_circle"), ["T", "R"]);

    btn = initializingNewData(cont, elementInput, "T");
    expect(btn.queryButton).toBe(null);
    await asyncWaitFor(cont, btn.elementButton);
    checTurn(document.getElementsByClassName("text_type_circle"), ["T"]);

    btn = initializingNewData(cont, elementInput, "");
    expect(btn.queryButton).not.toBe(null);
    fireEvent.click(btn.elementButton);
    expect(btn.elementButton).toBeInTheDocument();
  });
});
