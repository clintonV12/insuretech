export function OTP() {
    return fetch(BASE_URL + 'pages/client/otp.html')
        .then(response => response.text())
        .then(data => data);
}
