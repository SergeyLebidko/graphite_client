import React from 'react';
import $ from 'jquery';
import Preloader from '../common_components/Preloader/Preloader';
import AccountCard from '../common_components/AccountCard/AccountCard';
import {MiniButton} from '../common_components/MiniButton/MiniButton';
import {withRouter} from 'react-router-dom';
import {ACCOUNT_URL} from '../settings';
import style from './Accounts.module.css';

class Accounts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasLoad: false,
            accounts: [],
            nextPage: ACCOUNT_URL + props.location.search
        }
    }

    downloadAccounts() {
        let {nextPage} = this.state;
        this.setState({
            hasLoad: false
        });
        $.ajax(nextPage).then(data => {
            this.setState(prevState => ({
                hasLoad: true,
                accounts: [...prevState.accounts, ...data.results],
                nextPage: data.next
            }));
        });
    }

    componentDidMount() {
        this.downloadAccounts();
    }

    render() {
        let {hasLoad, accounts, nextPage} = this.state;

        return (
            <div className={style.component_container}>
                {accounts.length > 0 ?
                    <div className={style.accounts_container}>
                        {accounts.map(account => <AccountCard key={account.id} account={account}/>)}
                    </div>
                    : ''
                }
                {!hasLoad ? <div className={style.modal_container}><Preloader modal={false}/></div> : ''}
                {nextPage !== null && hasLoad ?
                    <div className={style.control_container}>
                        <MiniButton buttonType="download" clickHandler={() => this.downloadAccounts()}/>
                    </div>
                    : ''
                }
            </div>
        )
    }
}

export default withRouter(Accounts);
