export function About() {
    return fetch('/insuretech/pages/about.html')
        .then(response => response.text())
        .then(data => data);
}
