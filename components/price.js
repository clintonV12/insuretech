export function Price() {
    return fetch('/insuretech/pages/price.html')
        .then(response => response.text())
        .then(data => data);
}
