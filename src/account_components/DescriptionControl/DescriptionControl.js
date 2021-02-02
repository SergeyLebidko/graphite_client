import React from 'react';
import $ from 'jquery';
import style from './DescriptionControl.module.css';
import {MiniButton} from '../../MiniButton/MiniButton';
import {UPDATE_ACCOUNT_URL, ACCOUNT_DESCRIPTION_MAX_LEN} from '../../settings';

class DescriptionControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            description: props.account.description
        }

        this.descriptionClickHandler = this.descriptionClickHandler.bind(this);
        this.okClickHandler = this.cancelClickHandler.bind(this);
        this.cancelClickHandler = this.cancelClickHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
    }

    getDescriptionContent() {
        let content = this.state.description.split('\n');
        if (this.state.description === '') return
        return (<div className={style.description_container}>
            {content.map((value, index) => <p key={index}>{value}</p>)}
        </div>);
    }

    getEditorContent() {
        return (
            <div className={style.editor_container}>
                <div>
                    <textarea rows={10} value={this.state.description} onChange={this.changeDescriptionHandler}/>
                </div>
                <div>
                    <MiniButton buttonType="ok" clickHandler={this.okClickHandler}/>
                    <MiniButton buttonType="cancel" clickHandler={this.cancelClickHandler}/>
                </div>
            </div>
        );
    }

    descriptionClickHandler() {
        this.setState({
            editMode: true
        })
    }

    changeDescriptionHandler(event) {
        let value = event.target.value;
        if (value.length > ACCOUNT_DESCRIPTION_MAX_LEN) return;
        this.setState({
            description: value
        })
    }

    okClickHandler() {
        let token = localStorage.getItem('token');
        $.ajax(UPDATE_ACCOUNT_URL, {
            method: 'PATCH',
            headers: {
                'Authorization': token
            },
            data: {
                description: this.state.description
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
        })
    }

    render() {
        return (
            <div className={style.control_container}>
                <p style={this.state.description === '' ? {} : {borderBottom: '1px dotted dimgray'}}
                   onClick={this.descriptionClickHandler}>
                    Немного о себе:
                    {this.state.editMode ? `(осталось ${ACCOUNT_DESCRIPTION_MAX_LEN - this.state.description.length})` : null}
                </p>
                {(this.state.editMode) ? this.getEditorContent() : this.getDescriptionContent()}
            </div>
        )
    }
}

export default DescriptionControl;
