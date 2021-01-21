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
        $.ajax(CONST.GENDER_LIST_URL).then(data => {
            console.log(data);
            setTimeout(() => {
                this.setState({
                    hasInit: true,
                    genderList: data
                })
            }, 1500);
        });
    }

    render() {
        if (!this.state.hasInit) {
            return <Preloader/>
        }
        return (
            [
                <Header/>,
                <div className={style.content}>
                    <RegisterForm/>
                </div>
            ]
        );
    }
}

export default App;
