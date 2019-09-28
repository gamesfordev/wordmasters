import React, { Component } from 'react'
import './BoardItem.css'

class BoardItem extends Component {

    constructor() {
        super();
    }


    render() {
        let style = {width: this.props.width + '%', height: this.props.width + '%'};
        if(this.props.pressed) {
            style.backgroundColor = 'yellow';
        }
        return <div className="box-item" style={style}>
                        <span>{this.props.letter}</span>
                    </div>;
    }
}

export default BoardItem;
