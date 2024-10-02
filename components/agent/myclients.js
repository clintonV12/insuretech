export function MyClientsInfo() {
    return fetch(BASE_URL + 'pages/agent/myclients.html')
        .then(response => response.text())
        .then(data => data);
}
