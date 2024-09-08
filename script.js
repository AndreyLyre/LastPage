document.getElementById('countdownForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get input values
    const text = document.getElementById('text').value;
    const date = new Date(document.getElementById('date').value);
    const time = document.getElementById('time').value;
    
    // Set time to the date object
    const [hours, minutes] = time.split(':').map(Number);
    date.setUTCHours(hours, minutes, 0, 0); // Set hours, minutes, seconds, milliseconds in UTC

    // Validate date
    if (isNaN(date.getTime())) {
        alert('Invalid date');
        return;
    }
    
    // Generate a random unique token
    const token = Math.random().toString(36).substr(2, 9); // Random token with 9 characters
    
    // Encode data to Base64
    const countdownData = JSON.stringify({
        text: text,
        date: date.toISOString()
    });
    const encodedData = btoa(countdownData);

    // Store the data temporarily using sessionStorage
    sessionStorage.setItem(token, encodedData);

    // Log for debugging
    console.log(`Stored data with token ${token}:`, encodedData);

    // Create a unique link for the countdown page
    const countdownLink = `countdown.html?token=${token}`;
    
    // Show the result
    const resultElement = document.getElementById('result');
    const countdownLinkElement = document.getElementById('countdownLink');
    countdownLinkElement.href = countdownLink;
    countdownLinkElement.textContent = countdownLink;
    resultElement.style.display = 'block';
});
