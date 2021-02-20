import React from 'react';
import style from './Comment.module.css';
import {createAvatarURL, dateStringForDisplay, prepareTextForShow} from "../utils";
import {Link} from "react-router-dom";
import * as pages from '../internal_pages';

class Comment extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {comment} = this.props;
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
                        <img src="/images/like_blue.svg"/>
                        {comment['like_count']}
                    </div>
                </div>
            </div>
        )
    }
}

export default Comment;
