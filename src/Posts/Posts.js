import React from 'react';
import $ from 'jquery';
import {withRouter} from 'react-router-dom';
import {MiniButton} from '../MiniButton/MiniButton';
import PostCard from '../PostCard/PostCard';
import AccountStat from '../AccountStat/AccountStat';
import Preloader from '../Preloader/Preloader';
import * as pages from '../internal_pages';
import style from './Posts.module.css';
import {POST_URL} from '../settings';

export function parseLocation(location) {
    let params = new URLSearchParams(location.search);
    return {
        account: params.get('account'),
        search: params.get('search'),
        order: params.get('order')
    }
}

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
            setTimeout(() => this.setState(prevState => ({
                hasLoad: true,
                posts: [...prevState.posts, ...data.results],
                nextPage: data.next
            })), 1000);
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

        let locationParams = parseLocation(location);
        return (
            <div className={style.header_block}>
                <MiniButton buttonType="add" clickHandler={() => history.push(pages.CREATE_POST_PAGE)}/>
                {account.id == locationParams.account ? <AccountStat accountId={account.id}/> : ''}
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
                    {posts.map((post, index) => <PostCard key={index} post={post} account={account}/>)}
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