import React from 'react';
import $ from 'jquery';
import {UPDATE_ACCOUNT_URL} from '../../settings';
import {MiniButton} from '../../common_components/MiniButton/MiniButton';
import style from './BirthDateControl.module.css';
import {dateStringForDisplay} from '../../utils';

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
        let {birthDate} = this.state;
        let {enableEditor} = this.props;
        if (birthDate === null) {
            if (enableEditor) {
                return <span onClick={this.birthDateClickHandler} style={{cursor: 'pointer'}}>указать</span>;
            }
            return <span className={style.not_specified_element}><em>не указана...</em></span>
        }
        return (
            <span onClick={this.birthDateClickHandler} style={enableEditor ? {cursor: 'pointer'} : {}}>
                {dateStringForDisplay(birthDate, false)}
            </span>
        );
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
        let {enableEditor} = this.props;
        if (!enableEditor) return;
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
        let {editMode} = this.state;
        return (
            <div className={style.control_container}>
                {editMode ? this.getEditorContent() : this.getBirthDateContent()}
            </div>
        )
    }
}

export default BirthDateControl;