import React from 'react';
import $ from 'jquery';
import style from './Account.module.css';
import AvatarControl from '../AvatarControl/AvatarControl';
import UsernameControl from '../UsernameControl/UsernameControl';
import GenderControl from '../GenderControl/GenderControl';
import BirthDateControl from '../BirthDateControl/BirthDateControl';
import DescriptionControl from '../DescriptionControl/DescriptionControl';
import SettingsButton from '../SettingsButton/SettingsButton';
import LoginControl from '../LoginControl/LoginControl';
import PasswordControl from '../PasswordControl/PasswordControl';
import LogoutControl from '../LogoutControl/LogoutControl';
import RemoveAccountControl from '../RemoveAccountControl/RemoveAccountControl';
import AccountStat from '../../AccountStat/AccountStat';

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
        let {account, refreshAccount, logoutHandler} = this.props;
        let {hasShowSettings} = this.state;
        return (
            <div className={style.account_container}>
                <div className={style.left_container}>
                    <AvatarControl account={account} refreshAccount={refreshAccount}/>
                    <AccountStat accountId={account.id}/>
                </div>
                <div className={style.right_container}>
                    <div className={style.basic_data_container}>
                        <UsernameControl account={account} refreshAccount={refreshAccount}/>
                        <table>
                            <tbody>
                            <tr>
                                <td>Пол:</td>
                                <td><GenderControl account={account} refreshAccount={refreshAccount}/></td>
                            </tr>
                            <tr>
                                <td>Дата рождения:</td>
                                <td><BirthDateControl account={account} refreshAccount={refreshAccount}/></td>
                            </tr>
                            </tbody>
                        </table>
                        <DescriptionControl account={account} refreshAccount={refreshAccount}/>
                    </div>
                    <SettingsButton clickHandler={this.settingsButtonClickHandler}/>
                    <div className={style.settings_container} style={{display: 'none'}} id="settings_block">
                        <LoginControl hasShow={hasShowSettings}/>
                        <PasswordControl hasShow={hasShowSettings}/>
                        <LogoutControl logoutHandler={logoutHandler}/>
                        <RemoveAccountControl logoutHandler={logoutHandler} hasShow={hasShowSettings}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Account;