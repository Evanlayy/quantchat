document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendMessage');
    const guideOverlay = document.getElementById('guideOverlay');
    const startChatButton = document.getElementById('startChat');
    const scanSound = document.getElementById('scanSound');
    
    // Play scan sound when page loads
    scanSound.volume = 0.3; // Adjust volume (0.0 to 1.0)
    
    // Handle guide popup and animations
    startChatButton.addEventListener('click', function() {
        // Play scan sound
        scanSound.currentTime = 0; // Reset sound to start
        scanSound.play();
        
        // Fade out overlay
        guideOverlay.style.opacity = '0';
        
        setTimeout(() => {
            guideOverlay.style.display = 'none';
            
            // Get chat container and start scan
            const chatContainer = document.querySelector('.chat-container');
            const scanningLine = document.querySelector('.scanning-line');
            
            // Reset scanning line position
            scanningLine.style.top = '-100%';
            
            // Start scanning
            chatContainer.classList.add('scanning');
            
            // After scan completes, show first message
            setTimeout(() => {
                chatContainer.classList.remove('scanning');
                addMessage("Hello trader! How was your trading day? Did you follow your strategy?", 'genie');
            }, 3000);
        }, 500);
    });

    // Add fade out transition
    guideOverlay.style.transition = 'opacity 0.5s ease';

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        messageDiv.textContent = text;
        
        // Add glowing effect on new message
        messageDiv.style.animation = 'glowPulse 1s ease-in-out';
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleUserInput() {
        const text = userInput.value.trim();
        if (text) {
            addMessage(text, 'user');
            userInput.value = '';
            
            // Simulate AI thinking with typing indicator
            setTimeout(() => {
                generateResponse(text);
            }, 1000);
        }
    }

    function generateResponse(userText) {
        // Simple response logic - can be replaced with actual AI integration
        let response;
        if (userText.toLowerCase().includes('good') || userText.toLowerCase().includes('great')) {
            response = "That's fantastic! Remember to journal your successful trades and learn from them. What was your best trade today?";
        } else if (userText.toLowerCase().includes('bad') || userText.toLowerCase().includes('lost')) {
            response = "Keep your head up! Every trader faces challenging days. Did you stick to your risk management rules?";
        } else {
            response = "Tell me more about your trading decisions today. Did you spot any particular patterns in the market?";
        }
        addMessage(response, 'genie');
    }

    sendButton.addEventListener('click', handleUserInput);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    });

    // Add hover effects for buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.transform = 'scale(1.05)';
        });
        button.addEventListener('mouseout', () => {
            button.style.transform = 'scale(1)';
        });
    });

    addRandomGlitches();
});

function addRandomGlitches() {
    const statusItems = document.querySelectorAll('.status-item:not(.error)');
    
    setInterval(() => {
        const randomItem = statusItems[Math.floor(Math.random() * statusItems.length)];
        randomItem.classList.add('glitch-effect');
        
        setTimeout(() => {
            randomItem.classList.remove('glitch-effect');
        }, 200);
    }, 5000);
} 