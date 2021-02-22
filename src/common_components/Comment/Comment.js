import React from 'react';
import $ from 'jquery';
import style from './Comment.module.css';
import {createAvatarURL, dateStringForDisplay, prepareTextForShow} from '../../utils';
import {Link} from 'react-router-dom';
import Like, {COMMENT_LIKE} from '../Like/Like';
import {COMMENTS_URL} from '../../settings';
import * as pages from '../../internal_pages';

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.refreshHandler = this.refreshHandler.bind(this);
        let {comment} = this.props;
        this.state = {
            likeCount: comment['like_count']
        }
    }

    refreshHandler() {
        let {comment} = this.props;
        $.ajax(COMMENTS_URL + comment.id).then(data => {
            this.setState({
                likeCount: data['like_count']
            });
        });
    }

    render() {
        let {comment} = this.props;
        let {likeCount} = this.state;
        return (
            <div className={style.comment_container}>
                <img src={createAvatarURL(comment['account_avatar'])}/>
                <div>
                    <p className={style.username_block}>
                        <Link to={pages.ACCOUNT_PAGE + `/${comment.account}`}>{comment['account_username']}</Link>
                    </p>
                    <p className={style.date_block}>
                        {dateStringForDisplay(comment['dt_created'])}
                    </p>
                    <div className={style.text_block}>
                        {prepareTextForShow(comment.text)}
                    </div>
                    <div className={style.like_count_block}>
                        <Like likeType={COMMENT_LIKE} commentId={comment.id} refreshHandler={this.refreshHandler}/>
                        <span>{likeCount}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Comment;
