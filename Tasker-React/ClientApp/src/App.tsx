import React, {useEffect, useState} from 'react';
import './App.css';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import {TaskDialog} from "./TaskDialog";


function App() {
    const [tasks, setTasks] = useState<Objective[]>([]);
    const [selectedObjective, setSelectedObjective] = useState<Objective>();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        (async () => {

            const getSelectOptions = async () => {

                const response = await fetch("/Tasker", {
                    method: "Get",
                    headers: {"Accept": "application/json"}
                });

                if (response.ok) {
                    return await response.json();
                }
            }

            const tasks: Objective[] = await getSelectOptions();
            setTasks(tasks);
            if (!tasks) {
                //todo show a popup with error
                return;
            }

        })()
    }, []);

    const handleAddTask = async (task: Objective) => {

        const isEdit = task.id;
        const response = await fetch("/Tasker", {
            method: isEdit ? "PUT" : "POST",
            headers: {"Accept": "application/json", "Content-Type": "application/json"},
            body: JSON.stringify(task)
        })

        if (response.ok) {
            const newTask = await response.json();
            if (isEdit) {
                setTasks(tasks.map(task => task.id == newTask.id ? newTask : task));
            } else {
                setTasks([newTask, ...tasks]);
            }
            //props.setOpenAlertGreen(true);
        } else {
            //props.setOpenAlertRed(true);
        }
    };

    const handleDelete = async (id: number) => {

        const response = await fetch("/Tasker", {
            method: "DELETE",
            headers: {"Accept": "application/json", "Content-Type": "application/json"},
            body: JSON.stringify(id)
        });

        if (response.ok) {
            setTasks(tasks.filter(t => t.id != id));
            return;
        }
    };

    const editTask = (item: Objective) => {
        setSelectedObjective(item);
        setOpen(true);
    };

    const addTask = () => {
        setSelectedObjective(undefined);
        setOpen(true);
    }

    return (
        <Box className="App">
            <Button variant="outlined" color="primary" onClick={() => addTask()} className="mt-3 mb-2">
                Создать задачу
            </Button>
            <TaskDialog objective={selectedObjective} onAdded={handleAddTask} open={open} setOpen={setOpen}/>
            <ol>
                {tasks?.map((item) => <li key={item.id}>{item.created}: {item.task}
                    <Button onClick={() => editTask(item)}
                            variant="contained"
                            color="primary">
                        Редактировать
                    </Button>
                    <Button onClick={() => handleDelete(item.id!)} variant="contained" color="secondary">
                        Удалить
                    </Button>
                </li>) ?? []}
            </ol>
        </Box>
    );
}

export default App;

export interface Objective {
    id?: number;
    task: string;
    created?: string;
    completed?: boolean;
}
