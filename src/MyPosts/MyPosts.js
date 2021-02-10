import React from 'react';
import $ from 'jquery';
import {MiniButton} from '../MiniButton/MiniButton';
import * as pages from '../internal_pages';
import style from './MyPosts.module.css';

class MyPosts extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log('Мои посты');
    }

    render() {
        return (
            <div>
                <div>
                    <MiniButton buttonType="add" clickHandler={() => this.props.history.push(pages.CREATE_POST_PAGE)}/>
                    <span>Статистика аккаунта</span>
                </div>
                <div>Список постов</div>
            </div>
        )
    }
}

export default MyPosts;