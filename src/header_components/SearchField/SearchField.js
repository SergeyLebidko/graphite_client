import React from 'react';
import {withRouter} from 'react-router-dom';
import style from './SearchField.module.css';

class SearchField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.enterPressHandler = this.enterPressHandler.bind(this);
        this.searchButtonClickHandler = this.searchButtonClickHandler.bind(this);
    }

    changeHandler(event) {
        let {value} = event.target;
        this.setState({
            searchText: value
        })
    }

    enterPressHandler(event) {
        if (event.keyCode !== 13) return;
        let {searchButton} = this.refs;
        searchButton.click();
    }

    searchButtonClickHandler() {
        let {searchText} = this.state;

        // Отсекаем заведомо бессмысленные строки поиска - пустую строку и строку из одних пробелов
        if (searchText.length === 0) return;
        if (searchText !== '*' && searchText.replace(/\s+/g, '*') === '*') return;

        // TODO Вставит редирект на страницу с результатами поиска
    }

    render() {
        let {searchText} = this.state;
        return (
            <div className={style.search_block}>
                <input type="text" value={searchText} onChange={this.changeHandler} onKeyUp={this.enterPressHandler}/>
                <span ref="searchButton" onClick={this.searchButtonClickHandler}>
                    <img src="/images/find.svg"/>
                </span>
            </div>
        )
    }
}

export default withRouter(SearchField);