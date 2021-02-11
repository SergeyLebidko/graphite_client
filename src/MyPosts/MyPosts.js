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
            posts: [],
            nextPage: POST_URL
        }
        this.nextButtonHandler = this.nextButtonHandler.bind(this);
    }

    downloadPosts() {
        let {account} = this.props;
        let {nextPage} = this.state;
        let token = localStorage.getItem('token');
        $.ajax(nextPage, {
            headers: {'Authorization': token},
            data: {account: account.id}
        }).then(data => {
            console.log(data);
            setTimeout(() => this.setState(prevState => ({
                hasLoad: true,
                posts: [...prevState.posts, ...data.results],
                nextPage: data.next
            })), 2500);
        })
    }

    componentWillMount() {
        this.downloadPosts();
    }

    nextButtonHandler() {
        this.setState({
            hasLoad: false
        })
        this.downloadPosts();
    }

    render() {
        let {account, history} = this.props;
        let {hasLoad, posts, nextPage} = this.state;
        return (
            <div className={style.my_posts_container}>
                <div className={style.header_block}>
                    <MiniButton buttonType="add" clickHandler={() => history.push(pages.CREATE_POST_PAGE)}/>
                    <AccountStat account={account}/>
                </div>
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

export default withRouter(MyPosts);