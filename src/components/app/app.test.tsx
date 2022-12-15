import App from "./app";
import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import styles from "./main-page.module.css";


describe('<<<<<App>>>>>', () => {
  
  it("!!!!!!renders App", () => {
  render(<App />);
  const linkElement1 = screen.getByText("им. Фибоначчи");
  const tree = renderer
  .create( <div className={`${styles.card} ${styles.string}`} />)
  .toJSON();
  expect(tree).toMatchSnapshot();
  expect(linkElement1).toBeInTheDocument();
});


})
