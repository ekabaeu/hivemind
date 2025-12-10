const gameChannel = new BroadcastChannel('stranger_channel');
const board = document.getElementById('board');
const roundIndicator = document.getElementById('roundIndicator');
const questionDisplay = document.getElementById('questionDisplay');

// Data Default (Akan ditimpa oleh Admin)
let localData = Array(8).fill({ text: "...", score: 0 });
let currentRound = 0;
let currentQuestion = "";

// Daftar soal untuk setiap round
const questions = [
    "Apa alasan utama mahasiswa PENS begadang sampai pagi?",
    "Barang apa yang 'Haram' kalau sampai ketinggalan saat berangkat kuliah?",
    "Sebutkan tempat makan atau area cari makan andalan mahasiswa PENS!",
    "Hal apa yang paling bikin mahasiswa PENS panik atau takut?",
    "Kegiatan apa yang sering dilakukan di dalam Lab selain praktikum?"
];

// Generate 8 Slot Kosong
function renderBoard() {
    board.innerHTML = '';
    localData.forEach((data, i) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.id = `card-${i}`;
        
        const cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        
        const numCircle = document.createElement('div');
        numCircle.className = 'num-circle';
        numCircle.textContent = i+1;
        cardFront.appendChild(numCircle);
        
        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        
        const textSpan = document.createElement('span');
        textSpan.textContent = data.text;
        
        const scoreSpan = document.createElement('span');
        scoreSpan.textContent = data.score;
        
        cardBack.appendChild(textSpan);
        cardBack.appendChild(scoreSpan);
        
        card.appendChild(cardFront);
        card.appendChild(cardBack);
        board.appendChild(card);
    });
}

// Helper function to reset all cards to closed state
function resetAllCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(c => c.classList.remove('is-open'));
}

// Audio Effects (Gunakan sound horror/retro)
// Note: Browser memblokir audio otomatis tanpa interaksi user.
// Klik di halaman board sekali sebelum main agar suara jalan.
const soundWrong = new Audio('https://www.myinstants.com/media/sounds/wrong_5.mp3');
const soundCorrect = new Audio('https://www.myinstants.com/media/sounds/family-feud-good-answer.mp3');

// Preload audio files
[soundWrong, soundCorrect].forEach(sound => sound.preload = 'auto');

// Listener Sinyal dari Admin
gameChannel.onmessage = (event) => {
    const msg = event.data;

    switch (msg.type) {
        case 'UPDATE_DATA':
            // Update teks jawaban secara real-time
            localData = msg.data;
            currentRound = msg.round || 0;
            currentQuestion = msg.question || "";
            roundIndicator.textContent = `SOAL ${currentRound + 1}`;
            questionDisplay.textContent = currentQuestion;
            renderBoard(); // Render ulang dengan teks baru
            // Reset all cards to closed state when switching rounds
            resetAllCards();
            break;
        case 'TOGGLE':
            const card = document.getElementById(`card-${msg.index}`);
            if (msg.isOpen) {
                card.classList.add('is-open');
                soundCorrect.currentTime = 0;
                soundCorrect.play().catch(e => console.log("Audio play failed:", e));
            } else {
                card.classList.remove('is-open');
            }
            break;
        case 'WRONG_SOUND':
            const overlay = document.getElementById('wrongOverlay');
            overlay.style.display = 'flex';
            soundWrong.currentTime = 0;
            soundWrong.play().catch(e => console.log("Audio play failed:", e));
            setTimeout(() => { overlay.style.display = 'none'; }, 2000);
            break;
        case 'RESET':
            resetAllCards();
            break;
    }
};

// Initial render
renderBoard();