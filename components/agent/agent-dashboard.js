export function AgentDashboard() {
    return fetch(BASE_URL + 'pages/agent/agent-dashboard.html')
        .then(response => response.text())
        .then(data => data);
}
