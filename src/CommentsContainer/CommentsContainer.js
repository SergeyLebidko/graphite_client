import React from 'react';
import $ from 'jquery';
import style from './CommentsContainer.module.css';
import {COMMENTS_URL} from '../settings';
import Preloader from '../common_components/Preloader/Preloader';
import {MiniButton} from '../common_components/MiniButton/MiniButton';
import Comment from '../Comment/Comment';
import CommentCreator from '../CommentCreator/CommentCreator';

class CommentsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasLoad: false,
            comments: [],
            nextPage: COMMENTS_URL + `?post=${props.postId}`
        }
        this.addCommentHandler = this.addCommentHandler.bind(this);
    }

    downloadData() {
        this.setState({
            hasLoad: false
        });
        let {nextPage} = this.state;
        $.ajax(nextPage).then(data => {
            this.setState(prevState => ({
                hasLoad: true,
                comments: [...prevState.comments, ...data.results.reverse()],
                nextPage: data.next
            }));
        });
    }

    componentDidMount() {
        this.downloadData();
    }

    addCommentHandler(comment) {
        let {statRefreshHandler} = this.props;
        this.setState(prevState => ({
            comments: [...prevState.comments, comment]
        }));
        statRefreshHandler();
    }

    getDownloadButtonBlock() {
        let {hasLoad, nextPage} = this.state;
        if (nextPage !== null) return (
            <div className={style.download_button_block}>
                {hasLoad ?
                    <MiniButton buttonType="download_up" clickHandler={() => this.downloadData()}/>
                    :
                    <Preloader modal={false}/>
                }
            </div>
        );
        if (!hasLoad) return (
            <div className={style.download_button_block}>
                <Preloader modal={false}/>
            </div>
        );
        return '';
    }

    render() {
        let {account, postId} = this.props;
        let {comments} = this.state;
        return (
            <div className={style.comments_container}>
                {this.getDownloadButtonBlock()}
                {comments.length > 0 ? comments.map(comment => <Comment key={comment.id} comment={comment}/>) : ''}
                {account !== null ?
                    <CommentCreator account={account} postId={postId} addCommentHandler={this.addCommentHandler}/>
                    : ''
                }
            </div>
        );
    }
}

export default CommentsContainer;