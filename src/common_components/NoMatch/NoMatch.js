import React from 'react';
import {withRouter} from 'react-router-dom';

function NoMatch(props) {
    let {location} = props;
    return (
        <div style={{textAlign: 'center', margin: '50px'}}>HTTP: 404. Страница с адресом {location.pathname} не
            найдена...</div>
    )
}

export default withRouter(NoMatch);