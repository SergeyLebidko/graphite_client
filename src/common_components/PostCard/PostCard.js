import React from 'react';
import {withRouter} from 'react-router-dom';
import PostStat from '../PostStat/PostStat';
import style from './PostCard.module.css';
import {HOST} from '../../settings';
import * as pages from '../../internal_pages';
import {dateStringForDisplay, prepareTextForShow} from '../../utils';

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
        this.avatarClickHandler = this.avatarClickHandler.bind(this);
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

    avatarClickHandler(event){
        event.stopPropagation();
        let {history, post} = this.props;
        history.push(pages.ACCOUNT_PAGE + `/${post.account}`);
    }

    render() {
        let {post, history} = this.props;
        let {account_username, account_avatar} = post;
        let textForShow = prepareTextForShow(post.text);
        let {usernameShowFlag, usernameTop, usernameLeft} = this.state;
        let usernameBlockStyle = {top: usernameTop, left: usernameLeft, display: (usernameShowFlag ? 'block' : 'none')};

        return (
            <div className={style.card_container} onClick={() => history.push(pages.POST_PAGE + `/${post.id}`)}>
                <div className={style.username_block} style={usernameBlockStyle}>{account_username}</div>
                <div className={style.cape}></div>
                <div className={style.header_block}>
                    <div onClick={this.avatarClickHandler}>
                        <img src={account_avatar === null ? '/images/no_avatar.svg' : `${HOST}${account_avatar}`}
                             onMouseEnter={this.avatarMouseEnterHandler}
                             onMouseLeave={this.avatarMouseLeaveHandler}
                             onMouseMove={this.avatarMouseMoveHandler}
                        />
                    </div>
                    <div>
                        <p>
                            {dateStringForDisplay(post['dt_created'])}
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
                    <PostStat postId={post.id}/>
                </div>
            </div>
        )
    }

}

export default withRouter(PostCard);