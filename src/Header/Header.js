import React from 'react';
import $ from 'jquery';

import style from './Header.module.css';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasOpenMenu: false
        }

        this.menuButtonClickHandler = this.menuButtonClickHandler.bind(this);
    }

    menuButtonClickHandler() {
        let topPosition;
        if (this.state.hasOpenMenu) {
            topPosition = '-190px';
        } else {
            topPosition = '50px';
        }
        $('#menu').animate({top: topPosition}, 'normal');
        this.setState(prevState => {
            return {hasOpenMenu: !prevState.hasOpenMenu}
        });
    }

    render() {
        return (
            <>
                <div className={style.header}>
                    <div className={style.header_content}>
                        <MenuButton clickHandler={this.menuButtonClickHandler} hasOpenMenu={this.state.hasOpenMenu}/>
                        <SearchField/>
                        <SignComponent account={this.props.account}/>
                    </div>
                </div>
                <Menu/>
            </>
        )
    }
}


function MenuButton(props) {
    let inlineStyle = {};
    if (props.hasOpenMenu) {
        inlineStyle = {
            backgroundImage: 'linear-gradient(to right bottom, limegreen, forestgreen)',
            color: 'white'
        }
    }
    return (
        <div className={style.menu_button} style={inlineStyle} onClick={props.clickHandler}>G</div>
    );
}

function Menu() {
    return (
        <div className={style.menu} id="menu">
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
            <div>
                <p>Мой Graphite</p>
                <ul>
                    <li>Добавить пост</li>
                    <li>Мои посты</li>
                    <li>Моя страница</li>
                    <li>Выход</li>
                </ul>
            </div>
        </div>
    );
}

class SearchField extends React.Component {
    render() {
        return (
            <div className={style.search_block}>
                <input type="text"/>
                <span><p>Найти</p></span>
            </div>
        )
    }
}


function SignComponent(props) {
    if (props.account !== null) {
        let avatarURL = props.account.avatar;
        return (
            <div className={style.no_avatar}>
                <img src={(avatarURL == null) ? '/images/no_avatar.svg' : avatarURL}/>
            </div>
        )
    }
    return (
        <div></div>
    )
}

export default Header;
