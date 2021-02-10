import React from 'react';
import {Switch, Route, Redirect, withRouter, useLocation} from 'react-router-dom';
import $ from 'jquery';
import style from './App.module.css';
import {CHECK_ACCOUNT_URL} from './settings';
import Preloader from './Preloader/Preloader';
import Header from './header_components/Header/Header';
import LoginForm from './sign_components/LoginForm/LoginForm'
import RegisterForm from './sign_components/RegisterForm/RegisterForm';
import Account from './account_components/Account/Account';
import PostCreator from './PostCreator/PostCreator';
import MyPosts from './MyPosts/MyPosts';
import * as pages from './internal_pages';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasInit: false,
            account: null
        }

        this.accountLoginHandler = this.accountLoginHandler.bind(this);
        this.accountLogoutHandler = this.accountLogoutHandler.bind(this);
        this.refreshAccount = this.refreshAccount.bind(this);
        this.accountRegisterHandler = this.accountRegisterHandler.bind(this);
        this.accountLoginHandler = this.accountLoginHandler.bind(this);
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
                    account: data
                });
            }).catch(() => {
                localStorage.removeItem('token')
            });
        }
    }

    componentDidMount() {
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

        // Промисы для действий, выполняемых при загрузке приложения
        let checkAccountPromise = this.checkAccount();

        $.when(checkAccountPromise).then(() => {
            setTimeout(() => {
                this.setState({
                    hasInit: true
                });
            }, 2000);
        });
    }

    setAccountData(account, token) {
        localStorage.setItem('token', token);
        this.setState({
            account: account
        });
    }

    accountRegisterHandler(account, token) {
        this.setAccountData(account, token);
        this.props.history.push(pages.ACCOUNT_PAGE);
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
        this.props.history.push(pages.MAIN_PAGE);
    }

    refreshAccount(account) {
        this.setState({
            account: account
        })
    }

    render() {
        let {hasInit, account} = this.state;
        let hasLogin = account == null;
        return (
            <>
                {(!hasInit) ? <Preloader/> : null}
                <Header account={account} accountLogoutHandler={this.accountLogoutHandler}/>
                <div className={style.content}>
                    <Switch>
                        <Route exact path={pages.MAIN_PAGE}>
                            <div style={{textAlign: 'center'}}>Заглушка для главной страницы</div>
                        </Route>
                        <Route path={pages.REGISTER_PAGE}>
                            {hasLogin ?
                                <RegisterForm accountRegisterHandler={this.accountRegisterHandler}/> :
                                <Redirect to={pages.MAIN_PAGE}/>
                            }
                        </Route>
                        <Route path={pages.LOGIN_PAGE}>
                            {hasLogin ?
                                <LoginForm accountLoginHandler={this.accountLoginHandler}/> :
                                <Redirect to={pages.MAIN_PAGE}/>
                            }
                        </Route>
                        <Route path={pages.ACCOUNT_PAGE}>
                            {hasLogin ?
                                <Redirect to={pages.LOGIN_PAGE}/> :
                                <Account account={account}
                                         refreshAccount={this.refreshAccount}
                                         logoutHandler={this.accountLogoutHandler}/>
                            }
                        </Route>
                        <Route path={pages.CREATE_POST_PAGE}>
                            {hasLogin ? <Redirect to={pages.LOGIN_PAGE}/> : <PostCreator account={account}/>}
                        </Route>
                        <Route path={pages.MY_POSTS_PAGE}>
                            {hasLogin ? <Redirect to={pages.LOGIN_PAGE}/> : <MyPosts account={account}/>}
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

function NoMatch() {
    let location = useLocation();
    return (
        <div style={{textAlign: 'center', margin: '50px'}}>HTTP: 404. Страница с адресом {location.pathname} не
            найдена...</div>
    )
}

export default withRouter(App);