function generateLink() {
    const text = document.getElementById('textInput').value;
    const dateTime = document.getElementById('dateTimeInput').value;

    if (text && dateTime) {
        const encodedText = encodeURIComponent(text);
        const encodedTime = encodeURIComponent(dateTime);

        const link = `${window.location.origin}${window.location.pathname}?text=${encodedText}&unlockTime=${encodedTime}`;
        document.getElementById('generatedLink').innerHTML = `<a href="${link}">Share this link</a>`;
    } else {
        alert('Please enter text and select a date/time.');
    }
}

function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function startCountdown(unlockTime) {
    const countdownElement = document.getElementById('countdown');
    const targetTime = new Date(unlockTime).getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = targetTime - now;

        if (distance < 0) {
            countdownElement.innerHTML = "Unlocked!";
            document.getElementById('displayText').style.display = 'block';
        } else {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    };

    updateCountdown(); // Initial call
    setInterval(updateCountdown, 1000); // Update every second
}

function checkUnlock() {
    const text = getUrlParameter('text');
    const unlockTime = getUrlParameter('unlockTime');

    if (text && unlockTime) {
        document.getElementById('setupContainer').style.display = 'none';
        const now = new Date().getTime();
        const targetTime = new Date(unlockTime).getTime();

        if (now >= targetTime) {
            document.getElementById('textContainer').style.display = 'block';
            document.getElementById('displayText').innerText = decodeURIComponent(text);
            document.getElementById('countdown').innerText = "Unlocked!";
        } else {
            document.getElementById('textContainer').style.display = 'block';
            document.getElementById('displayText').style.display = 'none';
            startCountdown(unlockTime);
        }
    }
}

// Run the unlock check when the page loads
checkUnlock();
