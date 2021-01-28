import React from 'react';
import $ from 'jquery';
import style from './Menu.module.css';
import {LOGOUT_URL} from '../../settings';

class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.logoutButtonHandler = this.logoutButtonHandler.bind(this);
    }

    closeMenu(event) {
        if (event.target.tagName === 'LI') $('#menu_button').trigger('click');
    }

    logoutButtonHandler() {
        let token = localStorage.getItem('token');
        $.ajax(LOGOUT_URL, {
            headers: {'Authorization': token}
        }).then(() => {
            this.props.accountLogoutHandler();
        });
    }

    render() {
        return (
            <div className={style.menu} id="menu" onClick={this.closeMenu}>
                <div>
                    <p>Посты</p>
                    <ul>
                        <li>Последние обновления</li>
                        <li>Самые читаемые</li>
                        <li>Урожай лайков</li>
                        <li>Оживленное обсуждение</li>
                    </ul>
                </div>
                <div>
                    <p>Авторы</p>
                    <ul>
                        <li>Новички</li>
                        <li>Самые читаемые</li>
                        <li>Урожай лайков</li>
                        <li>Оживленное обсуждение</li>
                    </ul>
                </div>
                {(this.props.hasLogin) ? (
                    <div>
                        <p>Мой Graphite</p>
                        <ul>
                            <li>Добавить пост</li>
                            <li>Мои посты</li>
                            <li>Моя страница</li>
                            <li onClick={this.logoutButtonHandler}>Выход</li>
                        </ul>
                    </div>
                ) : null}
            </div>
        );
    }
}

export default Menu;