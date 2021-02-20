import React from 'react';
import style from './ModeSelector.module.css';
import {SimpleButton} from "../../SimpleButton/SimpleButton";

class ModeSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'left'
        }
        this.toLeft = this.toLeft.bind(this);
        this.toRight = this.toRight.bind(this);
    }

    toLeft() {
        let {current} = this.state;
        if (current === 'left') return;

        this.setState({current: 'left'});
        let {actionHandler, left} = this.props;
        actionHandler(left);
    }

    toRight() {
        let {current} = this.state;
        if (current === 'right') return;

        this.setState({current: 'right'});
        let {actionHandler, right} = this.props;
        actionHandler(right);
    }

    render() {
        let {leftTitle, rightTitle} = this.props;
        let {current} = this.state;
        let leftStylePreset = current === 'left' ? 'green' : 'gray';
        let rightStylePreset = current === 'right' ? 'green' : 'gray';
        return (
            <div className={style.selector_container}>
                <SimpleButton title={leftTitle} stylePreset={leftStylePreset} actionHandler={this.toLeft}/>
                <SimpleButton title={rightTitle} stylePreset={rightStylePreset} actionHandler={this.toRight}/>
            </div>
        );
    }
}

export default ModeSelector;