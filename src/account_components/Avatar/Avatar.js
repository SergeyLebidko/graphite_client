import React from 'react';
import style from './Avatar.module.css';

class Avatar extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        let avatarURL = this.props.account.avatar;
        return (
            <div className={style.avatar_container}>
                <img src={(avatarURL === null) ? '/images/no_avatar.svg': avatarURL}/>
            </div>
        );
    }
}

export default Avatar;