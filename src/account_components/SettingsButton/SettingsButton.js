import React from 'react';
import style from './SettingsButton.module.css';

class SettingsButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasActive: false
        }

        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler() {
        this.props.clickHandler();
        this.setState(prevState => ({hasActive: !prevState.hasActive}));
    }

    render() {
        let {hasActive} = this.state;
        let targetClasses = `${style.settings_button_container} ${hasActive ? style.sittings_show : style.settings_hide}`;
        return (
            <div className={targetClasses} onClick={this.clickHandler}>
                <img src={this.state.hasActive ? '/images/settings_white.svg' : '/images/settings_gray.svg'}/>
            </div>
        );
    }
}

export default SettingsButton;