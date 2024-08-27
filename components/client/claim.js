export function Claim() {
    return fetch('/insuretech/pages/client/claims.html')
        .then(response => response.text())
        .then(data => data);
}
