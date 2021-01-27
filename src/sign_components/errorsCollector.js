// Функция консолидирует ошибки, получаенные из объекта-ответа в один список и возвращает его

export const errorsCollector = (data) => {
    let response = data.responseJSON;
    let errors = [];
    for (let fieldName of Object.keys(response)) {
        if (typeof response[fieldName] === 'string') {
            errors.push(response[fieldName])
        } else {
            for (let value of response[fieldName]) errors.push(value);
        }
    }
    return errors
}
