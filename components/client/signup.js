export function Signup() {
    return fetch('/insuretech/pages/client/signup.html')
        .then(response => response.text())
        .then(data => data);
}
