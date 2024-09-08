document.getElementById('countdownForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get input values
    const text = document.getElementById('text').value;
    const date = new Date(document.getElementById('date').value);
    
    // Validate date
    if (isNaN(date.getTime())) {
        alert('Invalid date');
        return;
    }
    
    // Create a unique link for the countdown page
    const countdownLink = `countdown.html?text=${encodeURIComponent(text)}&date=${encodeURIComponent(date.toISOString())}`;
    
    // Show the result
    document.getElementById('countdownLink').href = countdownLink;
    document.getElementById('countdownLink').textContent = countdownLink;
    document.getElementById('countdownFrame').src = countdownLink;
    document.getElementById('result').style.display = 'block';
});
