import React from 'react';
import {Switch, Route} from 'react-router-dom';
import $ from 'jquery';
import style from './App.module.css';
import {CHECK_ACCOUNT_URL} from './settings';
import Preloader from './Preloader/Preloader';
import Header from './Header/Header';
import LoginForm from './LoginForm/LoginForm'
import RegisterForm from './RegisterForm/RegisterForm';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasInit: false,
            genderList: null,
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

    accountLoginHandler(account, token) {
        localStorage.setItem('token', token);
        this.setState({
            account: account
        });
    }

    accountLogoutHandler(){
        localStorage.removeItem('token');
        this.setState({
            account: null
        })
    }

    render() {
        return (
            <>
                {(!this.state.hasInit) ? <Preloader/> : null}
                <Header account={this.state.account} accountLogoutHandler={this.accountLogoutHandler}/>
                <div className={style.content}>
                    <Switch>
                        <Route path="/register">
                            <RegisterForm accountLoginHandler={this.accountLoginHandler}/>
                        </Route>
                        <Route path="/login">
                            <LoginForm accountLoginHandler={this.accountLoginHandler}/>
                        </Route>
                    </Switch>
                </div>
            </>
        );
    }
}

export default App;
