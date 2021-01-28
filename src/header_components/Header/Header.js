import React from 'react';
import {withRouter} from 'react-router-dom';
import $ from 'jquery';
import MenuButton from '../MenuButton/MenuButton';
import Menu from '../Menu/Menu';
import SearchField from '../SearchField/SearchField';
import SignBlock from '../SignBlock/SignBlock';
import style from './Header.module.css';


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasOpenMenu: false
        }

        this.menuButtonClickHandler = this.menuButtonClickHandler.bind(this);
    }

    menuButtonClickHandler() {
        let topPosition;
        if (this.state.hasOpenMenu) {
            topPosition = '-190px';
        } else {
            topPosition = '50px';
        }
        $('#menu').animate({top: topPosition}, 'normal');
        this.setState(prevState => {
            return {hasOpenMenu: !prevState.hasOpenMenu}
        });
    }

    render() {
        return (
            <>
                <div className={style.header}>
                    <div className={style.header_content}>
                        <MenuButton clickHandler={this.menuButtonClickHandler} hasOpenMenu={this.state.hasOpenMenu}/>
                        <SearchField/>
                        <SignBlock account={this.props.account} history={this.props.history}/>
                    </div>
                </div>
                <Menu accountLogoutHandler={this.props.accountLogoutHandler}
                      hasLogin={this.props.account !== null}
                      history={this.props.history}/>
            </>
        )
    }
}

export default withRouter(Header);