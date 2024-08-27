export function AgentDashboard() {
    return fetch('/insuretech/pages/agent/agent-dashboard.html')
        .then(response => response.text())
        .then(data => data);
}
