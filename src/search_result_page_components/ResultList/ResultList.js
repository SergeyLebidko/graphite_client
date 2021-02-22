import React from 'react';
import $ from 'jquery';
import style from './ResultList.module.css';
import {POST_URL, ACCOUNT_URL} from '../../settings';
import {POSTS, ACCOUNTS} from '../SearchResult/SearchResult';
import Preloader from '../../common_components/Preloader/Preloader';
import PostCard from '../../common_components/PostCard/PostCard';
import {MiniButton} from '../../common_components/MiniButton/MiniButton';
import AccountCard from '../../common_components/AccountCard/AccountCard';

class ResultList extends React.Component {
    constructor(props) {
        super(props);

        let url;
        let {listType} = props;
        if (listType === POSTS) url = POST_URL + `?q=${props.q}`;
        if (listType === ACCOUNTS) url = ACCOUNT_URL + `?q=${props.q}`;

        this.state = {
            hasLoad: false,
            posts: [],
            nextPage: url,
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
            this.setState(prevState => ({
                hasLoad: true,
                posts: [...prevState.posts, ...data.results],
                nextPage: data.next
            }));
        });
    }

    componentDidMount() {
        this.downloadData();
    }

    render() {
        let {account, listType} = this.props;
        let {hasLoad, posts, nextPage, visible} = this.state;
        return (
            <div style={visible ? {marginBottom: '70px'} : {marginBottom: '70px', display: 'none'}}>
                <div className={style.result_list_container}>
                    {posts.length > 0 ?
                        posts.map(value => {
                            if (listType === POSTS) return <PostCard key={value.id} post={value} account={account}/>;
                            if (listType === ACCOUNTS) return <AccountCard key={value.id} account={value}/>;
                        })
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

export default ResultList;