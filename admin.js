const gameChannel = new BroadcastChannel('stranger_channel');
let currentRound = 0;
let answersState = Array(8).fill(false);

// Default Data for 5 rounds
let allRoundsData = [
    [
        { text: "DEMOGORGON", score: 40 },
        { text: "ELEVEN", score: 30 },
        { text: "HAWKINS", score: 20 },
        { text: "VECNA", score: 10 },
        { text: "DUSTIN", score: 0 },
        { text: "LUCAS", score: 0 },
        { text: "MAX", score: 0 },
        { text: "HOPPER", score: 0 }
    ],
    [
        { text: "UPSIDE DOWN", score: 35 },
        { text: "MIND FLAYER", score: 25 },
        { text: "EGGOS", score: 15 },
        { text: "ARGYLE", score: 10 },
        { text: "BINGO", score: 5 },
        { text: "SYNCHRONICITY", score: 0 },
        { text: "TUNNEL", score: 0 },
        { text: "GATE", score: 0 }
    ],
    [
        { text: "CHRISTMAS", score: 30 },
        { text: "LIGHTS", score: 25 },
        { text: "SNOW", score: 20 },
        { text: "SANTA", score: 15 },
        { text: "PRESENTS", score: 5 },
        { text: "FAMILY", score: 0 },
        { text: "TREE", score: 0 },
        { text: "CAROLING", score: 0 }
    ],
    [
        { text: "SCIENCE", score: 35 },
        { text: "LAB", score: 25 },
        { text: "EXPERIMENT", score: 20 },
        { text: "TEST SUBJECT", score: 10 },
        { text: "PSYCHIC", score: 5 },
        { text: "PORTAL", score: 0 },
        { text: "RESEARCH", score: 0 },
        { text: "FACILITY", score: 0 }
    ],
    [
        { text: "FRIENDS", score: 40 },
        { text: "GROUP", score: 25 },
        { text: "TEAM", score: 15 },
        { text: "SQUAD", score: 10 },
        { text: "CREW", score: 5 },
        { text: "PARTY", score: 0 },
        { text: "BAND", score: 0 },
        { text: "CLIQUE", score: 0 }
    ]
];

// Initialize current round data
let gameData = [...allRoundsData[currentRound]];

// Cek LocalStorage agar data tidak hilang saat refresh
if(localStorage.getItem('savedAllRoundsData')) {
    allRoundsData = JSON.parse(localStorage.getItem('savedAllRoundsData'));
    gameData = [...allRoundsData[currentRound]];
}

// --- INISIALISASI ---
const grid = document.getElementById('buttonGrid');
const inputList = document.getElementById('inputList');
const roundSelector = document.getElementById('roundSelector');

// Buat Tombol & Input
function renderRound() {
    // Clear existing elements
    grid.innerHTML = '';
    inputList.innerHTML = '';
    answersState.fill(false);
    
    gameData.forEach((data, i) => {
        // 1. Buat Tombol Kontrol
        const btn = document.createElement('button');
        btn.className = 'btn-toggle';
        btn.innerText = `Buka ${i + 1}`;
        btn.id = `btn-${i}`;
        btn.onclick = () => toggleAnswer(i);
        grid.appendChild(btn);

        // 2. Buat Input Editor
        const row = document.createElement('div');
        row.className = 'editor-row';
        row.innerHTML = `
            <span style="padding:8px; width:20px">${i+1}.</span>
            <input type="text" id="txt-${i}" value="${data.text}" placeholder="Jawaban">
            <input type="number" id="scr-${i}" value="${data.score}" placeholder="Skor">
        `;
        inputList.appendChild(row);
    });
    
    // Update round selector
    roundSelector.value = currentRound;
}

renderRound();

// --- FUNGSI ---

function switchRound() {
    // Save current round data
    allRoundsData[currentRound] = [...gameData];
    
    // Switch to new round
    currentRound = parseInt(roundSelector.value);
    gameData = [...allRoundsData[currentRound]];
    
    // Render new round
    renderRound();
    
    // Update board with new data
    pushDataToBoard();
}

function pushDataToBoard() {
    // Ambil data dari input
    gameData.forEach((data, i) => {
        data.text = document.getElementById(`txt-${i}`).value.toUpperCase();
        data.score = document.getElementById(`scr-${i}`).value;
    });
    
    // Simpan ke browser
    allRoundsData[currentRound] = [...gameData];
    localStorage.setItem('savedAllRoundsData', JSON.stringify(allRoundsData));

    // Kirim ke Board
    gameChannel.postMessage({
        type: 'UPDATE_DATA',
        data: gameData,
        round: currentRound
    });
    
    // Reset state tombol karena data berubah
    resetGameUIOnly();
    alert("Data terkirim ke Proyektor!");
}

function toggleAnswer(index) {
    answersState[index] = !answersState[index];
    const btn = document.getElementById(`btn-${index}`);
    
    if (answersState[index]) {
        btn.classList.add('opened');
        btn.innerText = `Tutup ${index + 1}`;
    } else {
        btn.classList.remove('opened');
        btn.innerText = `Buka ${index + 1}`;
    }

    gameChannel.postMessage({
        type: 'TOGGLE',
        index: index,
        isOpen: answersState[index]
    });
}

function sendWrong() {
    gameChannel.postMessage({ type: 'WRONG_SOUND' });
}

function resetGame() {
    if(!confirm("Reset status jawaban?")) return;
    resetGameUIOnly();
    gameChannel.postMessage({ type: 'RESET' });
}

function resetGameUIOnly() {
    answersState.fill(false);
    document.querySelectorAll('.btn-toggle').forEach((btn, i) => {
        btn.classList.remove('opened');
        btn.innerText = `Buka ${i + 1}`;
    });
}

// Kirim data saat admin baru dibuka (agar board sync kalau admin direfresh)
setTimeout(() => pushDataToBoard(), 1000);