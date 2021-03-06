import React from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import style from './Menu.module.css';
import {LOGOUT_URL} from '../../settings';
import * as pages from '../../internal_pages';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.logoutButtonHandler = this.logoutButtonHandler.bind(this);
    }

    logoutButtonHandler() {
        let token = localStorage.getItem('token');
        $.ajax(LOGOUT_URL, {
            headers: {'Authorization': token}
        }).always(() => {
            this.props.accountLogoutHandler();
        });
    }

    render() {
        let {hasOpenMenu, account} = this.props;
        let targetClasses = `${style.menu} ${hasOpenMenu ? style.opened_menu : style.closed_menu}`;
        return (
            <div className={targetClasses} onClick={this.props.hideMenuHandler}>
                <div>
                    <p>Посты</p>
                    <ul>
                        <li>
                            <Link to={pages.POSTS_PAGE}>Последние обновления</Link>
                        </li>
                        <li>
                            <Link to={pages.POSTS_PAGE + '/?order=views'}>Больше всех просмотров</Link>
                        </li>
                        <li>
                            <Link to={pages.POSTS_PAGE + '/?order=likes'}>Урожай лайков</Link>
                        </li>
                        <li>
                            <Link to={pages.POSTS_PAGE + '/?order=comments'}>Самые обсуждаемые</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <p>Авторы</p>
                    <ul>
                        <li>
                            <Link to={pages.ACCOUNTS_PAGE}>Вновь прибывшие</Link>
                        </li>
                        <li>
                            <Link to={pages.ACCOUNTS_PAGE + '/?order=views'}>Самые читаемые</Link>
                        </li>
                        <li>
                            <Link to={pages.ACCOUNTS_PAGE + '/?order=likes'}>Урожай лайков</Link>
                        </li>
                        <li>
                            <Link to={pages.ACCOUNTS_PAGE + '/?order=comments'}>Самые обсуждаемые</Link>
                        </li>
                    </ul>
                </div>
                {(account !== null) ? (
                    <div>
                        <p>Мой Graphite</p>
                        <ul>
                            <li>
                                <Link to={pages.CREATE_POST_PAGE}>Добавить пост</Link>
                            </li>
                            <li>
                                <Link to={pages.POSTS_PAGE + `/?account=${account.id}`}>Мои посты</Link>
                            </li>
                            <li>
                                <Link to={pages.ACCOUNT_PAGE + `/${account.id}`}>Мой аккаунт</Link>
                            </li>
                            <li onClick={this.logoutButtonHandler}>
                                <Link to={pages.MAIN_PAGE}>Выход</Link>
                            </li>
                        </ul>
                    </div>
                ) : null}
            </div>
        );
    }
}

export default Menu;