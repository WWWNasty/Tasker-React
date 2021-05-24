import React from 'react';
//import './NavMenu.css';
import {AppBar} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

export default class NavMenu extends React.Component<any, any> {

    render () {
        return (
            <header>
                <AppBar position='static'>
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            Scheduler
                        </Typography>
                    </Toolbar>
                </AppBar>
            </header>
        );
    }
}
