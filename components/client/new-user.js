export function NewUser() {
    return fetch(BASE_URL + 'pages/client/new-user.html')
        .then(response => response.text())
        .then(data => data);
}
