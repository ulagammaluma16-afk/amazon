document.getElementById('generate-btn').addEventListener('click', processText);
document.getElementById('reset-btn').addEventListener('click', resetWorkspace);

function processText() {
    const inputText = document.getElementById('study-notes').value.trim();
    const btn = document.getElementById('generate-btn');
    const btnText = document.getElementById('btn-text');
    const btnSpinner = document.getElementById('btn-spinner');
    
    if (!inputText) {
        const textArea = document.getElementById('study-notes');
        textArea.placeholder = "Please paste some material here first before generating.";
        textArea.classList.add('error-pulse');
        setTimeout(() => textArea.classList.remove('error-pulse'), 1000);
        return;
    }

    btn.disabled = true;
    btnText.innerText = "Analyzing...";
    btnSpinner.classList.remove('hidden');

    setTimeout(() => {
        document.getElementById('input-section').classList.add('hidden');
        
        document.getElementById('ai-summary').innerText = 
            "The system has processed the text and extracted core engineering principles, isolating primary functional components and their operational limits.";
        
        const flashcardsHTML = `
            <div class="flashcard" onclick="this.classList.toggle('revealed')">
                <div class="fc-label">Question</div>
                <div class="fc-content">What is the primary function of the component described?</div>
                <div class="fc-answer">It isolates specific frequency signals while attenuating higher-frequency noise to ensure systemic stability.</div>
            </div>
            <div class="flashcard" onclick="this.classList.toggle('revealed')">
                <div class="fc-label">Question</div>
                <div class="fc-content">How is the critical cutoff threshold calculated?</div>
                <div class="fc-answer">It is determined by the inverse product of the system's resistance and capacitance values (1 / 2πRC).</div>
            </div>
        `;
        
        document.getElementById('flashcards-container').innerHTML = flashcardsHTML;
        
        document.getElementById('results-area').classList.remove('hidden');
        
        btn.disabled = false;
        btnText.innerText = "Generate Assets";
        btnSpinner.classList.add('hidden');
        
    }, 2000);
}

function resetWorkspace() {
    document.getElementById('study-notes').value = '';
    document.getElementById('study-notes').placeholder = "Paste ECE coursework text here (e.g., semiconductor physics, IoT systems, or signal processing)...";
    document.getElementById('results-area').classList.add('hidden');
    document.getElementById('input-section').classList.remove('hidden');
}