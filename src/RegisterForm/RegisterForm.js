import React from 'react';
import styles from './RegisterForm.module.css';

class RegisterForm extends React.Component {

    render() {
        return (
            <div className={styles.form_container}>
                <div className={styles.register_form}>
                    <div>
                        <h1>Добро пожаловать в Graphite</h1>
                    </div>
                    <form>
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
                        <input type="file" style={{display: 'none'}}/>
                    </form>
                    <span className={styles.register_button}>Зарегистрироваться</span>
                </div>
            </div>
        )
    }

}

export default RegisterForm;