export function Policy() {
    return fetch(BASE_URL + 'pages/client/policy.html')
        .then(response => response.text())
        .then(data => data);
}
