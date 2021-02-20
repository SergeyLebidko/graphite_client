import React from 'react';
import $ from 'jquery';
import NoMatch from '../common_components/NoMatch/NoMatch';
import PostRemover from '../PostRemover/PostRemover';
import PostStat from '../PostStat/PostStat';
import Preloader from '../common_components/Preloader/Preloader';
import {withRouter, Link} from 'react-router-dom';
import style from './Post.module.css'
import * as pages from '../internal_pages';
import {POST_URL} from '../settings';
import {dateStringForDisplay, prepareTextForShow, createAvatarURL} from '../utils';
import CommentsContainer from "../CommentsContainer/CommentsContainer";

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasPostLoad: false,
            post: null,
            notFoundFlag: false
        }
    }

    downloadData(postId) {
        $.ajax(POST_URL + postId + '/').then(data => {
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
        let {notFoundFlag, hasPostLoad, post} = this.state;
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
                        <img src={createAvatarURL(post['account_avatar'])}/>
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
                            <PostStat postId={post.id}/>
                        </div>
                    </div>
                </div>
                <CommentsContainer post={post} account={account}/>
            </>
        );
    }
}

export default withRouter(Post);