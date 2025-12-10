# Admin Panel Documentation

The admin panel (`admin.html`) is the control interface for the Hive Mind game. It allows the game host to manage questions, answers, and control the game flow.

## Interface Overview

The admin panel consists of several key components:

1. **Round Selector**: Dropdown menu to choose between 5 different rounds
2. **Question Display**: Shows the current question for the selected round
3. **Answer Controls**: Toggle buttons to reveal/hide answers on the board
4. **Wrong Answer Button**: Triggers a wrong answer sound effect and visual
5. **Reset Button**: Resets the game state on the board
6. **Answer Editor**: Interface to edit questions and answers

## Features and Functionality

### Round Selection

- Dropdown menu with 5 round options (Soal 1 through Soal 5)
- Automatically loads the default questions and answers for each round
- Changing rounds saves current data and loads the new round's data

### Question Management

- Displays the current question at the top of the interface
- Questions are predefined in the `questions` array in `admin.js`
- Questions can be customized by modifying the JavaScript code

### Answer Controls

Eight toggle buttons labeled "Buka 1" through "Buka 8":
- Click to reveal an answer on the board display
- Button text changes to "Tutup X" when an answer is revealed
- Button styling changes to indicate open state

### Sound Effects

- ❌ SUARA SALAH button triggers a wrong answer sound effect
- Sound is played on the board display with a large "X" overlay
- Overlay automatically disappears after 2 seconds

### Game Reset

- 🔄 RESET GAME button resets all answers to hidden state
- Confirmation dialog prevents accidental resets
- Resets both admin panel and board display

### Answer Editor

- Editable fields for each answer text and score
- Real-time editing with immediate input feedback
- Update button sends all changes to the board display
- Data persistence using browser localStorage

## Technical Implementation

### Communication

The admin panel uses BroadcastChannel API to communicate with the board display:

```javascript
const gameChannel = new BroadcastChannel('stranger_channel');
```

Message types sent to the board:
- `UPDATE_DATA`: Sends updated questions and answers
- `TOGGLE`: Reveals or hides a specific answer
- `WRONG_SOUND`: Triggers wrong answer sound and visual
- `RESET`: Resets all answers to hidden state

### Data Persistence

Game data is stored in browser's localStorage:
- Key: `savedAllRoundsData`
- Data structure: Array of rounds, each containing 8 answer objects
- Automatic saving when switching rounds or updating data

### Default Data

The application includes default data for all 5 rounds:
1. Alasan begadang mahasiswa
2. Barang haram ketinggalan
3. Tempat makan andalan
4. Hal menakutkan bagi mahasiswa
5. Kegiatan di Lab selain praktikum

Each round has 8 predefined answers with associated scores.