import React from 'react';
import $ from 'jquery';
import {UPDATE_ACCOUNT_URL} from '../../settings';
import {MiniButton} from '../../MiniButton/MiniButton';
import style from './BirthDateControl.module.css';

export function dateStringForDisplay(dateString) {
    let monthList = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    let [_, y, m, d] = /(\d{4})-(\d{2})-(\d{2})/.exec(dateString);
    return `${(d[0] === '0') ? d[1] : d} ${monthList[+m - 1]} ${y} г.`;
}

class BirthDateControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            birthDate: props.account.birth_date
        }

        this.birthDateClickHandler = this.birthDateClickHandler.bind(this);
        this.birthDateChoiceHandler = this.birthDateChoiceHandler.bind(this);
        this.okClickHandler = this.okClickHandler.bind(this);
        this.cancelClickHandler = this.cancelClickHandler.bind(this);
    }

    getBirthDateContent() {
        if (this.state.birthDate === null) {
            return <span onClick={this.birthDateClickHandler}>указать</span>
        }
        return <span onClick={this.birthDateClickHandler}>{dateStringForDisplay(this.state.birthDate)}</span>
    }

    getEditorContent() {
        return (
            <div className={style.editor_container}>
                <input type="date" value={this.state.birthDate} onChange={this.birthDateChoiceHandler}/>
                <MiniButton buttonType="ok" clickHandler={this.okClickHandler}/>
                <MiniButton buttonType="cancel" clickHandler={this.cancelClickHandler}/>
            </div>
        )
    }

    birthDateClickHandler() {
        this.setState({
            editMode: true
        })
    }

    birthDateChoiceHandler(event) {
        this.setState({
            birthDate: event.target.value
        });
    }

    okClickHandler() {
        if (this.state.birthDate === null) {
            this.setState({
                editMode: false
            });
            return
        }

        let token = localStorage.getItem('token');
        $.ajax(UPDATE_ACCOUNT_URL, {
            method: 'PATCH',
            headers: {
                'authorization': token
            },
            data: {
                birth_date: this.state.birthDate
            }
        }).then(data => {
            this.setState({
                editMode: false
            });
            this.props.refreshAccount(data);
        });
    }

    cancelClickHandler() {
        this.setState({
            editMode: false
        });
    }

    render() {
        return (
            <div className={style.control_container}>
                {(this.state.editMode) ? this.getEditorContent() : this.getBirthDateContent()}
            </div>
        )
    }
}

export default BirthDateControl;