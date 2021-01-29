import React from 'react';
import $ from 'jquery';
import style from './Account.module.css';
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

    getGenderBlock() {
        let account = this.props.account;
        if (account.gender === null) return <span>указать</span>;
        if (this.state.genderList == null) {
            return null;
        } else {
            return <span>{this.state.genderList[account.gender]}</span>
        }
    }

    getBirthDateBlock() {
        let account = this.props.account;
        if (account.birth_date === null) return <span>указать</span>;
        return <span>{account.birth_date}</span>
    }

    getDescriptionBlock() {
        let account = this.props.account;
        if (account.description === '') return <span>написать</span>;
    }

    render() {
        return (
            <div className={style.account_container}>

                <div className={style.avatar_container}>
                    <img className={style.avatar} src="/images/no_avatar.svg"/>
                </div>

                <div className={style.control_container}>

                    <div className={style.basic_data_container}>
                        <p>{this.props.account.username}</p>
                        <table>
                            <tbody>
                            <tr>
                                <td>Пол:</td>
                                <td>{this.getGenderBlock()}</td>
                            </tr>
                            <tr>
                                <td>Дата рождения:</td>
                                <td>{this.getBirthDateBlock()}</td>
                            </tr>
                            <tr>
                                <td>Немного о себе:</td>
                                <td>{this.getDescriptionBlock()}</td>
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