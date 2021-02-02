import React from 'react';
import $ from 'jquery';
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
        this.settingsButtonClickHandler = this.settingsButtonClickHandler.bind(this);
    }

    settingsButtonClickHandler() {
        $('#settings_block').slideToggle('normal');
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
                        <p>Здесь будут настройки работы с аккаунтом</p>
                        <p>Изменение логина</p>
                        <p>Изменение пароля</p>
                        <p>Выход из аккаунта на всех устройствах</p>
                        <p>Удаление аккаунта</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Account;