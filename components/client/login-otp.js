export function LoginOTP() {
    return fetch('/insuretech/pages/client/login-otp.html')
        .then(response => response.text())
        .then(data => data);
}
