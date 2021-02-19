import {HOST} from "./settings";
import React from "react";

export function dateStringForDisplay(dateString, withTime = true) {
    let monthList = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    if (withTime) {
        let [_, y, m, d, t] = /(\d{4})-(\d{2})-(\d{2})T(\d\d:\d\d)/.exec(dateString);
        return `${(d[0] === '0') ? d[1] : d} ${monthList[+m - 1]} ${y} г. ${t}`;
    }
    let [_, y, m, d] = /(\d{4})-(\d{2})-(\d{2})/.exec(dateString);
    return `${(d[0] === '0') ? d[1] : d} ${monthList[+m - 1]} ${y} г.`;
}

export function createAvatarURL(avatar) {
    let avatarURL;
    if (avatar === null) {
        avatarURL = '/images/no_avatar.svg';
    } else {
        avatarURL = avatar[0] === '/' ? HOST + avatar : avatar;
    }
    return avatarURL;
}

export function prepareTextForShow(text) {
    return text.split('\n').map((fragment, index) =>
        fragment.length === 0 ? <br key={index}/> : <p key={index}>{fragment}</p>
    );
}