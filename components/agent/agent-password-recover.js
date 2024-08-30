export function AgentPasswordRecovery() {
    return fetch(BASE_URL + 'pages/agent/agent-password-recover.html')
        .then(response => response.text())
        .then(data => data);
}
