import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { Card } from "tabler-react-2";
import { Icon } from "../../util/Icon";
import { Col, Row } from "../../util/Flex";
import { Typography } from "tabler-react-2";
import styled from "styled-components";
const { Text } = Typography;

const _UnsavedNotice = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: var(--tblr-warning);
  padding: 10px 2px;
  writing-mode: sideways-lr;
  color: #ffffffaa;
  font-weight: 600;
  border-top-right-radius: 10px;
`;

export const Sortable = ({ items, lockedItems, onChange }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    // Ensure items are sorted by sortIndex on mount/update
    const sortedItems = [...items].sort((a, b) => a.sortIndex - b.sortIndex);
    setList(sortedItems);
  }, [items]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedList = [...list];
    const [movedItem] = reorderedList.splice(result.source.index, 1);
    reorderedList.splice(result.destination.index, 0, movedItem);

    // Update sortIndex for each item based on its new position
    const updatedList = reorderedList.map((item, index) => ({
      ...item,
      sortIndex: index,
    }));

    setList(updatedList);
    onChange(updatedList);
  };

  return (
    <>
      {lockedItems?.map((item, i) => (
        <Card className="mb-1" key={`locked-${i}`} style={item.style}>
          <Row gap={1} align="flex-start">
            <div className="cursor-pointer">
              <Icon i="lock" className="text-secondary" size={18} />
            </div>
            <Col align="flex-start">{item.content}</Col>
          </Row>
        </Card>
      ))}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sortable-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {list.map((item, index) => (
                <Draggable
                  key={item.sortIndex}
                  draggableId={item.sortIndex.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                      <Card
                        className="mb-1"
                        style={{
                          ...item.style,
                          display: "relative",
                        }}
                      >
                        {item.unsaved && (
                          <_UnsavedNotice>Unsaved</_UnsavedNotice>
                        )}
                        <Row gap={1} align="flex-start">
                          <div
                            {...provided.dragHandleProps}
                            className="cursor-pointer"
                          >
                            <Icon
                              i="grip-vertical"
                              className="text-secondary"
                              size={18}
                            />
                          </div>
                          {item.content}
                        </Row>
                      </Card>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};
