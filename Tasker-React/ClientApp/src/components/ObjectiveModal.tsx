import React, {ChangeEvent, Component} from "react";
import {Dialog} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";


export class ObjectiveModal extends Component <any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            description: ''
        };
    }

    componentWillReceiveProps(nextProps: Readonly<any>, nextContext: any): void {
        this.setState({
            description: nextProps.objective.description
        });
    }

    handleChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            description: event.target.value
        });
    }

    onConfirmation() {
        let updatedObjective = {
            ...this.props.objective,
            description: this.state.description
        };

        this.props.onSubmit(updatedObjective);
        this.props.onCancel();
    }

    render(): React.ReactNode {
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.onCancel}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">{this.props.actionName} task</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Description"
                            fullWidth
                            onChange={(event: ChangeEvent<HTMLInputElement>) => this.handleChange(event)}
                            value={this.state.description}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.onCancel} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.onConfirmation()} color="primary">
                            {this.props.actionName}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
