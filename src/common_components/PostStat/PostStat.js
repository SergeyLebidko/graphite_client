import React from 'react';
import $ from 'jquery';
import style from './PostStat.module.css';
import {POST_STAT_URL} from '../../settings';
import PostLike from '../PostLike/PostLike';

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
        this.refreshHandler = this.refreshHandler.bind(this);
    }

    downloadData() {
        this.setState({hasLoad: false});

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

    componentDidMount() {
        this.downloadData();
    }

    refreshHandler(){
        this.downloadData();
    }

    elementEnterHandler(event, text) {
        this.setState({
            showHelpTextFlag: true,
            helpText: text,
            hpTop: event.clientY + 30,
            hpLeft: event.clientX - 15
        });
    }

    elementLeaveHandler() {
        this.setState({
            showHelpTextFlag: false
        });
    }

    elementMoveHandler(event) {
        this.setState({
            hpTop: event.clientY + 30,
            hpLeft: event.clientX - 15
        });
    }

    render() {
        let {hasLoad, likeCount, viewsCount, commentCount} = this.state;

        let {showHelpTextFlag, helpText, hpTop, hpLeft} = this.state;
        let helpBlockStyle = {
            top: hpTop,
            left: hpLeft,
            display: (showHelpTextFlag ? 'block' : 'none'),
            zIndex: (showHelpTextFlag ? 10 : 0)
        }
        return (
            <>
                <div className={style.help_text_block} style={helpBlockStyle}>{helpText}</div>
                <ul className={style.stat_container}>
                    <li onMouseEnter={(e) => this.elementEnterHandler(e, 'Количество лайков')}
                        onMouseLeave={this.elementLeaveHandler}
                        onMouseMove={this.elementMoveHandler}>
                        <PostLike postId={this.props.postId} refreshHandler={this.refreshHandler}/>
                        {hasLoad ? likeCount : '...'}
                    </li>
                    <li onMouseEnter={(e) => this.elementEnterHandler(e, 'Количество комментариев')}
                        onMouseLeave={this.elementLeaveHandler}
                        onMouseMove={this.elementMoveHandler}>
                        <img src="/images/comment.svg"/>
                        {hasLoad ? commentCount : '...'}
                    </li>
                    <li onMouseEnter={(e) => this.elementEnterHandler(e, 'Количество просмотров')}
                        onMouseLeave={this.elementLeaveHandler}
                        onMouseMove={this.elementMoveHandler}>
                        <img src="/images/view.svg"/>
                        {hasLoad ? viewsCount : '...'}
                    </li>
                </ul>
            </>
        )
    }
}

export default PostStat;