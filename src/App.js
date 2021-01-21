import React from 'react';
import style from './App.module.css';
import Header from "./Header/Header";
import RegisterForm from "./RegisterForm/RegisterForm";

class App extends React.Component {
    render() {
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
