const quoteElement = document.getElementById('quote');
const userInput = document.getElementById('userInput');
const startButton = document.getElementById('startButton');
const timerElement = document.getElementById('time');
const resultElement = document.getElementById('result');
const wordCountSelect = document.getElementById('wordCount');
const durationSelect = document.getElementById('duration');

let timer;
let startTime;
let endTime;
let testDuration; // Duration of the test in seconds
let targetWords; // Number of words to type

// Quotes based on different word counts
const quotes = {
    27: "Through it all, the city endures. It is a mosaic of memories, a testament to resilience. From its historic landmarks to its modern marvels, it stands as a testament to human ingenuity and creativity.",
    28: "Yet, beneath the surface, there are whispers of stories untold. Dreams deferred, challenges faced, and triumphs celebrated silently weave their way into the fabric of the city. Behind every door lies a narrative waiting to unfold.",
    29: "The skyline transforms with the setting sun, painted in hues of orange and pink. Lights flicker on, casting a warm glow upon the streets below. Cafés buzz with conversation, and music spills out from lively bars.",
    30: "As night descends, the city takes on a new persona. Neon lights dance against the darkness, casting shadows that tell tales of intrigue. The hum of nightlife fills the air, a symphony of voices rising and falling like waves.",
    32: "Down narrow alleyways, hidden gems await discovery. Artisan shops with handcrafted treasures beckon the curious wanderer. The scent of freshly brewed coffee mingles with the aroma of freshly baked bread, creating an irresistible allure Thank You.",
    35: "At the heart of the city lies its beating pulse: the people. Diverse in culture, background, and aspirations, they form the lifeblood that courses through its veins. From artists to bankers, from students to CEOs, each plays a role in shaping its identity.",
    38: "As night descends, the city takes on a new persona. Neon lights dance against the darkness, casting shadows that tell tales of intrigue. The hum of nightlife fills the air, a symphony of voices rising and falling like waves for flying sky. And I Have Any Skills",
    41: "Amidst the chaos of honking horns and hurried footsteps, there are moments of tranquility. Parks dotted with trees provide a sanctuary, their branches swaying gently in the breeze. Here, children laugh as they chase butterflies, and elderly couples stroll hand in hand, reminiscing about days gone by for you.",
    46: "In the heart of the bustling city, where skyscrapers loom like giants and streets pulse with life, there exists a vibrant tapestry woven from the threads of countless stories. Each person, each building, each car speeding by contributes to the intricate weave that is urban existence.",
    
    
    


   
   
};

startButton.addEventListener('click', startTest);

function startTest() {
    const selectedWords = parseInt(wordCountSelect.value);
    const quoteText = quotes[selectedWords];

    userInput.value = '';
    userInput.disabled = false;
    userInput.focus();
    startButton.disabled = true;
    resultElement.textContent = '';

    quoteElement.textContent = quoteText;
    targetWords = selectedWords;
    testDuration = parseInt(durationSelect.value) * 60;
    userInput.addEventListener('input', checkTyping);
    startTime = new Date().getTime();
    endTime = startTime + testDuration * 1000; // Calculate end time
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const currentTime = new Date().getTime();
    const remainingTime = Math.max(0, endTime - currentTime);
    timerElement.textContent = Math.ceil(remainingTime / 1000);

    if (remainingTime <= 0) {
        endTest();
    }
}

function endTest() {
    clearInterval(timer);
    userInput.disabled = true;
    startButton.disabled = false;

    const typedText = userInput.value.trim();

    // Calculate words typed
    const typedWords = typedText.split(/\s+/).filter(word => word !== '').length;

    // Calculate accuracy percentage
    const accuracyPercentage = ((typedWords / targetWords) * 100).toFixed(2);

    // Display result
    let resultText = '';
    if (typedWords >= targetWords) {
        resultText = `Your typing speed: ${Math.round((typedWords / testDuration) * 60)} WPM`;
    } else {
        resultText = `You typed ${typedWords} words. Try again to reach ${targetWords} words.`;
    }
    resultText += `\nAccuracy: ${accuracyPercentage}%`;
    resultElement.textContent = resultText;
}

function checkTyping() {
    const typedText = userInput.value.trim();
    const typedWords = typedText.split(/\s+/).filter(word => word !== '').length;
    // Display the current count of words typed
    console.log(`Total words typed: ${typedWords}`);
    
    const currentTime = new Date().getTime();
    if (currentTime > endTime) {
        endTest();
        return;
    }
}
