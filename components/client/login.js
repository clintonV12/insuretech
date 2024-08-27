export function Login() {
    return fetch('/insuretech/pages/client/login.html')
        .then(response => response.text())
        .then(data => data);
}
