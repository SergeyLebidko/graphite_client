const HOST = 'http://127.0.0.1:8000'

// Хук регистрации аккаунта
export const REGISTER_ACCOUNT_URL = `${HOST}/api/register_account/`;

// Хук для выполнение входа в аккаунт
export const LOGIN_URL = `${HOST}/api/login/`;

// Хук для выполнения выхода из аккаунта
export const LOGOUT_URL = `${HOST}/api/logout/`;

// Хук для выполнения выхода из аккаунта на всех устройствах, на которых до этого был выполнен вход
export const LOGOUT_ALL_DEVICES_URL = `${HOST}/api/logout_all_devices/`;

// Хук для получения аккаунта по переданному токену
export const CHECK_ACCOUNT_URL = `${HOST}/api/check_account/`;

// Хук для обновления отдельных полей аккаунта
export const UPDATE_ACCOUNT_URL = `${HOST}/api/update_account/`;

// Хук для получения списка данных полов
export const GENDER_LIST_URL = `${HOST}/api/gender_list/`;

// Максимальная длина имени пользователя
export const USERNAME_MAX_LEN = 30;