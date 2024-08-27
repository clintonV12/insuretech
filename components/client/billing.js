export function Bill() {
    return fetch(BASE_URL + 'pages/client/billing.html')
        .then(response => response.text())
        .then(data => data);
}
