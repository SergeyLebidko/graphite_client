import React from 'react';
import style from './App.module.css';
import Preloader from "./Preloader/Preloader";
import Header from "./Header/Header";
import RegisterForm from "./RegisterForm/RegisterForm";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasInit: false
        }
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
