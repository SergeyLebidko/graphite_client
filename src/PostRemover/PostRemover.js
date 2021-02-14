import React from 'react';
import {withRouter} from 'react-router-dom';
import $ from 'jquery';
import {MiniButton} from '../MiniButton/MiniButton';
import style from './PostRemover.module.css'
import {POST_URL} from '../settings';

class PostRemover extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasActive: false
        }
        this.removeHandler = this.removeHandler.bind(this);
    }

    removeHandler() {
        let {post, history} = this.props;
        let token = localStorage.getItem('token');
        $.ajax(POST_URL + post.id + '/', {
            method: 'DELETE',
            headers: {
                'Authorization': token
            }
        }).then(() => {
            history.goBack();
        });
    }

    render() {
        let {hasActive} = this.state;
        return (
            <div>
                {hasActive ?
                    <div className={style.confirm_container}>
                        <span>Вы действительно хотите удалить пост? Это действие необратимо.</span>
                        <MiniButton buttonType="ok" clickHandler={this.removeHandler}/>
                        <MiniButton buttonType="cancel" clickHandler={() => this.setState({hasActive: false})}/>
                    </div>
                    :
                    <div className={style.question_container}>
                        <span onClick={() => this.setState({hasActive: true})}>
                            Удалить пост
                        </span>
                    </div>
                }
            </div>
        )
    }
}

export default withRouter(PostRemover);