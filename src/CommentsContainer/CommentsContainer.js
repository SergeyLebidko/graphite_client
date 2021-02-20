import React from 'react';
import $ from 'jquery';
import style from './CommentsContainer.module.css';
import {COMMENTS_URL} from '../settings';
import Preloader from '../common_components/Preloader/Preloader';
import {MiniButton} from '../common_components/MiniButton/MiniButton';
import Comment from "../Comment/Comment";

class CommentsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasLoad: false,
            comments: [],
            nextPage: COMMENTS_URL + `?post=${props.postId}`
        }
    }

    downloadData() {
        this.setState({
            hasLoad: false
        });
        let {nextPage} = this.state;
        $.ajax(nextPage).then(data => {
            this.setState(prevState => ({
                hasLoad: true,
                comments: [...prevState, ...data.results.reverse()],
                nextPage: prevState.next
            }));
        });
    }

    componentDidMount() {
        this.downloadData();
    }

    getDownloadButtonBlock() {
        let {nextPage} = this.state;
        if (nextPage !== null) return (
            <div>
                <MiniButton buttonType="download_up" clickHandler={() => this.downloadData()}/>
            </div>
        );
        return '';
    }

    getCommentsList() {
        let {comments} = this.state;
        if (comments.length === 0) return '';

        return (
            <>
                {this.getDownloadButtonBlock()}
                {comments.map(comment => <Comment key={comment.id} comment={comment}/>)}
            </>
        );
    }

    render() {
        let {account} = this.props;
        let {hasLoad} = this.state;
        return (
            <div className={style.comments_container}>
                {hasLoad ? this.getCommentsList() : <Preloader modal={false}/>}
                {account !== null ?
                    <div>
                        Здесь будет компонент для создания комментария
                    </div>
                    : ''
                }
            </div>
        );
    }
}

export default CommentsContainer;