import React from 'react';
import {withRouter} from 'react-router-dom';
import {parseLocation} from '../../Posts/Posts';
import style from './SearchField.module.css';
import * as pages from '../../internal_pages';

import $ from 'jquery';

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
        let {location, history} = this.props;
        let {searchText} = this.state;
        let urlParams = parseLocation(location);
        urlParams.q = searchText;
        urlParams = $.param(urlParams);

        if (location.pathname.indexOf(pages.ACCOUNTS_PAGE) === 0) {
            history.push(pages.ACCOUNTS_PAGE + `/?${urlParams}`);
            return;
        }
        history.push(pages.POSTS_PAGE + `/?${urlParams}`);
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