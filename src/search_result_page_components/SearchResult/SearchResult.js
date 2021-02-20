import React from 'react';
import {withRouter} from 'react-router-dom';
import NoMatch from '../../common_components/NoMatch/NoMatch';
import ModeSelector from '../ModeSelector/ModeSelector';
import style from './SearchResult.module.css';
import ResultList from '../ResultList/ResultList';

export const POSTS = 'posts';
export const ACCOUNTS = 'accounts'

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
                                  actionHandler={this.modeSelectorHandler}/>
                </div>
                <ResultList q={q} account={account} visible={mode === POSTS} listType={POSTS}/>
                <ResultList q={q} account={account} visible={mode === ACCOUNTS} listType={ACCOUNTS}/>
            </div>
        )
    }
}

export default withRouter(SearchResult);