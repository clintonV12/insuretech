export function AgentLogin() {
    return fetch('/insuretech/pages/agent/agent-login.html')
        .then(response => response.text())
        .then(data => data);
}
