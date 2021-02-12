import React from 'react';
import style from './PostCard.module.css';
import {HOST} from '../settings';
import {dateStringForDisplay} from '../account_components/BirthDateControl/BirthDateControl';

export function PostCard({account, post}) {
    let {avatar} = account;
    let textForShow = [];
    for (let element of post.text.split('\n')) {
        textForShow.push(<p>{element}</p>);
    }
    return (
        <div className={style.card_container}>
            <div className={style.cape}></div>
            <div className={style.header_block}>
                <div>
                    <img src={avatar === null ? '/images/no_avatar.svg' : `${HOST}${avatar}`}/>
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
