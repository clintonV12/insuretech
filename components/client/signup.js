export function Signup() {
    return fetch(BASE_URL + 'pages/client/signup.html')
        .then(response => response.text())
        .then(data => data);
}
