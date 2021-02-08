import React from 'react';
import $ from 'jquery';
import style from './Avatar.module.css';
import PopUpMessage from '../../PopUpMessage/PopUpMessage';
import {UPDATE_ACCOUNT_URL, HOST} from '../../settings';

class Avatar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: this.props.account.avatar,
            error: null
        }

        this.fileChoiceHandler = this.fileChoiceHandler.bind(this);
        this.avatarClickHandler = this.avatarClickHandler.bind(this);
    }

    avatarClickHandler() {
        $('#avatar_chooser').trigger('click');
    }

    fileChoiceHandler(event) {
        let filePath = event.target.value;
        if (!/(.jpg|.JPG|.jpeg|.JPEG)$/.test(filePath)) {
            this.setState({error: 'Допустимы изображения только в формате jpg'});
            return;
        }

        this.setState({error: null});

        let token = localStorage.getItem('token');
        let formData = new FormData();
        formData.append("avatar", event.target.files[0]);
        $.ajax(UPDATE_ACCOUNT_URL, {
            method: "PATCH",
            headers: {
                'Authorization': token
            },
            data: formData,
            processData: false,
            contentType: false
        }).then(data => {
            this.props.refreshAccount(data);
            this.setState({
                avatar: data.avatar
            })
        });
    }

    render() {
        let {avatar, error} = this.state;
        return (
            <div className={style.avatar_container}>
                <img src={(avatar === null) ? '/images/no_avatar.svg' : `${HOST}${avatar}`}
                     onClick={this.avatarClickHandler}/>
                <PopUpMessage msg={error} msgType="error" endShow={() => this.setState({error: null})}/>
                <input type="file" style={{display: 'none'}} onChange={this.fileChoiceHandler} id="avatar_chooser"/>
            </div>
        );
    }
}

export default Avatar;