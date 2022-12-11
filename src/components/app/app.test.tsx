
import React from "react";
import App from "./app";
import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import { Link } from "react-router-dom";
import styles from "./main-page.module.css";


describe('todos reducer', () => {
  
  it("!!!!!!!!!!!!!!!renders Link", () => {
  render(<App />);
  const linkElement1 = screen.getByText("им. Фибоначчи");
  const tree = renderer
  .create( <div className={`${styles.card} ${styles.string}`} />)
  .toJSON();
  expect(tree).toMatchSnapshot();
  expect(linkElement1).toBeInTheDocument();
});


})
