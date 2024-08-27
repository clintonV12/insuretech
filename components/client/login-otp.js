export function LoginOTP() {
    return fetch(BASE_URL + 'pages/client/login-otp.html')
        .then(response => response.text())
        .then(data => data);
}
