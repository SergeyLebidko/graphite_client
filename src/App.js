import React from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import $ from 'jquery';
import style from './App.module.css';
import {CHECK_ACCOUNT_URL} from './settings';
import NoMatch from './common_components/NoMatch/NoMatch';
import Preloader from './common_components/Preloader/Preloader';
import Header from './header_components/Header/Header';
import LoginForm from './sign_components/LoginForm/LoginForm'
import RegisterForm from './sign_components/RegisterForm/RegisterForm';
import Account from './account_page_components/Account/Account';
import PostCreator from './PostCreator/PostCreator';
import Posts from './Posts/Posts';
import Post from './Post/Post';
import Accounts from './Accounts/Accounts';
import * as pages from './internal_pages';
import SearchResult from "./search_result_page_components/SearchResult/SearchResult";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasInit: false,
            account: null
        }
        this.accountLogoutHandler = this.accountLogoutHandler.bind(this);
        this.refreshAccount = this.refreshAccount.bind(this);
        this.accountRegisterHandler = this.accountRegisterHandler.bind(this);
        this.accountLoginHandler = this.accountLoginHandler.bind(this);
    }

    setForbiddenErrorHandler() {
        // При получении запроса со статусом 403 (Forbidden) переводим пользователя на страницу логина
        $(document).on("ajaxError", (_, jqXHR) => {
            if (jqXHR.status === 403) {
                this.setState({
                    account: null
                });
                localStorage.removeItem('token');
                this.props.history.push(pages.LOGIN_PAGE);
            }
        });
    }

    checkAccount() {
        // Пробуем по токену из localstorage получить аккаунт. Если попытка неудачна - удаляем токен
        let self = this;
        let token = localStorage.getItem('token');
        if (token !== null) {
            $.ajax(CHECK_ACCOUNT_URL, {
                headers: {'Authorization': token}
            }).then(data => {
                self.setState({
                    account: data,
                    hasInit: true
                });
            }).catch(() => {
                localStorage.removeItem('token');
                this.setState({
                    hasInit: true
                });
            });
        }
    }

    componentDidMount() {
        this.setForbiddenErrorHandler();
        this.checkAccount();
    }

    setAccountData(account, token) {
        localStorage.setItem('token', token);
        this.setState({
            account: account
        });
    }

    accountRegisterHandler(account, token) {
        this.setAccountData(account, token);
        this.props.history.push(pages.ACCOUNT_PAGE + `/${account.id}`);
    }

    accountLoginHandler(account, token) {
        this.setAccountData(account, token);
        this.props.history.push(pages.MAIN_PAGE);
    }

    accountLogoutHandler() {
        localStorage.removeItem('token');
        this.setState({
            account: null
        });
        if (this.props.location.pathname !== pages.MAIN_PAGE) this.props.history.push(pages.MAIN_PAGE);
    }

    refreshAccount(account) {
        this.setState({
            account: account
        })
    }

    render() {
        let {hasInit, account} = this.state;
        if (!hasInit) return <Preloader/>;

        let hasNoLogin = account == null;
        return (
            <>
                <Header account={account} accountLogoutHandler={this.accountLogoutHandler}/>
                <div className={style.content}>
                    <Switch>
                        <Route exact path={pages.MAIN_PAGE}>
                            <Redirect to={pages.POSTS_PAGE}/>
                        </Route>
                        <Route path={pages.REGISTER_PAGE}>
                            {hasNoLogin ?
                                <RegisterForm accountRegisterHandler={this.accountRegisterHandler}/> :
                                <Redirect to={pages.MAIN_PAGE}/>
                            }
                        </Route>
                        <Route path={pages.LOGIN_PAGE}>
                            {hasNoLogin ?
                                <LoginForm accountLoginHandler={this.accountLoginHandler}/> :
                                <Redirect to={pages.MAIN_PAGE}/>
                            }
                        </Route>
                        <Route path={pages.ACCOUNTS_PAGE}>
                            <Accounts key={Math.random()}/>
                        </Route>
                        <Route path={pages.ACCOUNT_PAGE + '/:id'}>
                            <Account key={Math.random()}
                                     account={account}
                                     refreshAccount={this.refreshAccount}
                                     logoutHandler={this.accountLogoutHandler}/>
                        </Route>
                        <Route path={pages.POSTS_PAGE}>
                            <Posts key={Math.random()} account={account}/>
                        </Route>
                        <Route path={pages.POST_PAGE + '/:id'}>
                            <Post key={Math.random()} account={account}/>
                        </Route>
                        <Route path={pages.CREATE_POST_PAGE}>
                            {hasNoLogin ? <Redirect to={pages.LOGIN_PAGE}/> : <PostCreator account={account}/>}
                        </Route>
                        <Route path={pages.SEARCH_RESULT}>
                            <SearchResult key={Math.random()} account={account}/>
                        </Route>
                        <Route path="*">
                            <NoMatch/>
                        </Route>
                    </Switch>
                </div>
            </>
        );
    }
}

export default withRouter(App);