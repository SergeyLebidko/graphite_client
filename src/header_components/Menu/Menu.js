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
        let {hasOpenMenu} = this.props;
        let targetClasses = `${style.menu} ${hasOpenMenu ? style.opened_menu : style.closed_menu}`;
        return (
            <div className={targetClasses} onClick={this.props.hideMenuHandler}>
                <div>
                    <p>Посты</p>
                    <ul>
                        <li>Пункт 1</li>
                        <li>Пункт 2</li>
                        <li>Пункт 3</li>
                        <li>Пункт 4</li>
                    </ul>
                </div>
                <div>
                    <p>Авторы</p>
                    <ul>
                        <li>Пункт 1</li>
                        <li>Пункт 2</li>
                        <li>Пункт 3</li>
                        <li>Пункт 4</li>
                    </ul>
                </div>
                {(this.props.hasLogin) ? (
                    <div>
                        <p>Мой Graphite</p>
                        <ul>
                            <li>
                                <Link to={pages.CREATE_POST_PAGE}>Добавить пост</Link>
                            </li>
                            <li>
                                <Link to={pages.MY_POSTS_PAGE}>Мои посты</Link>
                            </li>
                            <li>
                                <Link to={pages.ACCOUNT_PAGE}>Мой аккаунт</Link>
                            </li>
                            <li onClick={this.logoutButtonHandler}>Выход</li>
                        </ul>
                    </div>
                ) : null}
            </div>
        );
    }
}

export default Menu;