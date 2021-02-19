import React from 'react';
import {withRouter} from 'react-router-dom';
import NoMatch from '../NoMatch/NoMatch';
import ModeSelector from '../ModeSelector/ModeSelector';
import style from './SearchResult.module.css';
import PostList from '../PostList/PostList';

const POSTS = 'posts';
const ACCOUNTS = 'accounts'

class SearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            q: new URLSearchParams(props.location.search).get('q'),
            mode: POSTS
        }
        this.modeSelectorHandler = this.modeSelectorHandler.bind(this);
    }

    modeSelectorHandler(currentMode) {
        this.setState({
            mode: currentMode
        });
    }

    render() {
        let {q, mode} = this.state;
        if (!q) return <NoMatch/>;

        let {account} = this.props;
        return (
            <div className={style.result_container}>
                <div className={style.selector_container}>
                    <ModeSelector leftTitle="Посты" left={POSTS}
                                  rightTitle="Авторы" right={ACCOUNTS}
                                  start="left"
                                  actionHandler={this.modeSelectorHandler}/>
                </div>
                <PostList q={q} account={account} visible={mode === POSTS}/>
            </div>
        )
    }
}

export default withRouter(SearchResult);