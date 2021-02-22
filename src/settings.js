export const HOST = 'http://127.0.0.1:8000'

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

// Максимальная длина текста в разделе "О себе"
export const ACCOUNT_DESCRIPTION_MAX_LEN = 1000;

// Хук для смены логина
export const CHANGE_LOGIN_URL = `${HOST}/api/change_login/`;

// Хук для смены пароля
export const CHANGE_PASSWORD_URL = `${HOST}/api/change_password/`;

//Хук для удаления аккаунта
export const REMOVE_ACCOUNT_URL = `${HOST}/api/remove_account/`

// Хук для работы с постами
export const POST_URL = `${HOST}/api/posts/`;

// Максимальная длина заголовка поста
export const POST_TITLE_MAX_LEN = 200;

// Максимальная длина текста поста
export const POST_TEXT_MAX_LEN = 10000;

// Хук для получения статистики аккаунта
export const ACCOUNT_STAT_URL = `${HOST}/api/account_stat/`;

// Хук для получения статистики отдельного поста
export const POST_STAT_URL = `${HOST}/api/post_stat/`;

// Хук для получения списка аккаунтов или аккаунта по его id
export const ACCOUNT_URL = `${HOST}/api/accounts/`;

// Хук для работы с комментариями
export const COMMENTS_URL = `${HOST}/api/comments/`;

// Максимальная длина комментария
export const COMMENT_MAX_LEN = 500;

// Хук для работы с лайками для постов
export const POST_LIKE_URL = `${HOST}/api/post_like/`;

// Хук для работы с лайками для комментариев
export const COMMENT_LIKE_URL = `${HOST}/api/comment_like/`;