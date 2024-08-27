export function Welcome() {
    return fetch(BASE_URL + 'pages/welcome.html')
        .then(response => response.text())
        .then(data => data);
}
