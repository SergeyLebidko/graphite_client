import React from 'react';
import $ from 'jquery';
import NoMatch from '../common_components/NoMatch/NoMatch';
import PostRemover from '../common_components/PostRemover/PostRemover';
import PostStat from '../common_components/PostStat/PostStat';
import Preloader from '../common_components/Preloader/Preloader';
import {withRouter, Link} from 'react-router-dom';
import style from './Post.module.css'
import * as pages from '../internal_pages';
import {POST_URL} from '../settings';
import {dateStringForDisplay, prepareTextForShow, createAvatarURL} from '../utils';
import CommentsContainer from "../common_components/CommentsContainer/CommentsContainer";

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasPostLoad: false,
            post: null,
            notFoundFlag: false,
            statKey: Math.random()
        }
        this.refreshStat = this.refreshStat.bind(this);
    }

    refreshStat() {
        this.setState({
            statKey: Math.random()
        });
    }

    downloadData(postId) {
        let token = localStorage.getItem('token');
        let headers = token === null ? {} : {'Authorization': token};

        $.ajax(POST_URL + postId + '/', {
            headers
        }).then(data => {
            this.setState({
                hasPostLoad: true,
                post: data
            });
        }).catch(() => {
            this.setState({
                notFoundFlag: true
            });
        });
    }

    componentWillMount() {
        let {match} = this.props;
        let postId = match.params.id;
        this.downloadData(postId);
    }

    render() {
        let {account} = this.props;
        let {notFoundFlag, hasPostLoad, post, statKey} = this.state;
        if (notFoundFlag) return <NoMatch/>;
        if (!hasPostLoad) return (
            <div className={style.preloader_container}>
                <Preloader modal={false}/>
            </div>
        );

        return (
            <>
                <div className={style.post_container}>
                    <div className={style.account_container}>
                        <img src={createAvatarURL(post['account_avatar'])} alt="Аватар автора"/>
                        <p>
                            <Link to={pages.ACCOUNT_PAGE + `/${post.account}`}> {post['account_username']}</Link>
                            <Link to={pages.POSTS_PAGE + `/?account=${post.account}`}>все посты этого автора</Link>
                        </p>
                    </div>
                    <div>
                        <p className={style.text_header_container}>
                            {post.title}
                            <span>{dateStringForDisplay(post['dt_created'])}</span>
                        </p>
                        {account !== null && account.id === post.account ?
                            <div className={style.post_control_container}>
                                <PostRemover post={post}/>
                            </div>
                            : ''
                        }
                        <div className={style.text_body_container}>
                            {prepareTextForShow(post.text)}
                        </div>
                        <div className={style.stat_container}>
                            <PostStat key={statKey} postId={post.id}/>
                        </div>
                    </div>
                </div>
                <CommentsContainer postId={post.id} account={account} statRefreshHandler={this.refreshStat}/>
            </>
        );
    }
}

export default withRouter(Post);