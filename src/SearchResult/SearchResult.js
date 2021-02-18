import React from 'react';
import {withRouter} from 'react-router-dom';
import $ from 'jquery';
import style from './SearchResult.module.css';
import {ACCOUNT_URL, POST_URL} from "../settings";

class SearchResult extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>Здесь будут результаты поиска</div>
        )
    }
}

export default withRouter(SearchResult);