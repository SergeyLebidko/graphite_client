import React from 'react';
import $ from 'jquery';
import {POST_LIKE_URL, COMMENT_LIKE_URL} from '../../settings';

export const POST_LIKE = 'post_like';
export const COMMENT_LIKE = 'comment_like';

class Like extends React.Component {
    constructor(props) {
        super(props);

        let apiURL;
        apiURL = {[POST_LIKE]: POST_LIKE_URL, [COMMENT_LIKE]: COMMENT_LIKE_URL}[props.likeType];
        this.state = {
            apiURL,
            likeURL: '/images/like_blue.svg'
        }
    }

    downloadData(hasClick) {
        let token = localStorage.getItem('token');
        if (token === null) return;

        let {postId, commentId, likeType, refreshHandler} = this.props;
        let {apiURL} = this.state;
        let data = {
            [POST_LIKE]: {'post': postId},
            [COMMENT_LIKE]: {'comment': commentId}
        }[likeType];
        $.ajax(apiURL, {
            method: hasClick ? 'post' : 'get',
            headers: {'Authorization': token},
            data
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
        return <img src={likeURL} alt="Лайк" onClick={event => {
            event.stopPropagation();
            this.downloadData(true);
        }}/>;
    }
}

export default Like;