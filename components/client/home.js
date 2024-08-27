export function Home() {
    return fetch('/insuretech/pages/client/home.html')
        .then(response => response.text())
        .then(data => data);
}
