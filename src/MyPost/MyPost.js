import React from 'react';
import $ from 'jquery';
import {withRouter} from 'react-router-dom';
import style from './MyPost.module.css'
import {POST_URL} from '../settings';

class MyPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: null
        }
    }

    downloadData(postId) {
        let token = localStorage.getItem('token');
        $.ajax(POST_URL + postId + '/', {
            headers: {'Authorization': token}
        }).then(data => {
            console.log(data);
        }).catch(error => {
            console.log(error);
        });
    }

    componentWillReceiveProps(nextProps) {
        let {match} = nextProps;
        let postId = match.params.id;
        this.downloadData(postId);
    }

    componentWillMount() {
        let {match} = this.props;
        let postId = match.params.id;
        this.downloadData(postId);
    }

    render() {
        return (
            <div>Здесь будет просмотр поста {this.props.match.params.id}</div>
        )
    }
}

export default withRouter(MyPost);