import React from 'react';
import $ from 'jquery';
import style from './PostStat.module.css';
import {POST_STAT_URL} from '../settings';

class PostStat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasLoad: false,
            likeCount: null,
            viewsCount: null,
            commentCount: null
        }
        this.elementEnterHandler = this.elementEnterHandler.bind(this);
        this.elementLeaveHandler = this.elementLeaveHandler.bind(this);
        this.elementMoveHandler = this.elementMoveHandler.bind(this);
    }

    componentDidMount() {
        let {postId} = this.props;
        $.ajax(POST_STAT_URL, {
            data: {post: postId}
        }).then(data => {
            this.setState({
                hasLoad: true,
                likeCount: data['like_count'],
                viewsCount: data['views_count'],
                commentCount: data['comment_count'],
                showHelpTextFlag: false,
                helpText: null,
                hpTop: null,
                hpLeft: null
            })
        });
    }

    elementEnterHandler(event, text) {
        this.setState({
            showHelpTextFlag: true,
            helpText: text,
            hpTop: event.clientY + 15,
            hpLeft: event.clientX + 15
        });
    }

    elementLeaveHandler() {
        this.setState({
            showHelpTextFlag: false
        });
    }

    elementMoveHandler(event) {
        this.setState({
            hpTop: event.clientY + 15,
            hpLeft: event.clientX + 15
        });
    }

    render() {
        let {hasLoad, likeCount, viewsCount, commentCount} = this.state;
        if (!hasLoad) return ''

        let {showHelpTextFlag, helpText, hpTop, hpLeft} = this.state;
        let helpBlockStyle = {top: hpTop, left: hpLeft, display: (showHelpTextFlag ? 'block' : 'none')}
        return (
            <>
                <div className={style.help_text_block} style={helpBlockStyle}>{helpText}</div>
                <ul className={style.stat_container}>
                    <li onMouseEnter={(e) => this.elementEnterHandler(e, 'Количество лайков')}
                        onMouseLeave={this.elementLeaveHandler}
                        onMouseMove={this.elementMoveHandler}>
                        <img src="/images/like_blue.svg"/> {likeCount}
                    </li>
                    <li onMouseEnter={(e) => this.elementEnterHandler(e, 'Количество комментариев')}
                        onMouseLeave={this.elementLeaveHandler}
                        onMouseMove={this.elementMoveHandler}>
                        <img src="/images/comment.svg"/> {commentCount}
                    </li>
                    <li onMouseEnter={(e) => this.elementEnterHandler(e, 'Количество просмотров')}
                        onMouseLeave={this.elementLeaveHandler}
                        onMouseMove={this.elementMoveHandler}>
                        <img src="/images/view.svg"/> {viewsCount}
                    </li>
                </ul>
            </>
        )
    }
}

export default PostStat;