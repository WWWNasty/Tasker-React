import React, {FC, FormEvent, PropsWithChildren, useEffect, useState} from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Objective} from "./App";

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

interface TaskDialogProps {
    onAdded: (task: Objective) => void;
    objective?: Objective;
    setOpen: any;
    open: boolean;
}

export const TaskDialog: FC<TaskDialogProps> = ({onAdded, open, objective, setOpen}) => {

    const classes = useStyles();

    const [task, setTask] = useState('');

    useEffect(() => setTask(objective?.task ?? ''), [objective]);

    const onSubmit = async (event: FormEvent) => {

        event.preventDefault();
        onAdded({...objective, task});
        close();
    };


    const close = () => {
        setTask('');
        setOpen(false);
    };

    return (
        <div>

            <Dialog fullWidth={true} maxWidth={'lg'} open={open} onClose={close}
                    aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Задача</DialogTitle>
                <form className={classes.root} onSubmit={onSubmit} autoComplete="off">
                    <DialogContent>

                        <TextField
                            name="task"
                            onChange={event => setTask(event.target.value)}
                            value={task}
                            required
                            id="standard-required"
                            label="Задача"/>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={close} color="primary">
                            Отмена
                        </Button>
                        <Button type="submit" color="primary">
                            Добавить
                        </Button>
                    </DialogActions>
                </form>

            </Dialog>
        </div>
    );
}
