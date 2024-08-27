export function AgentLogin() {
    return fetch(BASE_URL + 'pages/agent/agent-login.html')
        .then(response => response.text())
        .then(data => data);
}
