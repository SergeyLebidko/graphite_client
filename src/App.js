import React from 'react';
import {HashRouter, Switch, Route} from "react-router-dom";
import $ from 'jquery';

import style from './App.module.css';

import {CHECK_ACCOUNT_URL} from "./settings";

import Preloader from "./Preloader/Preloader";
import Header from "./Header/Header";
import RegisterForm from "./RegisterForm/RegisterForm";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasInit: false,
            genderList: null,
            account: null
        }

        this.accountRegisterHandler = this.accountRegisterHandler.bind(this);
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

    accountRegisterHandler(account, token) {
        localStorage.setItem('token', token);
        this.setState({
            account: account
        });
    }

    render() {
        return (
            <HashRouter>
                {(!this.state.hasInit) ? <Preloader/> : null}
                <Header/>
                <div className={style.content}>
                    <div>Текущий
                        пользователь{this.state.account !== null ? this.state.account.username : 'Не известен...'}
                    </div>
                    <Switch>
                        <Route path="/menu">
                            <div>Здесь будет меню</div>
                        </Route>
                        <Route path="/search">
                            <div>Здесь будут результаты поиска</div>
                        </Route>
                        <Route path="/login">
                            <RegisterForm accountRegisterHandler={this.accountRegisterHandler}/>
                        </Route>
                    </Switch>
                </div>
            </HashRouter>
        );
    }
}

export default App;
