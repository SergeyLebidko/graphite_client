import React from 'react';
import $ from 'jquery';
import style from './Account.module.css';
import Avatar from '../Avatar/Avatar';
import UsernameControl from '../UsernameControl/UsernameControl';
import GenderControl from '../GenderControl/GenderControl';
import BirthDateControl from '../BirthDateControl/BirthDateControl';
import DescriptionControl from '../DescriptionControl/DescriptionControl';
import SettingsButton from '../SettingsButton/SettingsButton';
import LoginControl from '../LoginControl/LoginControl';
import PasswordControl from '../PasswordControl/PasswordControl';
import LogoutControl from '../LogoutControl/LogoutControl';
import RemoveAccountControl from '../RemoveAccountControl/RemoveAccountControl';

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasShowSettings: false
        }
        this.settingsButtonClickHandler = this.settingsButtonClickHandler.bind(this);
    }

    settingsButtonClickHandler() {
        $('#settings_block').slideToggle('normal');
        this.setState(prevState => ({hasShowSettings: !prevState.hasShowSettings}));
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
                    <SettingsButton clickHandler={this.settingsButtonClickHandler}/>
                    <div className={style.settings_container} style={{display: 'none'}} id="settings_block">
                        <LoginControl hasShow={this.state.hasShowSettings}/>
                        <PasswordControl hasShow={this.state.hasShowSettings}/>
                        <LogoutControl logoutHandler={this.props.logoutHandler}/>
                        <RemoveAccountControl logoutHandler={this.props.logoutHandler}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Account;