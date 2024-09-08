document.getElementById('countdownForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const text = document.getElementById('text').value;
    const date = new Date(document.getElementById('date').value);
    const time = document.getElementById('time').value;
    
    const [hours, minutes] = time.split(':').map(Number);
    date.setUTCHours(hours, minutes, 0, 0);
    
    if (isNaN(date.getTime())) {
        alert('Invalid date');
        return;
    }
    
    const token = Math.random().toString(36).substr(2, 9);
    const countdownData = JSON.stringify({
        text: text,
        date: date.toISOString()
    });
    const encodedData = btoa(countdownData);
    
    sessionStorage.setItem(token, encodedData);
    
    const countdownLink = `countdown.html?token=${token}`;
    
    document.getElementById('countdownLink').href = countdownLink;
    document.getElementById('countdownLink').textContent = countdownLink;
    document.getElementById('result').style.display = 'block';
});
