import React from 'react';
import $ from 'jquery';
import {withRouter} from 'react-router-dom';
import style from './Accounts.module.css';

class Accounts extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div>Здесь бедут список аккаунтов</div>
        )
    }
}

export default withRouter(Accounts);
