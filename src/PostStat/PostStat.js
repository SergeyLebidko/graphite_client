import React from 'react';
import $ from 'jquery';
import style from './PostStat.module.css';
import {POST_STAT_URL} from '../settings';

class PostStat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasLoad: false,
            likeCount: null,
            viewsCount: null,
            commentCount: null
        }
    }

    componentDidMount() {
        let {postId} = this.props;
        $.ajax(POST_STAT_URL, {
            data: {post: postId}
        }).then(data => {
            this.setState({
                hasLoad: true,
                likeCount: data['like_count'],
                viewsCount: data['views_count'],
                commentCount: data['comment_count']
            })
        });
    }

    render() {
        let {hasLoad, likeCount, viewsCount, commentCount} = this.state;
        if (!hasLoad) return ''

        return (
            <ul className={style.stat_container}>
                <li><img src="/images/like_blue.svg"/> {likeCount}</li>
                <li><img src="/images/comment.svg"/> {commentCount}</li>
                <li><img src="/images/view.svg"/> {viewsCount}</li>
            </ul>
        )
    }
}

export default PostStat;