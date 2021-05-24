import React, {Component, ReactNode} from "react";
import {Objective} from "../classes/objective";
//import {connect} from "react-redux";
//import {bindActionCreators, Dispatch} from "redux";
//import {actionCreators} from "../store/Objectives";
import {Card, CardContent, Fab, Typography} from "@material-ui/core";

//import './Objectives.css';
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {ObjectiveModal} from "./ObjectiveModal";
import AddIcon from "@material-ui/icons/Add";
import Paper from "@material-ui/core/Paper";
import Tooltip from '@material-ui/core/Tooltip';

interface ObjectiveProperties {
    getAll(): void;

    remove(objective: Objective): void;

    add(objective: Objective): void;

    update(objective: Objective): void;

    objectives: Objective[];
}

const initalState = {
    objectiveModalOpened: false,
    selectedObjective: {},
    currentAction: '',
    onSubmit: () => undefined
};

export class Objectives extends Component {

    constructor(props: any) {
        super(props);

        this.state = initalState;
    }

    // componentWillMount(): void {
    //     this.props.getAll();
    // }

    // openEditModal(objective: Objective) {
    //     this.setState({
    //         objectiveModalOpened: true,
    //         selectedObjective: objective,
    //         currentAction: 'Edit',
    //         onSubmit: (objective: Objective) => this.editObjective(objective)
    //     });
    //
    // }

    // openAddModal() {
    //     this.setState({
    //         objectiveModalOpened: true,
    //         selectedObjective: new Objective(),
    //         currentAction: 'Add',
    //         onSubmit: (objective: Objective) => this.addObjective(objective)
    //     })
    // }

    // addObjective(objective: Objective) {
    //     this.props.add(objective);
    // }
    //
    // editObjective(objective: Objective) {
    //     this.props.update(objective);
    // }
    //
    // getObjectives() {
    //     if (this.props.objectives.length) {
    //         return this.props.objectives.map(objective =>
    //             <Card key={objective.id} className={'card'}>
    //                 <CardContent>
    //                     <Tooltip title={objective.description}>
    //                         <Typography className='description'>{objective.description}</Typography>
    //                     </Tooltip>
    //                 </CardContent>
    //                 <CardActions>
    //                     <Button color={"primary"} onClick={() => this.openEditModal(objective)}>
    //                         Edit
    //                     </Button>
    //                     <Button color={"secondary"} onClick={() => this.props.remove(objective)}>
    //                         Remove
    //                     </Button>
    //                 </CardActions>
    //             </Card>
    //         );
    //     }
    //
    //     return (
    //         <Paper className='no-objectives'>
    //             <Typography variant="h5" component="h3">
    //                 No objectives yet. You can create new with + button
    //             </Typography>
    //         </Paper>
    //     );
    // }
    //
    // render(): ReactNode {
    //     return (
    //         <div className='objectives-container'>
    //             {this.getObjectives()}
    //             <div className='objectiveModal'>
    //                 <ObjectiveModal objective={this.state.selectedObjective}
    //                                 open={this.state.objectiveModalOpened}
    //                                 onCancel={() => this.hideModal()}
    //                                 onSubmit={this.state.onSubmit}
    //                                 actionName={this.state.currentAction}>
    //                 </ObjectiveModal>
    //             </div>
    //             <Fab color='primary' className='add-icon' onClick={() => this.openAddModal()}>
    //                 <AddIcon/>
    //             </Fab>
    //         </div>
    //     );
    // }

    private hideModal() {
        this.setState({
            ...this.state,
            objectiveModalOpened: false
        });
    }
}
//
// export default connect(
//     (state: any) => ({objectives: state.objectives}),
//     (dispatch: Dispatch<Objective[]>) => bindActionCreators(actionCreators, dispatch),
// )(Objectives);
