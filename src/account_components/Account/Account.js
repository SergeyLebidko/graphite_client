import React from 'react';
import $ from 'jquery';
import style from './Account.module.css';
import Avatar from '../Avatar/Avatar';
import UsernameControl from '../UsernameControl/UsernameControl';
import GenderControl from '../GenderControl/GenderControl';
import BirthDateControl from '../BirthDateControl/BirthDateControl';
import DescriptionControl from '../DescriptionControl/DescriptionControl';
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
                                <td><GenderControl account={this.props.account}
                                                   refreshAccount={this.props.refreshAccount}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Дата рождения:</td>
                                <td><BirthDateControl account={this.props.account}
                                                      refreshAccount={this.props.refreshAccount}/>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <DescriptionControl account={this.props.account} refreshAccount={this.props.refreshAccount}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Account;