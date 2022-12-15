
import App from "../app/app";
// import {StringComponent} from "./string";
import { render, screen, fireEvent, waitFor, findByText } from '@testing-library/react';
import renderer from "react-test-renderer";
import { Link } from "react-router-dom";
import styles from "./main-page.module.css";

describe('<<<<<StringComponent>>>>>>', () => {
    render(<App />);
    const linkElementString = screen.getAllByRole('link');
    fireEvent.click(linkElementString[0]);
    const elementInput = screen.getByPlaceholderText('Введите текст');
    const elementButton = screen.getByText('Развернуть');
    it("++TEST++ line reversal 4 item", () => {
        fireEvent.change(elementInput, {target: {value: 'XZQW'}})
        fireEvent.click(elementButton);
        const circList = document.getElementsByClassName("text_type_circle")
        const arrString = ["W","Q","Z","X"];
        for (let i = 0; i <= circList.length-1; i++ )  {
            expect(circList[i].innerHTML).toBe(arrString[i])
        }
    });
    it("++TEST++ line reversal 2 item", () => {
        fireEvent.change(elementInput, {target: {value: 'XZ'}})
        fireEvent.click(elementButton);
        const circList = document.getElementsByClassName("text_type_circle")
        const arrString = ["Z","X"];
        for (let i = 0; i <= circList.length-1; i++ )  {
            expect(circList[i].innerHTML).toBe(arrString[i])
        }
    });
    it("++TEST++ line reversal 3 item", async () => {
        fireEvent.change(elementInput, {target: {value: 'XZE'}})
        fireEvent.click(elementButton);
        const circList = document.getElementsByClassName("text_type_circle")
        const arrString = ["E","Z","X"];
        for (let i = 0; i <= circList.length-1; i++ )  {
            expect(circList[i].innerHTML).toBe(arrString[i])
        }
    });
    it("++TEST++ line reversal 1 item", async () => {
        fireEvent.change(elementInput, {target: {value: 'X'}})
        fireEvent.click(elementButton);
        const circList = document.getElementsByClassName("text_type_circle")
        const arrString = ["X"];
        for (let i = 0; i <= circList.length-1; i++ )  {
            expect(circList[i].innerHTML).toBe(arrString[i])
        }
    });
    it("++TEST++ line reversal 0 item", async () => {
        fireEvent.change(elementInput, {target: {value: ''}})
        fireEvent.click(elementButton);
        const circList = document.getElementsByClassName("text_type_circle");
        expect(circList[0]).toBeUndefined;
    });
})
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
