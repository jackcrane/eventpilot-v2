import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { Card } from "tabler-react-2";
import { Icon } from "../../util/Icon";
import { Col, Row } from "../../util/Flex";
import { Typography } from "tabler-react-2";
const { Text } = Typography;

export const Sortable = ({ items, lockedItems, onChange }) => {
  const [list, setList] = useState(items);

  useEffect(() => {
    setList(items);
  }, [items]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedList = [...list];
    const [movedItem] = reorderedList.splice(result.source.index, 1);
    reorderedList.splice(result.destination.index, 0, movedItem);

    setList(reorderedList);
    onChange(reorderedList);
  };

  return (
    <>
      {lockedItems?.map((item, i) => (
        <Card className="mb-1" key={i}>
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
                  key={item.id}
                  draggableId={item.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                      <Card className="mb-1">
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
