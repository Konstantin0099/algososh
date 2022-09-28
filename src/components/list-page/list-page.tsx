import React, { useEffect, useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates, ButtonState, SearchIndex } from "../../types";
import style from "./list-page.module.css";
import { LinkedListNode, LinkedList, IList } from "./list";
import { returnArray, rndArr } from "./utils";

export const ListPage: React.FC = () => {
  const { page, input, buttonsBox, node, clear, button, nodeBox } = style;
  const [inputValue, setInputValue] = useState("");
  const [inputIndex, setInputIndex] = useState("");
  const [head, setHead] = useState<LinkedListNode<string> | null | undefined>(
    new LinkedListNode(ElementStates.Default)
  );
  const [searchIndexAdd, setSearchIndexAdd] = useState<SearchIndex>({});
  const [searchIndexDel, setSearchIndexDel] = useState<SearchIndex>({});
  const [tail, setTail] = useState<LinkedListNode<string> | null | undefined>(
    new LinkedListNode(ElementStates.Default)
  );
  const [linkedList, setLinkedList] = useState(new LinkedList<string>());
  const [renderArray, setRenderArray] = useState<LinkedListNode<string>[]>([]);
  const [buttonState, setBattonState] = useState({
    add: {
      isDisabled: true,
    },
    del: {
      isDisabled: false,
    },
    clear: {
      isDisabled: true,
    },
  });

  useEffect(() => {
    let node = new LinkedList([...rndArr(4)]);

    setLinkedList(node);
    node.head && setRenderArray(returnArray(node.head));
  }, [setRenderArray, setLinkedList]);

  const inputChangeValue = (e: any) => {
    setInputValue(e.target.value);
    !e.target.value &&
      setBattonState({ ...buttonState, add: { isDisabled: true } });
    e.target.value &&
      setBattonState({ ...buttonState, add: { isDisabled: false } });
  };
  const inputChangeIndex = (e: any) => {
    setInputIndex(e.target.value);
    !e.target.value &&
      setBattonState({ ...buttonState, add: { isDisabled: true } });
    e.target.value &&
      setBattonState({ ...buttonState, add: { isDisabled: false } });
  };

  const addToTop = (value: string) => {
    setSearchIndexAdd({ index: 0, value: value });
    setTimeout(() => {
      if (linkedList) {
        linkedList.addToTop(value, ElementStates.Modified);
        linkedList.head && setRenderArray(returnArray(linkedList.head));
      }
      // console.log("1", value, linkedList)
      setSearchIndexAdd({});
      setTimeout(() => {
        linkedList.head && setRenderArray(returnArray(linkedList.head));
      }, 500);
    }, 500);
  };

  const addToTail = (value: string) => {
    setSearchIndexAdd({ index: renderArray.length - 1, value: value });
    setTimeout(() => {
      if (linkedList) {
        linkedList.addToTail(value, ElementStates.Modified);
        linkedList.head && setRenderArray(returnArray(linkedList.head));
      }
      setSearchIndexAdd({});
      setTimeout(() => {
        linkedList.head && setRenderArray(returnArray(linkedList.head));
      }, 500);
    }, 500);
  };

  const delFromTop = () => {
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
      }, 500);
    }, 500);
  };
  const delFromTail = () => {
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
      }, 500);
    }, 500);
  };
  const renderSearchIndex = (
    i: number,
    index: number,
    searchIndex: SearchIndex,
    set: React.Dispatch<React.SetStateAction<SearchIndex>>,
    value?: string
  ) => {
    value && (searchIndex.index = i);
    console.log("renderSearchIndex", value);
    i - 1 >= 0 && (renderArray[i - 1].state = ElementStates.Modified);
    setRenderArray([...renderArray]);
    if (i < index)
      setTimeout(() => {
        i++;
        renderSearchIndex(i, index, searchIndex, set, value);
        if (i === index) {
          let arrRender: {
            value: string;
            state: ElementStates;
          }[];
          linkedList.head && (arrRender = returnArray(linkedList.head));
          setTimeout(() => {
            console.log("arrx", arrRender);
            if (!value) {
              renderArray[i].state = ElementStates.Modified;
              searchIndex.value = renderArray[i].value;
              renderArray[i].value = "";
              searchIndex.index = i;
              console.log(
                "SearchIndex",
                searchIndex.value,
                searchIndex.index,
                arrRender
              );
              setRenderArray([...renderArray]);
            } else {
              set({});
              arrRender[i].state = ElementStates.Modified;
              setRenderArray([...arrRender]);
            }

            // set({});
          }, 300);
          console.log("(i===index)", i, linkedList.head);
          setTimeout(() => {
            arrRender[i].state = ElementStates.Default;
            setRenderArray(arrRender);
            set({});
          }, 800);
        }
      }, 500);
  };

  const addByIndex = (value: string, index: number) => {
    linkedList && linkedList.addByIndex(value, index);
    searchIndexAdd.value = value;
    renderSearchIndex(0, index, searchIndexAdd, setSearchIndexAdd, value);
  };

  const delByIndex = (index: number) => {
    linkedList && linkedList.delByIndex(index);
    renderSearchIndex(0, index, searchIndexDel, setSearchIndexDel);
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={page}>
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
          disabled={buttonState.add.isDisabled}
          onClick={() => addToTop(inputValue)}
          extraClass={button}
        />
        <Button
          text="Добавить в tail"
          disabled={buttonState.add.isDisabled}
          onClick={() => addToTail(inputValue)}
          extraClass={button}
        />
        <Button
          text="Удалить из head"
          disabled={buttonState.del.isDisabled}
          onClick={() => delFromTop()}
          extraClass={button}
        />
        <Button
          text="Удалить из tail"
          disabled={buttonState.del.isDisabled}
          onClick={() => delFromTail()}
          extraClass={button}
        />
      </div>
      <div className={page}>
        <Input
          extraClass={input}
          type={"text"}
          maxLength={2}
          value={inputIndex}
          isLimitText
          onChange={inputChangeIndex}
        />
        <Button
          text="Добавить по индексу"
          disabled={buttonState.add.isDisabled}
          onClick={() => addByIndex(inputValue, Number(inputIndex))}
          extraClass={button}
        />
        <Button
          text="Удалить по индексу"
          disabled={buttonState.del.isDisabled}
          onClick={() => delByIndex(Number(inputIndex))}
          extraClass={button}
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
