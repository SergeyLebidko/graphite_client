import React from 'react';
import $ from 'jquery';
import style from './App.module.css';
import * as CONST from './settings';
import Preloader from "./Preloader/Preloader";
import Header from "./Header/Header";
import RegisterForm from "./RegisterForm/RegisterForm";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasInit: false,
        }
    }

    componentDidMount() {
        let self = this;
        $.ajax(CONST.GENDER_LIST_URL).then(data => {
            setTimeout(() => {
                $('#preloader').animate({"opacity": "hide"}, 'slow', 'swing', () => {
                    self.setState({
                        hasInit: true,
                        genderList: data
                    });
                });
            }, 2000);
            // Таймаут в 2 с выше выставлен, чтобы можно было увидеть прелоадер при работе и с локальным сервером
        });
    }

    render() {
        return (
            <>
                {(!this.state.hasInit) ? <Preloader/> : null}
                <Header/>
                <div className={style.content}>
                    <RegisterForm/>
                </div>
            </>
        )
    }
}

export default App;
