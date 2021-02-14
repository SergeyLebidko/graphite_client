import React from 'react';
import $ from 'jquery';
import NoMatch from '../NoMatch/NoMatch';
import PostRemover from '../PostRemover/PostRemover';
import {withRouter} from 'react-router-dom';
import {prepareTextForShow} from '../PostCard/PostCard';
import {dateStringForDisplay} from '../account_components/BirthDateControl/BirthDateControl';
import style from './Post.module.css'
import {POST_URL, ACCOUNT_URL, HOST} from '../settings';

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasPostLoad: false,
            hasPostAccountLoad: false,
            post: null,
            postAccount: null,
            notFoundFlag: false
        }
    }

    downloadData(postId) {
        let token = localStorage.getItem('token');
        $.ajax(POST_URL + postId + '/', {
            headers: {'Authorization': token}
        }).then(data => {
            this.setState({
                hasPostLoad: true,
                post: data
            });
            return $.ajax(ACCOUNT_URL + data.account + '/');
        }).then(data => {
            this.setState({
                hasPostAccountLoad: true,
                postAccount: data
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
        let {notFoundFlag, hasPostLoad, hasPostAccountLoad, post, postAccount} = this.state;
        if (notFoundFlag) return <NoMatch/>;

        return (
            <div className={style.post_container}>
                {hasPostAccountLoad ?
                    <div className={style.account_container}>
                        <img src={postAccount.avatar === null ? '/images/no_avatar.svg' : postAccount.avatar}/>
                        <p>
                            {postAccount.username}
                        </p>
                    </div>
                    : ''
                }
                {hasPostLoad ?
                    <div>
                        <p className={style.text_header_container}>
                            {post.title}
                            <span>{dateStringForDisplay(post.dt_created)}</span>
                        </p>
                        {hasPostAccountLoad && this.props.account !== null && postAccount.id === this.props.account.id ?
                            <div className={style.post_control_container}>
                                <PostRemover post={post}/>
                            </div>
                            : ''
                        }
                        <div className={style.text_body_container}>
                            {prepareTextForShow(post.text)}
                        </div>
                    </div>
                    : ''
                }
            </div>
        )
    }
}

export default withRouter(Post);