import React, { useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { H5, Colors } from "@blueprintjs/core";
import {
  DropResult,
  Droppable,
  DroppableProvided,
  Draggable,
  DraggableProvided,
  DraggableLocation,
  DraggableStateSnapshot,
  DragDropContext,
} from "react-beautiful-dnd";
import { Sidebar } from "@/components/Sidebar";
import { NavigationHeader } from "@/components/NavigationHeader";

const Container = styled.main`
  min-height: 100vh;
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
  overflow: hidden;
`;

const ContainerIssues = styled.div`
  flex: 1 1 auto;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
`;

const ContainerBoard = styled.div`
  height: 100%;
  width: 100%;
  padding: 20px;
  display: inline-flex;
  overflow: auto;
`;

const ContainerColumn = styled.div`
  margin: 8px;
  display: flex;
  flex-direction: column;
`;

const ContainerList = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${Colors.GRAY4};
  padding: 8px;
  padding-bottom: 0;
  border: 8px;
  transition: background-color 0.2s ease, opacity 0.1 ease;
  use-select: none;
  width: 320px;
`;

const ContainerIssue = styled.a`
  border-radius: 2px;
  border: 2px solid transparent;
  border-color: transparent;
  background-color: ${Colors.WHITE};
  box-shadow: none;
  box-sizing: border-box;
  padding: 8px;
  margin-bottom: 8px;
  user-select: none;
  display: flex;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  background-color: ${Colors.GRAY4};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${Colors.GRAY5};
  }
`;

const Title = styled.h4`
  padding: 8px;
  transition: background-color ease 0.2s;
  flex-grow: 1;
  user-select: none;
  position: relative;
  margin: 0;

  &:focus {
    outline: 2px solid ${Colors.BLUE3};
    outline-offset: 2px;
  }
`;

const DropZone = styled.div`
  min-height: 200px;
  padding-bottom: 8px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 100%;
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

const InnerIssueList = React.memo(function InnerIssueList({
  issues,
}: {
  issues: IssueClue[];
}): JSX.Element {
  const list = issues.map((issue: IssueClue, index: number) => (
    <Draggable key={issue.id} draggableId={issue.id} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot): JSX.Element => (
        <ContainerIssue
          key={issue.id}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          data-is-dragging={snapshot.isDragging}
          data-testid={issue.id}
          data-index={index}
        >
          <Content>
            <H5>{issue.id}</H5>
            <p>{issue.content}</p>
          </Content>
        </ContainerIssue>
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
              <InnerIssueList issues={issues} />
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
          <Header>
            <Title {...provided.dragHandleProps}>{title}</Title>
          </Header>
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
  return (
    <Droppable
      droppableId="board"
      type="COLUMN"
      direction="horizontal"
      ignoreContainerClipping={false}
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
    "Back Log": [
      {
        id: "10",
        content: "Sometimes life is scary and dark",
      },
    ],
    "To Do": [
      {
        id: "1",
        content: "Sometimes life is scary and dark",
      },
    ],
    "In Progress": [
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
    "For Review": [
      {
        id: "6",
        content: "Responsibility demands sacrifice",
      },
      {
        id: "7",
        content: "That's it! The answer was so simple, I was too smart to see it!",
      },
    ],
    "For Release": [
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
