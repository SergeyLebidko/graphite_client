import React from 'react';
import styles from './RegisterForm.module.css';

class RegisterForm extends React.Component {

    render() {
        return (
            <div className={styles.register_form}>
                <h2>Добро пожаловать в Graphite</h2>
                <div>
                    <p>Ваше имя</p>
                    <input type="text"/>
                </div>
                <div>
                    <p>Логин для входа</p>
                    <input type="text"/>
                </div>
                <div>
                    <p>Пароль</p>
                    <input type="text"/>
                </div>
                <div>
                    <p>Пароль еще раз</p>
                    <input type="text"/>
                </div>
                <div>
                    <p>Пол</p>
                    <input type="text"/>
                </div>
                <div>
                    <p>Дата рождения</p>
                    <input type="date"/>
                </div>
                <div>
                    <p>Немного о себе</p>
                    <textarea rows="5"/>
                </div>
                <input type="file" style={{display: 'none'}}/>
            </div>
        )
    }

}

export default RegisterForm;