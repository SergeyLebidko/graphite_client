import React from 'react';
import $ from 'jquery';
import style from './AcountStat.module.css'
import {ACCOUNT_STAT_URL} from '../settings';

class AccountStat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasLoad: false,
            postCount: null,
            likeCount: null,
            commentCount: null
        }
    }

    componentWillMount() {
        let token = localStorage.getItem('token');
        $.ajax(ACCOUNT_STAT_URL, {
            headers: {'Authorization': token}
        }).then(data => {
            setTimeout(() => {
                this.setState({
                    hasLoad: true,
                    postCount: data['post_count'],
                    likeCount: data['like_count'],
                    commentCount: data['comment_count']
                })
            }, 1000);
        });
    }

    getLoadCap() {
        return <span>...пожалуйста подождите...</span>
    }

    getStatContent() {
        let {postCount, likeCount, commentCount} = this.state;
        return (
            <ul>
                <li>Постов: {postCount}</li>
                <li>Лайков: {likeCount}</li>
                <li>Комментариев: {commentCount}</li>
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