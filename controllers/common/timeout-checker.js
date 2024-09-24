let timeout;
const inactivityTime = 30 * 60 * 1000; // 30 minutes in milliseconds

// Function to run after 30 minutes of inactivity
function runAfterInactivity() {
    console.log("Running function due to inactivity.");
    // Your logic here
}

// Reset the inactivity timer
function resetTimer() {
    clearTimeout(timeout);
    timeout = setTimeout(runAfterInactivity, inactivityTime);
}

// Set up event listeners for user activity
window.onload = resetTimer;           // When the window loads
document.onmousemove = resetTimer;    // When the mouse is moved
document.onkeypress = resetTimer;     // When a key is pressed
document.ontouchstart = resetTimer;   // For touch devices
document.onclick = resetTimer;        // On mouse click
document.onscroll = resetTimer;       // On scroll

// Initialize the inactivity timer
resetTimer();