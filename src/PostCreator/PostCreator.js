import React from 'react';
import style from './PostCreator.module.css';

class PostCreator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={style.post_container}>
                <div className={style.title}>
                    <p>Заголовок:</p>
                    <input type="text"/>
                </div>
                <div className={style.text}>
                    <textarea rows="20"/>
                </div>
                <div className={style.control_block}>
                    <span className={style.cancel_button}>Отмена</span>
                    <span className={style.save_button}>Сохранить</span>
                </div>
            </div>
        )
    }
}

export default PostCreator;