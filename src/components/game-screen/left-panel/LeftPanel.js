import React, { Component } from 'react'
import './LeftPanel.css'

class LeftPanel extends Component {

    constructor() {
        super();
    }


    render() {
        let time = parseInt((this.props.time / 60)).toString().padStart(2, '0') + ":" + (this.props.time % 60).toString().padStart(2, '0');
        return <div className="left-panel">
            <div className="label">Time</div>
            <div className="value">{time}</div>
        </div>;
    }
}

export default LeftPanel;
