import React from 'react';
import $ from 'jquery';

class MyPosts extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log('Мои посты');
    }

    render() {
        return (
            <div>Список постов</div>
        )
    }
}

export default MyPosts;