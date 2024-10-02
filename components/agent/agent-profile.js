export function AgentProfile() {
    return fetch(BASE_URL + 'pages/agent/agent-profile.html')
        .then(response => response.text())
        .then(data => data);
}
