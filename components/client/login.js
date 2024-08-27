export function Login() {
    return fetch(BASE_URL + 'pages/client/login.html')
        .then(response => response.text())
        .then(data => data);
}
