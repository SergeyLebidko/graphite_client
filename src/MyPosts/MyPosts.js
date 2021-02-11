import React from 'react';
import $ from 'jquery';
import {withRouter} from 'react-router-dom';
import {MiniButton} from '../MiniButton/MiniButton';
import {PostCard} from '../PostCard/PostCard';
import AccountStat from '../AccountStat/AccountStat';
import Preloader from '../Preloader/Preloader';
import * as pages from '../internal_pages';
import style from './MyPosts.module.css';
import {POST_URL} from '../settings';

class MyPosts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasLoad: false,
            posts: null
        }
    }

    componentWillMount() {
        let {account} = this.props;
        let token = localStorage.getItem('token');
        $.ajax(POST_URL, {
            headers: {'Authorization': token},
            data: {account: account.id}
        }).then(data => {
            setTimeout(() => this.setState({
                hasLoad: true,
                posts: data.results
            }), 2500);
        })
    }

    getContent() {
        let {hasLoad, posts} = this.state;
        if (!hasLoad) return <div className={style.preloader_block}><Preloader modal={false}/></div>;

        return (
            <>
                {posts.map((post, index) => <PostCard key={index} post={post}/>)}
            </>
        )
    }

    render() {
        let {account} = this.props;
        return (
            <div className={style.my_posts_container}>
                <div className={style.header_block}>
                    <MiniButton buttonType="add" clickHandler={() => this.props.history.push(pages.CREATE_POST_PAGE)}/>
                    <AccountStat account={account}/>
                </div>
                <div className={style.posts_block}>
                    {this.getContent()}
                </div>
            </div>
        )
    }
}

export default withRouter(MyPosts);