import React from 'react';
import style from './SearchField.module.css';

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

export default SearchField;