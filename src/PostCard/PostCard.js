import React from 'react';
import {withRouter} from 'react-router-dom';
import style from './PostCard.module.css';
import {HOST} from '../settings';
import {dateStringForDisplay} from '../account_components/BirthDateControl/BirthDateControl';
import * as pages from '../internal_pages';

class PostCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameShowFlag: false,
            usernameTop: 0,
            usernameLeft: 0
        }
        this.avatarMouseEnterHandler = this.avatarMouseEnterHandler.bind(this);
        this.avatarMouseLeaveHandler = this.avatarMouseLeaveHandler.bind(this);
        this.avatarMouseMoveHandler = this.avatarMouseMoveHandler.bind(this);
    }

    avatarMouseEnterHandler() {
        this.setState({
            usernameShowFlag: true
        });
    }

    avatarMouseLeaveHandler() {
        this.setState({
            usernameShowFlag: false
        });
    }

    avatarMouseMoveHandler(event) {
        this.setState({
            usernameTop: event.clientY + 15,
            usernameLeft: event.clientX + 15
        });
    }

    render() {
        let {post, account, history} = this.props;
        let {avatar, username} = account;
        let textForShow = post.text.split('\n').map((fragment, index) => <p key={index}>{fragment}</p>);
        let {usernameShowFlag, usernameTop, usernameLeft} = this.state;
        let usernameBlockStyle = {top: usernameTop, left: usernameLeft, display: (usernameShowFlag ? 'block' : 'none')};

        return (
            <div className={style.card_container} onClick={() => history.push(pages.MY_POST_PAGE + `/${post.id}`)}>
                <div className={style.username_block} style={usernameBlockStyle}>{username}</div>
                <div className={style.cape}></div>
                <div className={style.header_block}>
                    <div onClick={this.avatarClickHandler}>
                        <img src={avatar === null ? '/images/no_avatar.svg' : `${HOST}${avatar}`}
                             onMouseEnter={this.avatarMouseEnterHandler}
                             onMouseLeave={this.avatarMouseLeaveHandler}
                             onMouseMove={this.avatarMouseMoveHandler}
                        />
                    </div>
                    <div>
                        <p>
                            {dateStringForDisplay(post.dt_created)}
                        </p>
                        <p>
                            {post.title}
                        </p>
                    </div>
                </div>
                <div className={style.text_block}>
                    {textForShow}
                </div>
                <div className={style.stat_block}>
                    <ul>
                        <li><img src="/images/like_blue.svg"/> {post.like_count}</li>
                        <li><img src="/images/comment.svg"/> {post.comment_count}</li>
                    </ul>
                </div>
            </div>
        )
    }

}

export default withRouter(PostCard);