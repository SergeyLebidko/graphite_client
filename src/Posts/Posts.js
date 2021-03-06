import React from 'react';
import $ from 'jquery';
import {withRouter} from 'react-router-dom';
import {MiniButton} from '../common_components/MiniButton/MiniButton';
import PostCard from '../common_components/PostCard/PostCard';
import AccountStat from '../common_components/AccountStat/AccountStat';
import Preloader from '../common_components/Preloader/Preloader';
import * as pages from '../internal_pages';
import style from './Posts.module.css';
import {POST_URL} from '../settings';

class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasLoad: false,
            posts: [],
            nextPage: POST_URL + props.location.search
        }
        this.nextButtonHandler = this.nextButtonHandler.bind(this);
    }

    downloadPosts() {
        let {nextPage} = this.state;
        let token = localStorage.getItem('token');
        $.ajax(nextPage, {
            headers: {'Authorization': token},
        }).then(data => {
            this.setState(prevState => ({
                hasLoad: true,
                posts: [...prevState.posts, ...data.results],
                nextPage: data.next
            }));
        })
    }

    componentDidMount() {
        this.downloadPosts();
    }

    nextButtonHandler() {
        this.setState({
            hasLoad: false
        })
        this.downloadPosts();
    }

    getHeaderBlock() {
        let {account, location, history} = this.props;
        if (account === null) return '';

        let accountInURL = new URLSearchParams(location.search).get('account');
        return (
            <div className={style.header_block}>
                <MiniButton buttonType="add" clickHandler={() => history.push(pages.CREATE_POST_PAGE)}/>
                {account.id === +accountInURL ? <AccountStat accountId={account.id}/> : ''}
            </div>
        );
    }

    render() {
        let {account} = this.props;
        let {hasLoad, posts, nextPage} = this.state;
        return (
            <div className={style.my_posts_container}>
                {this.getHeaderBlock()}
                <div className={style.posts_block}>
                    {posts.map(post => <PostCard key={post.id} post={post} account={account}/>)}
                    {hasLoad ? '' : <div className={style.preloader_block}><Preloader modal={false}/></div>}
                </div>
                {hasLoad && nextPage !== null ?
                    (<div className={style.next_button_block}>
                        <MiniButton buttonType="download" clickHandler={this.nextButtonHandler}/>
                    </div>)
                    : ''
                }
            </div>
        )
    }
}

export default withRouter(Posts);