export function Home() {
    return fetch(BASE_URL + 'pages/client/home.html')
        .then(response => response.text())
        .then(data => data);
}
