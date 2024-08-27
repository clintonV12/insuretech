export function Claim() {
    return fetch(BASE_URL + 'pages/client/claims.html')
        .then(response => response.text())
        .then(data => data);
}
