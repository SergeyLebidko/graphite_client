import React from 'react';
import {withRouter} from 'react-router-dom';
import style from './MyPost.module.css'

class MyPost extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>Здесь будет просмотр поста {this.props.match.params.id}</div>
        )
    }
}

export default withRouter(MyPost);