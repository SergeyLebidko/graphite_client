import React from 'react';
import $ from 'jquery';
import {withRouter} from 'react-router-dom';
import {MiniButton} from '../MiniButton/MiniButton';
import AccountStat from '../AccountStat/AccountStat';
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
        let {account} = this.props;
        return (
            <div className={style.my_posts_container}>
                <div className={style.header_block}>
                    <MiniButton buttonType="add" clickHandler={() => this.props.history.push(pages.CREATE_POST_PAGE)}/>
                    <AccountStat account={account}/>
                </div>
                <div></div>
            </div>
        )
    }
}

export default withRouter(MyPosts);