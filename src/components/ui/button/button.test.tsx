
import React from "react";
import { Button } from "./button";
import { render, screen, fireEvent } from '@testing-library/react';
import renderer from "react-test-renderer";
import styles from "./main-page.module.css";

const onClick = () => {
  alert('buttonClick')
}

describe('+++Button+++', () => {
  
  it("!!!!!with text Button", () => {
  const buttonSnapshot = renderer
  .create(<Button text="textInButton"/>)
  .toJSON();
  expect(buttonSnapshot).toMatchSnapshot();
});
it("!!!!!without text Button", () => {
  const buttonSnapshot = renderer
  .create(<Button />)
  .toJSON();
  expect(buttonSnapshot).toMatchSnapshot();
});
it("!!!!!!disabled Button", () => {
  const buttonSnapshot = renderer
  .create(<Button disabled={true} />)
  .toJSON();
  expect(buttonSnapshot).toMatchSnapshot();
});
it("!!!!!!disabled Button", () => {
  const buttonSnapshot = renderer
  .create(<Button isLoader={true} />)
  .toJSON();
  expect(buttonSnapshot).toMatchSnapshot();
});
it('Нажатие на кнопку вызывает onClick, которая вызывает alert', () => {
  window.alert = jest.fn();
  render(<Button text="textInButton" onClick={onClick}/>);
  const buttonWithText = screen.getByText("textInButton");
  fireEvent.click(buttonWithText);
  expect(window.alert).toHaveBeenCalledWith('buttonClick');
}); 

})