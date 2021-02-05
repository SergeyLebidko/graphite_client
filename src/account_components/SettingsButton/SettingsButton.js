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
        this.setState(prevState => {
            return {
                hasActive: !prevState.hasActive
            }
        });
    }

    render() {
        let inlineStyle = this.state.hasActive ? {
            backgroundImage: 'linear-gradient(to right bottom, limegreen, forestgreen)',
            color: 'white'
        } : {
            backgroundImage: 'linear-gradient(to right bottom, lightgray, silver)',
            color: 'white'
        };

        return (
            <img className={style.button}
                 style={inlineStyle}
                 src={this.state.hasActive ? '/images/settings_white.svg' : '/images/settings_gray.svg'}
                 onClick={this.clickHandler}
            />
        );
    }
}

export default SettingsButton;