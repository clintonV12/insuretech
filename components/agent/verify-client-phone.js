export function VerifyClientPhone() {
    return fetch(BASE_URL + 'pages/agent/verify-client-phone.html')
        .then(response => response.text())
        .then(data => data);
}
