import React from 'react';
import $ from 'jquery';
import style from './GenderControl.module.css';
import {MiniButton} from '../../MiniButton/MiniButton';
import {GENDER_LIST_URL, UPDATE_ACCOUNT_URL} from '../../settings';

class GenderControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            genderList: null,
            gender: this.props.account.gender
        }

        this.genderClickHandler = this.genderClickHandler.bind(this);
        this.genderChoiceHandler = this.genderChoiceHandler.bind(this);
        this.okClickHandler = this.okClickHandler.bind(this);
        this.cancelClickHandler = this.cancelClickHandler.bind(this);
    }

    componentDidMount() {
        $.ajax(GENDER_LIST_URL).then(data => {
            this.setState({genderList: data})
        });
    }

    genderChoiceHandler(event) {
        this.setState({
            gender: event.target.value
        })
    }

    okClickHandler() {
        let gender = (this.state.gender === null) ? Object.keys(this.state.genderList)[0] : this.state.gender;
        let token = localStorage.getItem('token');

        $.ajax(UPDATE_ACCOUNT_URL, {
            method: 'PATCH',
            headers: {
                'Authorization': token
            },
            data: {gender}
        }).then((data) => {
            this.setState({editMode: false, gender});
            this.props.refreshAccount(data);
        });
    }

    cancelClickHandler() {
        this.setState({
            editMode: false
        });
    }

    getEditorContent() {
        let options = [];
        let index = 0;
        let account = this.props.account;
        for (let key of Object.keys(this.state.genderList)) {
            options.push(
                <p key={'p_' + key}>
                    <label>
                        <input type="radio"
                               name="gender_choice"
                               value={key}
                               key={'radio_' + key}
                               defaultChecked={(account.gender === null && index === 0) || (account.gender === key)}
                               onClick={this.genderChoiceHandler}
                        />
                        {this.state.genderList[key]}
                    </label>
                </p>
            );
            index++;
        }
        return (
            <div className={style.editor_container}>
                {options}
                <div className={style.button_block}>
                    <MiniButton buttonType="ok" clickHandler={this.okClickHandler}/>
                    <MiniButton buttonType="cancel" clickHandler={this.cancelClickHandler}/>
                </div>
            </div>
        );
    }

    getGenderContent() {
        let {genderList} = this.state;
        if (genderList === null) return null;

        let {account, enableEditor} = this.props;
        if (account.gender === null) {
            if (enableEditor) return <span onClick={this.genderClickHandler} style={{cursor: 'pointer'}}>указать</span>;
            return <span className={style.not_specified_element}><em>не указан...</em></span>
        }
        return (
            <span onClick={this.genderClickHandler} style={enableEditor ? {cursor: 'pointer'} : {}}>
                {this.state.genderList[this.props.account.gender]}
            </span>
        );
    }

    genderClickHandler() {
        let {enableEditor} = this.props;
        if (!enableEditor) return;
        this.setState({
            editMode: true
        })
    }

    render() {
        return (
            <div className={style.control_container}>
                {(this.state.editMode) ? this.getEditorContent() : this.getGenderContent()}
            </div>
        )
    }
}

export default GenderControl;