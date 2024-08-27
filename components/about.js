export function About() {
    return fetch(BASE_URL + 'pages/about.html')
        .then(response => response.text())
        .then(data => data);
}
