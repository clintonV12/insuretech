export function Price() {
    return fetch(BASE_URL + 'pages/price.html')
        .then(response => response.text())
        .then(data => data);
}
