import React, { ChangeEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates, SearchIndex } from "../../types";
import style from "./list-page.module.css";
import { LinkedListNode, LinkedList } from "./list";
import { returnArray, rndArr } from "./utils";

export const ListPage: React.FC = () => {
  const { input, buttonsBox, node, button, nodeBox, buttonInd } = style;
  const [inputValue, setInputValue] = useState("");
  const [inputIndex, setInputIndex] = useState("");

  const [searchIndexAdd, setSearchIndexAdd] = useState<SearchIndex>({});
  const [searchIndexDel, setSearchIndexDel] = useState<SearchIndex>({});

  const [linkedList, setLinkedList] = useState(new LinkedList<string>());
  const [renderArray, setRenderArray] = useState<LinkedListNode<string>[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [buttonState, setBattonState] = useState({
    add: {
      isDisabled: true,
    },
    del: {
      isDisabled: false,
    },
    addByIndex: {
      isDisabled: true,
    },
    delByIndex: {
      isDisabled: true,
    },
    isLoader: {
      addByIndex: false,
      delByIndex: false,
      addToTop: false,
      addToTail: false,
      delFromTop: false,
      delFromTail: false,
    },
  });

  useEffect(() => {
    let node = new LinkedList([...rndArr(4)]);

    setLinkedList(node);
    node.head && setRenderArray(returnArray(node.head));
  }, [setRenderArray, setLinkedList]);

  const inputChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    !e.target.value &&
      setBattonState({
        ...buttonState,
        add: { isDisabled: true },
        addByIndex: { isDisabled: true },
      });
      console.log("inputChangeValue", buttonState)
    e.target.value &&
      setBattonState({
        ...buttonState,
        add: { isDisabled: false },
        addByIndex: { isDisabled: !(e.target.value && inputIndex) },
      });
  };
  const inputChangeIndex = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      renderArray.length - 1 < Number(e.target.value) ||
      !Number.isInteger(Number(e.target.value))
    ) {
      setInputIndex("нет ТАКОГО ИНДЕКСА!!!");
      setTimeout(() => {
        setInputIndex("");
      }, DELAY_IN_MS);
      return;
    }
    setInputIndex(e.target.value);
    !e.target.value &&
      setBattonState({
        ...buttonState,
        addByIndex: { isDisabled: true },
        delByIndex: { isDisabled: true },
      });
    e.target.value &&
      setBattonState({
        ...buttonState,
        addByIndex: { isDisabled: !(e.target.value && inputValue) },
        delByIndex: { isDisabled: false },
      });
  };

  const addToTop = (value: string) => {
    setIsDisabled(true);
    setBattonState({
      ...buttonState,
      isLoader: {
        ...buttonState.isLoader,
        addToTop: true,
      },
    });
    setInputValue("");
    setSearchIndexAdd({ index: 0, value: value });
    setTimeout(() => {
      if (linkedList) {
        linkedList.addToTop(value, ElementStates.Modified);
        linkedList.head && setRenderArray(returnArray(linkedList.head));
      }
      setSearchIndexAdd({});
      setTimeout(() => {
        linkedList.head && setRenderArray(returnArray(linkedList.head));
        setBattonState({
          ...buttonState,
          del: renderArray[0]?.value === "" ? { isDisabled: true } : { isDisabled: false },
          add: { isDisabled: true },
          addByIndex: { isDisabled: true },
          delByIndex: inputIndex ? {isDisabled: false}  : { isDisabled: true },
        });
        setIsDisabled(false);
      }, DELAY_IN_MS);
    }, DELAY_IN_MS);
  };

  const addToTail = (value: string) => {
    setIsDisabled(true);
    console.log("addToTail", buttonState)
    setBattonState({
      ...buttonState,
      isLoader: {
        ...buttonState.isLoader,
        addToTail: true,
      },
    });
    setInputValue("");
    setSearchIndexAdd({ index: renderArray.length - 1, value: value });
    setTimeout(() => {
      if (linkedList) {
        linkedList.addToTail(value, ElementStates.Modified);
        linkedList.head && setRenderArray(returnArray(linkedList.head));
      }
      setSearchIndexAdd({});
      setTimeout(() => {
        linkedList.head && setRenderArray(returnArray(linkedList.head));
        console.log("addToTail", buttonState)
        setBattonState({
          ...buttonState,
          del: { isDisabled: false },
          add: { isDisabled: true },
          addByIndex: { isDisabled: true },
          delByIndex: inputIndex ? {isDisabled: false}  : { isDisabled: true }
        });
        setIsDisabled(false);
      }, DELAY_IN_MS);
    }, DELAY_IN_MS);
  };

  const delFromTop = () => {
    setIsDisabled(true);
    console.log("delFromTop", buttonState)
    setBattonState({
      ...buttonState,
      isLoader: {
        ...buttonState.isLoader,
        delFromTop: true,
      },
    });
    setSearchIndexDel({ index: 0, value: renderArray[0].value });
    renderArray[0].value = "";
    setTimeout(() => {
      if (linkedList) {
        linkedList && linkedList.delFromTop();
        linkedList.head && setRenderArray(returnArray(linkedList.head));
      }
      setSearchIndexDel({});
      setTimeout(() => {
        linkedList.head && setRenderArray(returnArray(linkedList.head));
      }, DELAY_IN_MS);
      console.log("delFromTop", buttonState)
      setBattonState({
        ...buttonState,
        del:  (linkedList.head?.value === "") ? { isDisabled: true } : { isDisabled: false },
        add: inputValue ? {isDisabled: false}  : { isDisabled: true },
        addByIndex: (inputIndex && inputValue) ? {isDisabled: false}  : { isDisabled: true },
        delByIndex: inputIndex ? {isDisabled: false}  : { isDisabled: true }
      });
      setIsDisabled(false);
      console.log("delFromTop", buttonState)
      renderArray.length <= 1 &&
        setBattonState({ ...buttonState, del: { isDisabled: true } });
    }, DELAY_IN_MS);
  };

  const delFromTail = () => {
    setIsDisabled(true);
    console.log("delFromTail", buttonState)
    setBattonState({
      ...buttonState,
      isLoader: {
        ...buttonState.isLoader,
        delFromTail: true,
      },
    });
    let index = renderArray.length - 1;
    setSearchIndexDel({ index: index, value: renderArray[index].value });
    renderArray[index].value = "";
    setTimeout(() => {
      if (linkedList) {
        linkedList.delFromTail();
        linkedList.head && setRenderArray(returnArray(linkedList.head));
      }
      setSearchIndexDel({});
      setTimeout(() => {
        linkedList.head && setRenderArray(returnArray(linkedList.head));
      }, DELAY_IN_MS);
      console.log("delFromTail", buttonState)
      setBattonState({
        ...buttonState,
        del:  (linkedList.head?.value === "") ? { isDisabled: true } : { isDisabled: false },
        add: inputValue ? {isDisabled: false}  : { isDisabled: true },
        addByIndex: (inputIndex && inputValue) ? {isDisabled: false}  : { isDisabled: true },
        delByIndex: inputIndex ? {isDisabled: false}  : { isDisabled: true }
      });
      setIsDisabled(false);
      console.log("delFromTail", buttonState)
      renderArray.length <= 1 &&
        setBattonState({ ...buttonState, del: { isDisabled: true } });
    }, DELAY_IN_MS);
  };

  const renderSearchIndex = (
    i: number,
    index: number,
    searchIndex: SearchIndex,
    set: React.Dispatch<React.SetStateAction<SearchIndex>>,
    value?: string
  ) => {
    value && (searchIndex.index = i);
    i >= 0 && i <= index && (renderArray[i].state = ElementStates.Modified);
    setRenderArray([...renderArray]);
    if (i <= index)
      setTimeout(() => {
        (i < index) && renderSearchIndex(i+1, index, searchIndex, set, value);
        if (i === index) {
          let arrRender: {
            value: string,
            state: ElementStates
          }[];
          arrRender = returnArray(linkedList.head);
          setTimeout(() => {
            if (!value) {
              renderArray[i].state = ElementStates.Modified;
              searchIndex.value = renderArray[i].value;
              renderArray[i].value = "";
              searchIndex.index = i;
              setRenderArray([...renderArray]);
              console.log("renderSearchIndex 1", {...buttonState})
              setBattonState({
                del:  (linkedList.head?.value === "") ? { isDisabled: true } : { isDisabled: false },
                add: inputValue ? {isDisabled: false}  : { isDisabled: true },
                addByIndex: { isDisabled: true },
                delByIndex: { isDisabled: true },
                isLoader: { ...buttonState.isLoader, delByIndex: false },
              });
            } else {
              set({});
              arrRender[i].state = ElementStates.Modified;
              setRenderArray([...arrRender]);
              console.log("renderSearchIndex 2", buttonState)
              setBattonState({
                ...buttonState,
                del:  (linkedList.head?.value === "") ? { isDisabled: true } : { isDisabled: false },
                add: inputValue ? {isDisabled: false}  : { isDisabled: true },
                addByIndex: { isDisabled: true },
                delByIndex: { isDisabled: true },
                isLoader: { ...buttonState.isLoader, addByIndex: false },
              });
            }
            setIsDisabled(false);
          }, DELAY_IN_MS/5);
          setTimeout(() => {
            arrRender[i].state = ElementStates.Default;
            setRenderArray([...arrRender]);
            
            set({});
          }, DELAY_IN_MS*1.25);
        }
      }, DELAY_IN_MS);
  };

  const addByIndex = (value: string, index: number) => {
    setIsDisabled(true);

    setBattonState({
      ...buttonState,
      isLoader: { ...buttonState.isLoader, addByIndex: true },
    });
    setInputIndex("");
    setInputValue("");
    linkedList && linkedList.addByIndex(value, index);

    searchIndexAdd.value = value;
    renderSearchIndex(0, index, searchIndexAdd, setSearchIndexAdd, value);
  };

  const delByIndex = (index: number) => {
    setIsDisabled(true);
    setInputIndex("");
    setBattonState({
      ...buttonState,
      isLoader: { ...buttonState.isLoader, delByIndex: true },
    });
    linkedList && linkedList.delByIndex(index);
    renderSearchIndex(0, index, searchIndexDel, setSearchIndexDel);
  };

  return (
    <SolutionLayout title={"Связный список"}>
      <div className={buttonsBox}>
        <Input
          extraClass={input}
          type={"text"}
          maxLength={4}
          value={inputValue}
          isLimitText
          onChange={inputChangeValue}
        />
        <Button
          text="Добавить в head"
          isLoader={buttonState.isLoader.addToTop}
          disabled={buttonState.add.isDisabled || isDisabled}
          onClick={() => addToTop(inputValue)}
          extraClass={button}
        />
        <Button
          text="Добавить в tail"
          isLoader={buttonState.isLoader.addToTail}
          disabled={buttonState.add.isDisabled || isDisabled}
          onClick={() => addToTail(inputValue)}
          extraClass={button}
        />
        <Button
          text="Удалить из head"
          isLoader={buttonState.isLoader.delFromTop}
          disabled={buttonState.del.isDisabled || isDisabled}
          onClick={() => delFromTop()}
          extraClass={button}
        />
        <Button
          text="Удалить из tail"
          isLoader={buttonState.isLoader.delFromTail}
          disabled={buttonState.del.isDisabled || isDisabled}
          onClick={() => delFromTail()}
          extraClass={button}
        />
      </div>
      <div className={buttonsBox}>
        <Input
          placeholder={"Введите индекс"}
          extraClass={input}
          type={"text"}
          maxLength={2}
          value={inputIndex}
          isLimitText
          onChange={inputChangeIndex}
        />
        <Button
          text="Добавить по индексу"
          isLoader={buttonState.isLoader.addByIndex}
          disabled={buttonState.addByIndex.isDisabled || isDisabled}
          onClick={() => addByIndex(inputValue, Number(inputIndex))}
          extraClass={buttonInd}
        />
        <Button
          text="Удалить по индексу"
          isLoader={buttonState.isLoader.delByIndex}
          disabled={buttonState.delByIndex.isDisabled || isDisabled}
          onClick={() => delByIndex(Number(inputIndex))}
          extraClass={buttonInd}
        />
      </div>
      <ul className={nodeBox}>
        {renderArray &&
          renderArray.map((i, index, arr) => (
            <li key={index} className={i.state}>
              <Circle
                extraClass={node}
                state={i.state}
                letter={i.value}
                index={index}
                head={
                  searchIndexAdd.index === index ? (
                    <Circle
                      isSmall
                      state={ElementStates.Changing}
                      letter={searchIndexAdd.value}
                    />
                  ) : index === 0 ? (
                    "head"
                  ) : (
                    ""
                  )
                }
                tail={
                  searchIndexDel.index === index ? (
                    <Circle
                      isSmall
                      state={ElementStates.Changing}
                      letter={searchIndexDel.value}
                    />
                  ) : index === arr.length - 1 ? (
                    "tail"
                  ) : (
                    ""
                  )
                }
              />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
