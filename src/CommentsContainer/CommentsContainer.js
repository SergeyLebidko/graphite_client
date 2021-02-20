import React from 'react';
import style from './CommentsContainer.module.css';
import {COMMENTS_URL} from '../settings';

class CommentsContainer extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className={style.comments_container}>
                Здесь будут комментарии
            </div>
        );
    }
}

export default CommentsContainer;