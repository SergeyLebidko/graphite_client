import React from 'react';
import {withRouter} from 'react-router-dom';
import NoMatch from '../NoMatch/NoMatch';
import ModeSelector from '../ModeSelector/ModeSelector';
import style from './SearchResult.module.css';

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

    componentDidMount() {
        let {q} = this.state;
        if (!q) return
    }

    render() {
        let {q, mode} = this.state;
        if (!q) return <NoMatch/>;

        return (
            <div className={style.result_container}>
                <div className={style.selector_container}>
                    <ModeSelector leftTitle="Посты" left={POSTS}
                                  rightTitle="Авторы" right={ACCOUNTS}
                                  start="left"
                                  actionHandler={this.modeSelectorHandler}/>
                </div>
                {mode === POSTS ?
                    <div>
                        Здесь будут посты
                    </div>
                    : ''
                }
                {mode === ACCOUNTS ?
                    <div>
                        Здесь будут авторы
                    </div>
                    : ''
                }
            </div>
        )
    }
}

export default withRouter(SearchResult);