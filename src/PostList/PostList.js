import React from 'react';
import $ from 'jquery';
import style from './PostList.module.css';
import {POST_URL} from '../settings';
import Preloader from '../Preloader/Preloader';
import PostCard from '../PostCard/PostCard';
import {MiniButton} from "../MiniButton/MiniButton";

class PostList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasLoad: false,
            posts: [],
            nextPage: POST_URL + `?q=${props.q}`,
            visible: props.visible
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            visible: nextProps.visible
        });
    }

    downloadData() {
        this.setState({
            hasLoad: false
        });
        let {nextPage} = this.state;
        $.ajax(nextPage).then(data => {
            setTimeout(() => {
                this.setState(prevState => ({
                    hasLoad: true,
                    posts: [...prevState.posts, ...data.results],
                    nextPage: data.next
                }))
            }, 1000);
        });
    }

    componentDidMount() {
        this.downloadData();
    }

    render() {
        let {account} = this.props;
        let {hasLoad, posts, nextPage, visible} = this.state;
        return (
            <div style={visible ? {marginBottom: '70px'} : {marginBottom: '70px', display: 'none'}}>
                <div className={style.post_list_container}>
                    {posts.length > 0 ?
                        posts.map(post => <PostCard key={post.id} post={post} account={account}/>)
                        : ''
                    }
                </div>
                {nextPage !== null ?
                    <div className={style.control_container}>
                        {hasLoad ?
                            <MiniButton buttonType="download" clickHandler={() => this.downloadData()}/>
                            :
                            <Preloader modal={false}/>
                        }
                    </div>
                    : ''
                }
            </div>
        )
    }
}

export default PostList;