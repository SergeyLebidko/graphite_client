import React from 'react';
import $ from 'jquery';
import {POST_LIKE_URL} from '../../settings';

class PostLike extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            likeURL: '/images/like_blue.svg'
        }
    }

    downloadData(hasClick) {
        let token = localStorage.getItem('token');
        if (token === null) return;

        let {postId, refreshHandler} = this.props;
        $.ajax(POST_LIKE_URL, {
            method: hasClick ? 'post' : 'get',
            headers: {'Authorization': token},
            data: {post: postId}
        }).then(data => {
            let {exists} = data;
            if (exists) {
                this.setState({likeURL: '/images/like_red.svg'});
            } else {
                this.setState({likeURL: '/images/like_blue_empty.svg'});
            }
            if (hasClick) refreshHandler();
        });
    }

    componentDidMount() {
        this.downloadData(false);
    }

    render() {
        let {likeURL} = this.state;
        return <img src={likeURL} onClick={event => {
            event.stopPropagation();
            this.downloadData(true);
        }}/>;
    }
}

export default PostLike;