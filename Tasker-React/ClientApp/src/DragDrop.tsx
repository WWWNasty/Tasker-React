import React, {FC, useCallback, useMemo, useReducer} from 'react';
import './App.css';
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
    }),
);

export const ObjectiveItem: FC<{ objective: Objective, index: number }> = ({objective, index}) => <Draggable
    draggableId={objective.id!.toString()} index={index}>
    {(provided, snapshot) => (
        <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}

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

export const DragDrop: FC<{ data: Objective[], setTasks: any }> = ({data, setTasks}) => {
    const [state, dispatch] = useReducer(dragReducer, {
        items: data,
    });

    const handleChange = async (task: Objective) => {
        const response = await fetch("/Tasker", {
            method: "PUT",
            headers: {"Accept": "application/json", "Content-Type": "application/json"},
            body: JSON.stringify({...task, completed: !task.completed})
        })
        if (response.ok){
            const updatedObjective: Objective = await response.json();
            setTasks(
                data.map(t => t.id === updatedObjective.id ? updatedObjective : t)
            );
        }
    };

    const onDragEndCallback = useCallback((result) => {
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

    const onDragEnd = async (dropResult: DropResult) => {
        const task = data.find(obj => obj.id?.toString() === dropResult.draggableId);

        if(task)
            await handleChange(task);

        onDragEndCallback(dropResult);

    };

    const tasksByStatus = useMemo(() => {
        const todo = data.filter(obj => !obj.completed);
        const completed = data.filter(obj => obj.completed);

        return [
            {name: "To Do", tasks: todo},
            {name: "Completed", tasks: completed}
        ];

    }, [data]);

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <div style={{display: 'flex'}}>
                    {
                        tasksByStatus.map(column =>
                            <Column name={column.name} objectives={column.tasks}/>)

                    }
                </div>
            </DragDropContext>
        </>
    );
}
