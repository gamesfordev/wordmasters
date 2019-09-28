import React, { Component } from 'react'
import './RightPanel.css'

class RightPanel extends Component {

    constructor() {
        super();
    }


    render() {
        return <div className="right-panel">
            <div className="label">Score</div>
            <div className="value">{this.props.score}</div>
        </div>;
    }
}

export default RightPanel;
