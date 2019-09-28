import React, { Component } from 'react'
import './LeftPanel.css'

class LeftPanel extends Component {

    constructor() {
        super();
    }


    render() {
        return <div className="left-panel">
            <div>Time</div>
            <div>{this.props.time}</div>
        </div>;
    }
}

export default LeftPanel;
