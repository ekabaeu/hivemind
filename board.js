const gameChannel = new BroadcastChannel('stranger_channel');
const board = document.getElementById('board');
const roundIndicator = document.getElementById('roundIndicator');

// Data Default (Akan ditimpa oleh Admin)
let localData = Array(8).fill({ text: "...", score: 0 });
let currentRound = 0;

// Generate 8 Slot Kosong
function renderBoard() {
    board.innerHTML = '';
    localData.forEach((data, i) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.id = `card-${i}`;
        card.innerHTML = `
            <div class="card-front"><div class="num-circle">${i+1}</div></div>
            <div class="card-back">
                <span>${data.text}</span>
                <span>${data.score}</span>
            </div>
        `;
        board.appendChild(card);
    });
}

// Audio Effects (Gunakan sound horror/retro)
// Note: Browser memblokir audio otomatis tanpa interaksi user.
// Klik di halaman board sekali sebelum main agar suara jalan.
const soundWrong = new Audio('https://www.myinstants.com/media/sounds/family-feud-buzzer.mp3');
const soundCorrect = new Audio('https://www.myinstants.com/media/sounds/family-feud-good-answer.mp3');

// Preload audio files
[soundWrong, soundCorrect].forEach(sound => {
    sound.preload = 'auto';
});

// Listener Sinyal dari Admin
gameChannel.onmessage = (event) => {
    const msg = event.data;

    switch (msg.type) {
        case 'UPDATE_DATA':
            // Update teks jawaban secara real-time
            localData = msg.data;
            currentRound = msg.round || 0;
            roundIndicator.textContent = `SOAL ${currentRound + 1}`;
            renderBoard(); // Render ulang dengan teks baru
            // Reset all cards to closed state when switching rounds
            document.querySelectorAll('.card').forEach(c => c.classList.remove('is-open'));
            break;
        case 'TOGGLE':
            const card = document.getElementById(`card-${msg.index}`);
            if (msg.isOpen) {
                card.classList.add('is-open');
                soundCorrect.currentTime = 0;
                soundCorrect.play();
            } else {
                card.classList.remove('is-open');
            }
            break;
        case 'WRONG_SOUND':
            const overlay = document.getElementById('wrongOverlay');
            overlay.style.display = 'flex';
            soundWrong.currentTime = 0;
            soundWrong.play();
            setTimeout(() => { overlay.style.display = 'none'; }, 2000);
            break;
        case 'RESET':
            document.querySelectorAll('.card').forEach(c => c.classList.remove('is-open'));
            break;
    }
};

// Initial render
renderBoard();