import React from 'react';
import {Link} from "react-router-dom";

import style from './Header.module.css';

class Header extends React.Component {
    render() {
        return (
            <div className={style.header}>
                <div className={style.header_content}>
                    <MenuButton/>
                    <SearchField/>
                    <SignComponent/>
                </div>
            </div>
        )
    }
}


function MenuButton() {
    return (
        <div>
            <Link to="/menu" className={style.special_link}>Кнопка меню</Link>
        </div>
    );
}

function SearchField() {
    return (
        <div>
            <Link to="/search" className={style.special_link}>Поле для поиска</Link>
        </div>
    );
}

function SignComponent() {
    return (
        <div>
            <Link to="/login" className={style.special_link}>Войти или зарегистрироваться</Link>
        </div>
    );
}

export default Header;
