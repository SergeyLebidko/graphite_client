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
                this.props.history.push('/login');
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
        this.props.history.push('/account');
    }

    accountLoginHandler(account, token) {
        this.setAccountData(account, token);
        this.props.history.push('/content');
    }

    accountLogoutHandler() {
        localStorage.removeItem('token');
        this.setState({
            account: null
        });
        this.props.history.push('/content');
    }

    refreshAccount(account) {
        this.setState({
            account: account
        })
    }

    render() {
        return (
            <>
                {(!this.state.hasInit) ? <Preloader/> : null}
                <Header account={this.state.account} accountLogoutHandler={this.accountLogoutHandler}/>
                <div className={style.content}>
                    <Switch>
                        <Route exact path="/">
                            <Redirect to="/content"/>
                        </Route>
                        <Route path="/register">
                            {(this.state.account == null) ?
                                <RegisterForm accountRegisterHandler={this.accountRegisterHandler}/> :
                                <Redirect to="/content"/>
                            }
                        </Route>
                        <Route path="/login">
                            {(this.state.account == null) ?
                                <LoginForm accountLoginHandler={this.accountLoginHandler}/> :
                                <Redirect to="/content"/>
                            }
                        </Route>
                        <Route path="/account">
                            {(this.state.account == null) ?
                                <Redirect to="/login"/> :
                                <Account account={this.state.account}
                                         refreshAccount={this.refreshAccount}
                                         logoutHandler={this.accountLogoutHandler}/>
                            }
                        </Route>
                        <Route path="/create_post">
                            <PostCreator account={this.state.account}/>
                        </Route>
                        <Route path="/content">
                            <div style={{textAlign: 'center', margin: '50px'}}>Здесь будет контент</div>
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