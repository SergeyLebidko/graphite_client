import React from 'react';
import style from './Account.module.css';
import Avatar from '../Avatar/Avatar';
import UsernameControl from '../UsernameControl/UsernameControl';
import GenderControl from '../GenderControl/GenderControl';
import BirthDateControl from '../BirthDateControl/BirthDateControl';
import DescriptionControl from '../DescriptionControl/DescriptionControl';
import SettingsButton from '../SettingsButton/SettingsButton';

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSettingsFlag: false
        }
    }

    render() {
        return (
            <div className={style.account_container}>
                <Avatar account={this.props.account} refreshAccount={this.props.refreshAccount}/>
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
                    <SettingsButton/>
                </div>
            </div>
        )
    }
}

export default Account;