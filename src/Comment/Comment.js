import React from 'react';
import style from './Comment.module.css';

class Comment extends React.Component{
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div>
                Здесь будет комментарий
            </div>
        )
    }
}

export default Comment;
