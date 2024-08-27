export function Policy() {
    return fetch('/insuretech/pages/client/policy.html')
        .then(response => response.text())
        .then(data => data);
}
