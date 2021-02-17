import React from 'react';
import {Link} from 'react-router-dom';
import {createAvatarURL} from '../account_components/AvatarControl/AvatarControl';
import AccountStat from '../AccountStat/AccountStat';
import style from './AccountCard.module.css';
import * as pages from '../internal_pages';

export const AccountCard = props => {
    let {account} = props;
    let {id, avatar, username} = account;
    let avatarURL = createAvatarURL(avatar);
    return (
        <div className={style.card_container} style={{backgroundImage: `url(${avatarURL})`}}>
            <div className={style.basic_data_block}>
                <p>
                    <Link to={pages.ACCOUNT_PAGE + `/${id}`}>{username}</Link>
                </p>
                <AccountStat accountId={id}/>
            </div>
        </div>
    )
}
