export function Bill() {
    return fetch('/insuretech/pages/client/billing.html')
        .then(response => response.text())
        .then(data => data);
}
