import React, { Component } from 'react'
import './RightPanel.css'

class RightPanel extends Component {

    constructor() {
        super();
    }


    render() {
        return <div className="right-panel">
            <div>Score</div>
            <div>{this.props.score} pts</div>
        </div>;
    }
}

export default RightPanel;
