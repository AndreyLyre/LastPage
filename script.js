function saveText() {
    const text = document.getElementById('textInput').value;
    const dateTime = new Date(document.getElementById('dateTimeInput').value);

    if (text && dateTime) {
        const expirationTime = dateTime.getTime();
        localStorage.setItem('savedText', text);
        localStorage.setItem('expirationTime', expirationTime);
        alert('Text saved and will be available at the specified time.');
    } else {
        alert('Please fill in both text and date/time.');
    }
}

function checkAvailability() {
    const savedText = localStorage.getItem('savedText');
    const expirationTime = localStorage.getItem('expirationTime');
    const currentTime = new Date().getTime();

    if (savedText && expirationTime) {
        if (currentTime >= expirationTime) {
            document.getElementById('textInput').style.display = 'none';
            document.getElementById('dateTimeInput').style.display = 'none';
            document.getElementById('textContainer').style.display = 'block';
            document.getElementById('displayText').innerText = savedText;
        } else {
            document.getElementById('textInput').style.display = 'none';
            document.getElementById('dateTimeInput').style.display = 'none';
            document.getElementById('textContainer').style.display = 'none';
            alert('The text will be available at the specified time.');
        }
    }
}

// Run the check on page load
checkAvailability();
