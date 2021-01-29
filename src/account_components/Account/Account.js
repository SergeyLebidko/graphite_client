import React from 'react';
import $ from 'jquery';
import style from './Account.module.css';
import Avatar from '../Avatar/Avatar';
import UsernameControl from '../UsernameControl/UsernameControl';
import {GENDER_LIST_URL} from '../../settings';


class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            genderList: null
        }
    }

    componentDidMount() {
        $.ajax(GENDER_LIST_URL).then(data => this.setState({genderList: data}));
    }

    render() {
        return (
            <div className={style.account_container}>
                <Avatar account={this.props.account}/>
                <div className={style.control_container}>
                    <div className={style.basic_data_container}>
                        <UsernameControl account={this.props.account} refreshAccount={this.props.refreshAccount}/>
                        <table>
                            <tbody>
                            <tr>
                                <td>Пол:</td>
                                <td>здесь будет пол</td>
                            </tr>
                            <tr>
                                <td>Дата рождения:</td>
                                <td>здесь будет дата рождения</td>
                            </tr>
                            <tr>
                                <td>Немного о себе:</td>
                                <td>здесь будет раздел О себе</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default Account;