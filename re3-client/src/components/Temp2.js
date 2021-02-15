import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

// const itemsFromBackend = [
//   { id: "1", content: "First task" },
//   { id: "2", content: "Second task" },
//   { id: "3", content: "Third task" },
//   { id: "4", content: "Fourth task" },
//   { id: "5", content: "Fifth task" }
// ];
const a= "Unordered";
const b ="Ordered";
const ColumnsFromBackend = {
   [a]:{
    name: "Unordered",
    items: []
  },
   [b]:{
    name: "Ordered",
    items: []
  }
};

const insertItems =(list, Columns)=>{
    let newColumns= Columns.Unordered;
    console.log("insertItem");
    console.log(list);
    
    newColumns.items= list;
}

const onDragEnd = (result, columns, setColumns) => {
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
    console.log(destColumn);
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
    // console.log(column);
  }
  
};

function Temp2(list) {
insertItems(list.list, ColumnsFromBackend);
  const [columns, setColumns] = useState(ColumnsFromBackend);
//   console.log("list");
//   console.log(list.list);
//   const p= [list.list];
//   console.log(p);
//   console.log("ready list");
//   console.log(itemsFromBackend);

  return (
    <div className= "flex flex-row  bg-blue-100">
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div className="flex flex-col bg-blue-500 m-2 items-center text-2xl font-bold h-80 w-72 content-center rounded-md"
              key={columnId}
            >
              <h2 className="m-6">{column.name}</h2>
              <div className ="m-4 h-64 w-64">
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className= {`p-4 w-64 h-64 items-center rounded-md ${snapshot.isDraggingOver? "bg-blue-300": "bg-blue-400"}`}
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
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`p-2 m-2 h-8 truncate text-base rounded-md ${snapshot.isDragging
                                    ? "bg-blue-100"
                                    : "bg-white"}`}
                                    style={{
                                      userSelect: "none",
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    {item.content.name}
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
