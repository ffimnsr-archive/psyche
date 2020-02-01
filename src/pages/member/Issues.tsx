import React, { useState } from "react";
import styled from "styled-components";
import classNames from "classnames";
import { Helmet } from "react-helmet-async";
import { H4, H5, Classes, Colors } from "@blueprintjs/core";
import {
  DropResult,
  Droppable,
  DroppableProvided,
  Draggable,
  DraggableProvided,
  DraggableLocation,
  DragDropContext,
} from "react-beautiful-dnd";
import { Sidebar } from "@/components/Sidebar";
import { NavigationHeader } from "@/components/NavigationHeader";

const Container = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
`;

const ContainerMain = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  align-content: stretch;
`;

const ContainerIssues = styled.div`
  flex: 1 1 auto;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
`;

const ContainerBoard = styled.div`
  background-color: ${Colors.BLUE2};
  height: 100%;
`;

const ContainerColumn = styled.div`
  margin: 5px;
  display: flex;
  flex-direction: column;
`;

const ContainerColumnHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContainerList = styled.div`
  display: flex;
  flex-direction: column;
`;

const DropZone = styled.div`
  padding-bottom: 5px;
`;

interface IssueClue {
  id: string;
  content: string;
}

interface IssueMap {
  [key: string]: IssueClue[];
}

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

function reorderIssueMap({
  issueMap,
  source,
  destination,
}: {
  issueMap: IssueMap;
  source: DraggableLocation;
  destination: DraggableLocation;
}): { issueMap: IssueMap } {
  const current: IssueClue[] = [...issueMap[source.droppableId]];
  const next: IssueClue[] = [...issueMap[destination.droppableId]];
  const target: IssueClue = current[source.index];

  if (source.droppableId === destination.droppableId) {
    const reordered: IssueClue[] = reorder(current, source.index, destination.index);
    const result: IssueMap = {
      ...issueMap,
      [source.droppableId]: reordered,
    };

    return { issueMap: result };
  }

  current.splice(source.index, 1);
  next.splice(destination.index, 0, target);

  const result: IssueMap = {
    ...issueMap,
    [source.droppableId]: current,
    [destination.droppableId]: next,
  };

  return { issueMap: result };
}

const IssueInnerList = React.memo(function IssueInnerList({
  issues,
}: {
  issues: IssueClue[];
}): JSX.Element {
  const list = issues.map((issue: IssueClue, index: number) => (
    <Draggable key={issue.id} draggableId={issue.id} index={index}>
      {(provided: DraggableProvided): JSX.Element => (
        <div
          className={classNames(Classes.CARD, Classes.INTERACTIVE)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <H5>{issue.id}</H5>
          <p>{issue.content}</p>
        </div>
      )}
    </Draggable>
  ));

  return <div>{list}</div>;
});

function IssueList({
  listId,
  issues,
}: {
  listId: string;
  issues: IssueClue[];
}): JSX.Element {
  return (
    <Droppable
      droppableId={listId}
      type="ISSUE"
      ignoreContainerClipping={false}
      isCombineEnabled={false}
    >
      {(provided: DroppableProvided): JSX.Element => (
        <ContainerList {...provided.droppableProps}>
          <div>
            <DropZone ref={provided.innerRef}>
              <IssueInnerList issues={issues} />
              {provided.placeholder}
            </DropZone>
          </div>
        </ContainerList>
      )}
    </Droppable>
  );
}

function IssueColumn({
  title,
  issues,
  index,
}: {
  title: string;
  issues: IssueClue[];
  index: number;
}): JSX.Element {
  return (
    <Draggable draggableId={title} index={index}>
      {(provided: DraggableProvided): JSX.Element => (
        <ContainerColumn ref={provided.innerRef} {...provided.draggableProps}>
          <ContainerColumnHeader>
            <H4 {...provided.dragHandleProps}>{title}</H4>
          </ContainerColumnHeader>
          <IssueList listId={title} issues={issues} />
        </ContainerColumn>
      )}
    </Draggable>
  );
}

function IssueBoard({
  orderedKeys,
  columns,
}: {
  orderedKeys: string[];
  columns: IssueMap;
}): JSX.Element {
  console.log(orderedKeys);
  console.log(columns);

  return (
    <Droppable
      droppableId="board"
      type="COLUMN"
      direction="horizontal"
      isCombineEnabled={false}
    >
      {(provided: DroppableProvided): JSX.Element => (
        <ContainerBoard ref={provided.innerRef} {...provided.droppableProps}>
          {orderedKeys.map((key: string, index: number) => (
            <IssueColumn key={key} index={index} title={key} issues={columns[key]} />
          ))}
          {provided.placeholder}
        </ContainerBoard>
      )}
    </Droppable>
  );
}

function Issues(): JSX.Element {
  const initialData = {
    bmo: [
      {
        id: "1",
        content: "Sometimes life is scary and dark",
      },
    ],
    finn: [
      {
        id: "4",
        content: "Is that where creativity comes from? From sad biz?",
      },
      {
        id: "5",
        content: "Homies help homies. Always",
      },
      {
        id: "8",
        content:
          "People make mistakes. It's all a part of growing up and you never really stop growing",
      },
      {
        id: "9",
        content: "Don't you always call sweatpants 'give up on life pants,' Jake?",
      },
    ],
    princess: [
      {
        id: "6",
        content: "Responsibility demands sacrifice",
      },
      {
        id: "7",
        content: "That's it! The answer was so simple, I was too smart to see it!",
      },
    ],
    jake: [
      {
        id: "2",
        content:
          "Sucking at something is the first step towards being sorta good at something.",
      },
      {
        id: "3",
        content: "You got to focus on what's real, man",
      },
    ],
  };

  const [columns, setColumns] = useState<IssueMap>(initialData);
  const [orderedKeys, setOrderedKeys] = useState<string[]>(Object.keys(initialData));

  const onDragEnd = (result: DropResult): void => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (result.type === "COLUMN") {
      const ordered: string[] = reorder(orderedKeys, source.index, destination.index);
      setOrderedKeys(ordered);
      return;
    }

    const data = reorderIssueMap({
      issueMap: columns,
      source,
      destination,
    });

    setColumns(data.issueMap);
  };

  return (
    <Container>
      <Helmet titleTemplate="%s | Open Sesame">
        <title>Issues</title>
      </Helmet>
      <Sidebar />
      <ContainerMain>
        <NavigationHeader />
        <ContainerIssues>
          <DragDropContext onDragEnd={onDragEnd}>
            <IssueBoard orderedKeys={orderedKeys} columns={columns} />
          </DragDropContext>
        </ContainerIssues>
      </ContainerMain>
    </Container>
  );
}

export default Issues;
