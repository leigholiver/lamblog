import request from './request';

export const loginStates = {
    LOGGED_OUT: 0,
    LOGGING_IN: 1,
    LOGGED_IN:  2,
    ERROR:      3
}

export function currentLoginState() {
    let s = window.sessionStorage.getItem("loginState");
    if(!s) return loginStates.LOGGED_OUT;
    return parseInt(s);
}

export function getAuth(){
    return JSON.parse(window.sessionStorage.getItem("auth"));
}

export function logout(setLoginState) {
    window.sessionStorage.setItem("auth", null);
    window.sessionStorage.setItem("loginState", loginStates.LOGGED_OUT);
    setLoginState(loginStates.LOGGED_OUT);
}

export function login(setLoginState, username, password) {
    window.sessionStorage.setItem("loginState", loginStates.LOGGING_IN)
    setLoginState(loginStates.LOGGING_IN);
    request("POST", "/login", {
        'username': username,
        'password': password
    }).then((data) => {
        console.log(data);
        if(!data) {
            window.sessionStorage.setItem("loginState", loginStates.ERROR)
            setLoginState(loginStates.ERROR);
            return
        }
        window.sessionStorage.setItem("auth", JSON.stringify(data))
        window.sessionStorage.setItem("loginState", loginStates.LOGGED_IN)
        setLoginState(loginStates.LOGGED_IN);
    });
}