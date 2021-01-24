import React from 'react';
import $ from 'jquery';
import style from './App.module.css';
import {GENDER_LIST_URL} from "./settings";
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

    componentDidMount() {
        let self = this;
        $.ajax(GENDER_LIST_URL).then(data => {
            setTimeout(() => {
                $('#preloader').animate({"opacity": "hide"}, 'slow', 'swing', () => {
                    self.setState({
                        hasInit: true,
                        genderList: data
                    });
                });
            }, 2000);
            // Таймаут в 2с выставлен, чтобы можно было увидеть прелоадер при работе и с локальным сервером
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
            <>
                {(!this.state.hasInit) ? <Preloader/> : null}
                <Header/>
                <div className={style.content}>
                    <RegisterForm accountRegisterHandler={this.accountRegisterHandler}/>
                </div>
            </>
        )
    }
}

export default App;
