import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import $ from 'jquery';
import style from './App.module.css';
import {CHECK_ACCOUNT_URL} from './settings';
import Preloader from './Preloader/Preloader';
import Header from './header_components/Header/Header';
import LoginForm from './sign_components/LoginForm/LoginForm'
import RegisterForm from './sign_components/RegisterForm/RegisterForm';
import Account from './Account/Account';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasInit: false,
            account: null
        }

        this.accountLoginHandler = this.accountLoginHandler.bind(this);
        this.accountLogoutHandler = this.accountLogoutHandler.bind(this);
    }

    checkAccount() {
        let self = this;
        let token = localStorage.getItem('token');
        if (token !== null) {
            $.ajax(CHECK_ACCOUNT_URL, {
                headers: {'Authorization': token}
            }).then(data => {
                self.setState({
                    account: data
                });
            });
        }
    }

    componentDidMount() {
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
                                <Account account={this.state.account}/>
                            }
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