export function dateStringForDisplay(dateString, withTime = true) {
    let monthList = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    if (withTime) {
        let [_, y, m, d, t] = /(\d{4})-(\d{2})-(\d{2})T(\d\d:\d\d)/.exec(dateString);
        return `${(d[0] === '0') ? d[1] : d} ${monthList[+m - 1]} ${y} г. ${t}`;
    }
    let [_, y, m, d] = /(\d{4})-(\d{2})-(\d{2})/.exec(dateString);
    return `${(d[0] === '0') ? d[1] : d} ${monthList[+m - 1]} ${y} г.`;
}