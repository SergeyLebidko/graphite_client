import React from 'react';
import $ from 'jquery';
import style from './AcountStat.module.css'
import {ACCOUNT_STAT_URL} from '../../settings';

class AccountStat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasLoad: false,
            postCount: null,
            likeCount: null,
            commentCount: null,
            totalViewsCount: null
        }
    }

    componentDidMount() {
        let {accountId} = this.props;
        $.ajax(ACCOUNT_STAT_URL + `?account=${accountId}`).then(data => {
            this.setState({
                hasLoad: true,
                postCount: data['post_count'],
                likeCount: data['like_count'],
                commentCount: data['comment_count'],
                totalViewsCount: data['total_views_count']
            })
        });
    }

    getLoadCap() {
        return <span>...пожалуйста подождите...</span>
    }

    getStatContent() {
        let {postCount, likeCount, commentCount, totalViewsCount} = this.state;
        return (
            <ul className={style.stat_items_block}>
                <li><img src="/images/post.svg"/> {postCount}</li>
                <li><img src="/images/like_blue.svg"/> {likeCount}</li>
                <li><img src="/images/comment.svg"/> {commentCount}</li>
                <li><img src="/images/view.svg"/> {totalViewsCount}</li>
            </ul>
        )
    }

    render() {
        let {hasLoad} = this.state;
        return (
            <div className={style.account_stat_container}>
                {hasLoad ? this.getStatContent() : this.getLoadCap()}
            </div>
        )
    }
}

export default AccountStat;