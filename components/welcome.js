export function Welcome() {
    return fetch('/insuretech/pages/welcome.html')
        .then(response => response.text())
        .then(data => data);
}
