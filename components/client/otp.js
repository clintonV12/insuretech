export function OTP() {
    return fetch('/insuretech/pages/client/otp.html')
        .then(response => response.text())
        .then(data => data);
}
