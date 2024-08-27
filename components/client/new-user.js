export function NewUser() {
    return fetch('/insuretech/pages/client/new-user.html')
        .then(response => response.text())
        .then(data => data);
}
