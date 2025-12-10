const gameChannel = new BroadcastChannel('stranger_channel');
let currentRound = 0;
let answersState = Array(8).fill(false);

// Default Data for 5 rounds
// Daftar soal untuk setiap round
const questions = [
    "Apa alasan utama mahasiswa TRM begadang sampai pagi?",
    "Barang apa yang 'Haram' kalau sampai ketinggalan saat berangkat kuliah?",
    "Sebutkan tempat makan atau area cari makan andalan mahasiswa TRM!",
    "Hal apa yang paling bikin mahasiswa TRM panik atau takut?",
    "Kegiatan apa yang sering dilakukan di dalam Lab selain praktikum?"
];

const defaultRoundsData = [
    // Soal 1: Alasan begadang
    [
        { text: "PROYEK AKHIR", score: 35 },
        { text: "NONGKRONG", score: 25 },
        { text: "LAPRAK", score: 15 },
        { text: "SCROLL MEDSOS", score: 9 },
        { text: "PUSH RANK", score: 6 },
        { text: "NONTON FILM", score: 5 },
        { text: "NGODING", score: 3 },
        { text: "OVERTHINKING", score: 2 }
    ],
    // Soal 2: Barang haram kalau ketinggalan
    [
        { text: "LAPTOP", score: 40 },
        { text: "CHARGER", score: 20 },
        { text: "KTM", score: 15 },
        { text: "PARFUM", score: 10 },
        { text: "JAS LAB", score: 6 },
        { text: "HP", score: 4 },
        { text: "DOMPET", score: 3 },
        { text: "EARPHONE", score: 2 }
    ],
    // Soal 3: Tempat makan andalan
    [
        { text: "AYAM MALAYSIA", score: 32 },
        { text: "CIBUS", score: 28 },
        { text: "FOODLAB", score: 15 },
        { text: "PENS MART", score: 8 },
        { text: "AYAM BAWANG PUTIH", score: 7 },
        { text: "KANTIN PPNS", score: 5 },
        { text: "BAKSO", score: 3 },
        { text: "TUNA SUWIR", score: 2 }
    ],
    // Soal 4: Hal paling menakutkan
    [
        { text: "TELAT", score: 30 },
        { text: "LAPTOP RUSAK", score: 25 },
        { text: "DEADLINE MEPET", score: 18 },
        { text: "DOSEN KILLER", score: 12 },
        { text: "SEMESTER ANTARA", score: 7 },
        { text: "LUPA SAVE", score: 4 },
        { text: "WIFI DOWN", score: 3 },
        { text: "SALAH KELAS", score: 1 }
    ],
    // Soal 5: Kegiatan di Lab selain praktikum
    [
        { text: "NUMPANG WIFI", score: 30 },
        { text: "TIDUR", score: 25 },
        { text: "MABAR", score: 15 },
        { text: "TUGAS LAIN", score: 12 },
        { text: "MAKAN", score: 8 },
        { text: "NGADEM", score: 6 },
        { text: "GOSIP", score: 3 },
        { text: "CHARGE HP", score: 1 }
    ]
];

// Initialize current round data
let allRoundsData = JSON.parse(localStorage.getItem('savedAllRoundsData')) || [...defaultRoundsData];
let gameData = [...allRoundsData[currentRound]];

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
        btn.textContent = `Buka ${i + 1}`;
        btn.id = `btn-${i}`;
        btn.onclick = () => toggleAnswer(i);
        grid.appendChild(btn);

        // 2. Buat Input Editor
        const row = document.createElement('div');
        row.className = 'editor-row';
        
        const span = document.createElement('span');
        span.style.padding = '8px';
        span.style.width = '20px';
        span.textContent = `${i+1}.`;
        
        const textInput = document.createElement('input');
        textInput.type = 'text';
        textInput.id = `txt-${i}`;
        textInput.value = data.text;
        textInput.placeholder = 'Jawaban';
        
        const scoreInput = document.createElement('input');
        scoreInput.type = 'number';
        scoreInput.id = `scr-${i}`;
        scoreInput.value = data.score;
        scoreInput.placeholder = 'Skor';
        
        row.appendChild(span);
        row.appendChild(textInput);
        row.appendChild(scoreInput);
        inputList.appendChild(row);
    });
    
    // Update round selector
    roundSelector.value = currentRound;
    
    // Update question display
    document.getElementById('questionDisplay').textContent = questions[currentRound];
}

renderRound();

// --- FUNGSI ---

function switchRound() {
    // Save current round data
    saveToLocalStorage();
    
    // Switch to new round
    currentRound = parseInt(roundSelector.value);
    gameData = [...allRoundsData[currentRound]];
    
    // Render new round
    renderRound();
    
    // Update board with new data
    pushDataToBoard();
}

// Helper function to save data to localStorage
function saveToLocalStorage() {
    allRoundsData[currentRound] = [...gameData];
    localStorage.setItem('savedAllRoundsData', JSON.stringify(allRoundsData));
}

function pushDataToBoard() {
    // Ambil data dari input dan update gameData
    gameData.forEach((data, i) => {
        data.text = document.getElementById(`txt-${i}`).value.toUpperCase();
        data.score = document.getElementById(`scr-${i}`).value;
    });
    
    // Simpan ke browser
    saveToLocalStorage();

    // Kirim ke Board
    gameChannel.postMessage({
        type: 'UPDATE_DATA',
        data: gameData,
        round: currentRound,
        question: questions[currentRound]
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
        btn.textContent = `Tutup ${index + 1}`;
    } else {
        btn.classList.remove('opened');
        btn.textContent = `Buka ${index + 1}`;
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
    const buttons = document.querySelectorAll('.btn-toggle');
    buttons.forEach((btn, i) => {
        btn.classList.remove('opened');
        btn.textContent = `Buka ${i + 1}`;
    });
}

// Kirim data saat admin baru dibuka (agar board sync kalau admin direfresh)
setTimeout(() => pushDataToBoard(), 1000);