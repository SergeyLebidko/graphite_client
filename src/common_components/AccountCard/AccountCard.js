import React from 'react';
import {withRouter} from 'react-router-dom';
import AccountStat from '../AccountStat/AccountStat';
import style from './AccountCard.module.css';
import * as pages from '../../internal_pages';
import {createAvatarURL} from "../../utils";

const AccountCard = props => {
    let {account, history} = props;
    let {id, avatar, username} = account;
    let avatarURL = createAvatarURL(avatar);

    function clickHandler() {
        history.push(pages.ACCOUNT_PAGE + `/${id}`);
    }

    return (
        <div className={style.card_container} style={{backgroundImage: `url(${avatarURL})`}} onClick={clickHandler}>
            <div className={style.basic_data_block}>
                <p>
                    {username}
                </p>
                <AccountStat accountId={id}/>
            </div>
        </div>
    )
}

export default withRouter(AccountCard);
