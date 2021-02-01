import React from 'react';
import $ from 'jquery';
import style from './Avatar.module.css';
import {UPDATE_ACCOUNT_URL, HOST} from '../../settings';

class Avatar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: this.props.account.avatar,
            formatError: false
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
            this.setState({
                formatError: true
            });
            return;
        }

        this.setState({
            formatError: false
        });

        let token = localStorage.getItem('token');
        let formData = new FormData();
        formData.append("avatar", event.target.files[0]);
        $.ajax(UPDATE_ACCOUNT_URL, {
            method: "PATCH",
            headers: {
                'Authorization': token
            },
            dataType: "json",
            data: formData,
            processData: false,
            contentType: false
        }).then(data => {
            console.log(data);
            this.props.refreshAccount(data);
            this.setState({
                avatar: data.avatar
            })
        });
    }

    render() {
        let avatar = this.state.avatar;
        return (
            <div className={style.avatar_container}>
                <img src={(avatar === null) ? '/images/no_avatar.svg' : `${HOST}${avatar}`}
                     onClick={this.avatarClickHandler}/>
                {(this.state.formatError) ? <div>Допустимы только изображения в формате jpg</div> : null}
                <input type="file" style={{display: 'none'}} onChange={this.fileChoiceHandler} id="avatar_chooser"/>
            </div>
        );
    }
}

export default Avatar;