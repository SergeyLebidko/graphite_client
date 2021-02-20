import React from 'react';
import style from './PopUpMessage.module.css';

// Функция преобразовывает данные на входе в массив строк, которые потом могут быть выведены во всплывающем сообщении
function msgConverter(data) {
    let result = [];
    if (!data) return result;

    // Если входные данные - строка, то просто добавляем её в результат
    if (typeof data === 'string') {
        result.push(data);
        return result;
    }

    // Если объект - массив строк, то добавляем их все в результат
    if (Array.isArray(data)) {
        result = result.concat(data);
        return result;
    }

    // Если объект - результат возврата ошибки из хука, то "распаковываем" его и добавляем строки в результат
    data = data.responseJSON;
    for (let fieldName of Object.keys(data)) {
        if (typeof data[fieldName] === 'string') {
            result.push(data[fieldName])
        } else {
            for (let value of data[fieldName]) result.push(value);
        }
    }
    return result;
}

class PopUpMessage extends React.Component {
    constructor(props) {
        super(props);
        let msgList = msgConverter(props.msg);
        this.state = {
            msgList,
            timer: (msgList.length > 0 ? setTimeout(() => {
                this.setState({msgList: []});
                props.endShow();
            }, props.delay) : null)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.msg === this.props.msg) return;

        let {msg} = nextProps;
        let msgList = msgConverter(msg);
        clearTimeout(this.state.timer);

        this.setState({
            msgList,
            timer: (msgList.length > 0 ? setTimeout(() => {
                this.setState({msgList: []});
                nextProps.endShow();
            }, nextProps.delay) : null)
        });
    }

    render() {
        let {msgList} = this.state;
        if (msgList.length === 0) return '';

        return (
            <div className={`${style[this.props.msgType]} ` + this.props.outerClass}>
                <ul className={style.msg_list}>
                    {msgList.map((value, index) => <li key={index}>{value}</li>)}
                </ul>
            </div>
        )
    }
}

PopUpMessage.defaultProps = {
    delay: 5000,
    outerClass: ''
}

export default PopUpMessage;
