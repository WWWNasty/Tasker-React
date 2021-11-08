import React, {FC, useCallback, useMemo, useReducer} from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import produce from "immer";
import {Objective} from "./App";

const dragReducer = produce((draft, action) => {
    switch (action.type) {
        case "MOVE": {
            draft[action.from] = draft[action.from] || [];
            draft[action.to] = draft[action.to] || [];
            const [removed] = draft[action.from].splice(action.fromIndex, 1);
            draft[action.to].splice(action.toIndex, 0, removed);
        }
    }
});

export const ObjectiveItem: FC<{ objective: Objective, index: number }> = ({objective, index}) => <Draggable
    draggableId={objective.id!.toString()} index={index}>
    {(provided, snapshot) => (
        <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}

            //тут тоже
            //isDragging={snapshot.isDragging}
        >
            {objective.created}: {objective.task}
        </div>
    )}

</Draggable>;


export const Column: FC<{ name: string, objectives: Objective[] }> = ({name, objectives}) => <>
    <Droppable droppableId={name}>
        {(provided, snapshot) =>
            <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                //isDraggingOver={snapshot.isDraggingOver}
            >
                {objectives.map((obj, index) => <ObjectiveItem objective={obj} index={index}/>)}
                {provided.placeholder}
            </div>
        }
    </Droppable>
</>;

export const Dragging: FC<{ data: Objective[] }> = ({data}) => {
    const [state, dispatch] = useReducer(dragReducer, {
        items: data,
    });

    const onDragEnd = useCallback((result) => {
        if (result.reason === "DROP") {
            if (!result.destination) {
                return;
            }
            dispatch({
                type: "MOVE",
                from: result.source.droppableId,
                to: result.destination.droppableId,
                fromIndex: result.source.index,
                toIndex: result.destination.index,
            });
        }
    }, [dispatch]);

    const tasksByStatus = useMemo(() => {
        const todo = data.filter(obj => !obj.completed);
        const completed = data.filter(obj => obj.completed);

        return [
            {name: "To Do", tasks: todo},
            {name: "Completed", tasks: completed}
        ];

    }, [data]);

    return (
        <div className={`flex flex-row h-screen p-4`}>
            <DragDropContext onDragEnd={onDragEnd}>
                <div style={{display: 'flex'}}>
                    {
                        tasksByStatus.map(column =>
                            <Column name={column.name} objectives={column.tasks}/>)

                    }
                </div>
            </DragDropContext>

        </div>
    );
};
