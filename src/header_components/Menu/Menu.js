import React from 'react';
import $ from 'jquery';
import style from './Menu.module.css';
import {LOGOUT_URL} from '../../settings';

class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.logoutButtonHandler = this.logoutButtonHandler.bind(this);
        this.accountButtonHandler = this.accountButtonHandler.bind(this);
    }

    closeMenu(event) {
        if (event.target.tagName === 'LI') $('#menu_button').trigger('click');
    }

    logoutButtonHandler() {
        let token = localStorage.getItem('token');
        $.ajax(LOGOUT_URL, {
            headers: {'Authorization': token}
        }).always(() => {
            this.props.accountLogoutHandler();
        });
    }

    accountButtonHandler() {
        this.props.history.push('/account');
    }

    render() {
        return (
            <div className={style.menu} id="menu" onClick={this.closeMenu}>
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
                            <li>Добавить пост</li>
                            <li>Мои посты</li>
                            <li onClick={this.accountButtonHandler}>Моя страница</li>
                            <li onClick={this.logoutButtonHandler}>Выход</li>
                        </ul>
                    </div>
                ) : null}
            </div>
        );
    }
}

export default Menu;