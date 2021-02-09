import React from 'react';
import {withRouter} from 'react-router-dom';
import $ from 'jquery';
import MenuButton from '../MenuButton/MenuButton';
import Menu from '../Menu/Menu';
import SearchField from '../SearchField/SearchField';
import {SignBlock} from '../SignBlock/SignBlock';
import style from './Header.module.css';


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasOpenMenu: false
        }

        this.menuButtonClickHandler = this.menuButtonClickHandler.bind(this);
        this.showMenu = this.showMenu.bind(this);
        this.hideMenu = this.hideMenu.bind(this);
    }

    menuButtonClickHandler() {
        this.setState(prevState => ({hasOpenMenu: !prevState.hasOpenMenu}));
    }

    showMenu() {
        this.setState({
            hasOpenMenu: true
        });
    }

    hideMenu() {
        this.setState({
            hasOpenMenu: false
        });
    }

    render() {
        return (
            <>
                <div className={style.header}>
                    <div className={style.header_content}>
                        <MenuButton clickHandler={this.menuButtonClickHandler} hasOpenMenu={this.state.hasOpenMenu}/>
                        <SearchField/>
                        <SignBlock account={this.props.account}
                                   history={this.props.history}
                                   hideMenu={this.hideMenu}/>
                    </div>
                </div>
                <Menu accountLogoutHandler={this.props.accountLogoutHandler}
                      hasLogin={this.props.account !== null}
                      hasOpenMenu={this.state.hasOpenMenu}
                      hideMenuHandler={this.hideMenu}/>
            </>
        )
    }
}

export default withRouter(Header);