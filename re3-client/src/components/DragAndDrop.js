import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { AiOutlineClose } from 'react-icons/ai';

const a = 'Unordered';
const b = 'Ordered';
const ColumnsFromBackend = {
  [a]: {
    name: 'Unordered',
    items: []
  },
  [b]: {
    name: 'Ordered',
    items: []
  }
};

const insertItems = (list, Columns) => {
  let newColumns = Columns.Unordered;
  newColumns.items = list;
};

const onDragEnd = (result, columns, setColumns, setParentOrder) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
    // added below
    setParentOrder({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
    // console.log(destColumn);
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
    // added below
    setParentOrder({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
    // console.log(column);
  }
};

const deleteItem = (id, setColumns, setParentOrder, setSource ,list) => {
  const Ordered = ColumnsFromBackend.Ordered;
  const Unordered = ColumnsFromBackend.Unordered;
  // const result = Unordered.items.filter(x => x.id ===id)
  const index = Unordered.items.findIndex((x) => x.id === id);
  // console.log(index);
  // console.log(Unordered.items[index]);
  if (index > -1) {
    Unordered.items.splice(index, 1);
  } else {
    const index2 = Ordered.items.findIndex((x) => x.id === id);
    // console.log(Ordered.items[index2]);
    if (index2 > -1) {
      Ordered.items.splice(index2, 1);
    }
  }
  setColumns({
    Unordered,
    Ordered
  });
  // setParentOrder({
  //   Unordered,
  //   Ordered
  // });

    var newArrayOfFiles = [];
    list.forEach(function(item) {
      newArrayOfFiles.push(item.content);
    });
    
  setSource(newArrayOfFiles);
};

// change below to also take a setState (setParentOrder) from parent that copies over the state of the columns in this component
// whenever it is updated -Lukas
function Temp2({ list, setParentOrder, setSource }) {
  insertItems(list, ColumnsFromBackend);
  const [columns, setColumns] = useState(ColumnsFromBackend);
  // console.log(setSource);
  // console.log(setParentOrder);
  return (
    <div className="flex flex-row  bg-blue-100">
      <DragDropContext
        onDragEnd={(result) =>
          onDragEnd(result, columns, setColumns, setParentOrder)
        }
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              className="flex flex-col bg-blue-500 m-1 items-center text-2xl font-bold min-h-80 w-72 content-center rounded-md"
              key={columnId}
            >
              <h2 className="m-6">{column.name}</h2>

              <div className="m-4 min-h-64 w-64">
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`p-4 w-64 min-h-64 items-center rounded-md ${
                          snapshot.isDraggingOver
                            ? 'bg-blue-300'
                            : 'bg-blue-400'
                        }`}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                    className={`p-1 m-2 h-12 rounded-md relative ${
                                      snapshot.isDragging
                                        ? 'bg-blue-100'
                                        : 'bg-white'
                                    }`}
                                    style={{
                                      userSelect: 'none',
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    <button
                                      className="text-black text-xs absolute top-0 right-0 rounded-full bg-blue-200 m-1"
                                      onClick={() =>
                                        deleteItem(
                                          item.id,
                                          setColumns,
                                          setParentOrder,
                                          setSource,
                                          list
                                        )
                                      }
                                    >
                                      <AiOutlineClose />
                                    </button>
                                    <div className="truncate text-base p-2 ">
                                      {item.content.name}
                                    </div>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default Temp2;
