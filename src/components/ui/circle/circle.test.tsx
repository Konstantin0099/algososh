import { Circle } from "./circle";
import renderer from "react-test-renderer";
import { ElementStates } from "../../../types";

describe("+++Circle+++", () => {
  it("Circle!!!!!with letter", () => {
    const circleSnapshot = renderer.create(<Circle letter="letter" />).toJSON();
    expect(circleSnapshot).toMatchSnapshot();
  });
  it("Circle!!!!!without letter", () => {
    const circleSnapshot = renderer.create(<Circle />).toJSON();
    expect(circleSnapshot).toMatchSnapshot();
  });
  it("Circle!!!!!with head=ReactElement", () => {
    const circleSnapshot = renderer
      .create(<Circle head={<Circle />} />)
      .toJSON();
    expect(circleSnapshot).toMatchSnapshot();
  });
  it("Circle!!!!!with head=string", () => {
    const circleSnapshot = renderer.create(<Circle head={"head"} />).toJSON();
    expect(circleSnapshot).toMatchSnapshot();
  });
  it("Circle!!!!!without head", () => {
    const circleSnapshot = renderer.create(<Circle head={null} />).toJSON();
    expect(circleSnapshot).toMatchSnapshot();
  });
  it("Circle!!!!!with tail=ReactElement", () => {
    const circleSnapshot = renderer
      .create(<Circle tail={<Circle />} />)
      .toJSON();
    expect(circleSnapshot).toMatchSnapshot();
  });
  it("Circle!!!!!with tail=string", () => {
    const circleSnapshot = renderer.create(<Circle tail={"tail"} />).toJSON();
    expect(circleSnapshot).toMatchSnapshot();
  });
  it("Circle!!!!!without tail", () => {
    const circleSnapshot = renderer.create(<Circle tail={null} />).toJSON();
    expect(circleSnapshot).toMatchSnapshot();
  });
  it("Circle!!!!!with index", () => {
    const circleSnapshot = renderer.create(<Circle index={10} />).toJSON();
    expect(circleSnapshot).toMatchSnapshot();
  });
  it("Circle!!!!!with isSmall===true", () => {
    const circleSnapshot = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(circleSnapshot).toMatchSnapshot();
  });
  it("Circle!!!!!with state===default", () => {
    const circleSnapshot = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON();
    expect(circleSnapshot).toMatchSnapshot();
  });
  it("Circle!!!!!with state===changing", () => {
    const circleSnapshot = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();
    expect(circleSnapshot).toMatchSnapshot();
  });
  it("Circle!!!!!with state===modified", () => {
    const circleSnapshot = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();
    expect(circleSnapshot).toMatchSnapshot();
  });
});
