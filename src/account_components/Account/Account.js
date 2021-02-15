import React from 'react';
import {withRouter} from 'react-router-dom';
import $ from 'jquery';
import style from './Account.module.css';
import {ACCOUNT_URL} from '../../settings';
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
import Preloader from '../../Preloader/Preloader';
import NoMatch from '../../NoMatch/NoMatch';

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasShowSettings: false,
            hasEditorsEnabled: false,
            account: null,
            hasNotFoundAccount: false
        }
        this.settingsButtonClickHandler = this.settingsButtonClickHandler.bind(this);
    }

    componentWillMount() {
        let {account} = this.props
        let accountIdInURL = this.props.match.params.id;
        if (account !== null && account.id == accountIdInURL) {
            this.setState({
                hasEditorsEnabled: true,
                account
            });
            return;
        }

        $.ajax(ACCOUNT_URL + `${accountIdInURL}/`).then(data => {
            setTimeout(() => {
                this.setState({
                    account: data
                });
            }, 1000);
        }).catch(() => {
            this.setState({
                hasNotFoundAccount: true
            })
        });
    }

    settingsButtonClickHandler() {
        $('#settings_block').slideToggle('normal');
        this.setState(prevState => ({hasShowSettings: !prevState.hasShowSettings}));
    }

    render() {
        let {refreshAccount, logoutHandler} = this.props;
        let {hasShowSettings, hasEditorsEnabled, account, hasNotFoundAccount} = this.state;
        if (hasNotFoundAccount) return <NoMatch/>;

        let hasAccountReady = account !== null;
        if (!hasAccountReady) return <Preloader/>;

        return (
            <div className={style.account_container}>
                <div className={style.left_container}>
                    <AvatarControl account={account} refreshAccount={refreshAccount} enableEditor={hasEditorsEnabled}/>
                    <AccountStat accountId={account.id}/>
                </div>
                <div className={style.right_container}>
                    <div className={style.basic_data_container}>
                        <UsernameControl account={account}
                                         refreshAccount={refreshAccount}
                                         enableEditor={hasEditorsEnabled}/>
                        <table>
                            <tbody>
                            <tr>
                                <td>Пол:</td>
                                <td>
                                    <GenderControl account={account}
                                                   refreshAccount={refreshAccount}
                                                   enableEditor={hasEditorsEnabled}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Дата рождения:</td>
                                <td>
                                    <BirthDateControl account={account}
                                                      refreshAccount={refreshAccount}
                                                      enableEditor={hasEditorsEnabled}/>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <DescriptionControl account={account}
                                            refreshAccount={refreshAccount}
                                            enableEditor={hasEditorsEnabled}/>
                    </div>
                    {hasEditorsEnabled ?
                        <>
                            <SettingsButton clickHandler={this.settingsButtonClickHandler}/>
                            <div className={style.settings_container} style={{display: 'none'}} id="settings_block">
                                <LoginControl hasShow={hasShowSettings}/>
                                <PasswordControl hasShow={hasShowSettings}/>
                                <LogoutControl logoutHandler={logoutHandler}/>
                                <RemoveAccountControl logoutHandler={logoutHandler} hasShow={hasShowSettings}/>
                            </div>
                        </>
                        : ''
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(Account);