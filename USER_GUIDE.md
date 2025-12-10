# Hive Mind User Guide

This guide provides instructions for using the Hive Mind game application for the TRM 2025 Welcome Party.

## Getting Started

### System Requirements

- A modern web browser (Chrome, Firefox, Edge, or Safari)
- Computer with speakers or audio output
- Two browser windows or tabs for full functionality

### Installation

1. Download or clone the project files to your computer
2. Locate the project folder containing:
   - `admin.html`
   - `admin.js`
   - `board.html`
   - `board.js`
   - `stranger-things.css`
3. No additional installation is required

### Opening the Application

1. Open `admin.html` in your browser (this is the control panel)
2. Open `board.html` in your browser (this is the display for participants)
3. For best experience, place the admin panel on your laptop screen and the board display on a projector or large monitor

## Using the Admin Panel

### Interface Overview

The admin panel allows you to control all aspects of the game:

1. **Round Selector**: Choose between 5 different rounds
2. **Question Display**: Shows the current question
3. **Answer Controls**: Buttons to reveal answers
4. **Sound Controls**: Trigger wrong answer effects
5. **Reset Button**: Reset the game state
6. **Answer Editor**: Modify questions and answers

### Controlling the Game

#### Selecting a Round

1. Use the dropdown menu labeled "PILIH SOAL"
2. Choose from Soal 1 through Soal 5
3. The interface will automatically load the selected round's data

#### Revealing Answers

1. Click the "Buka X" buttons to reveal answers on the board
2. The button text will change to "Tutup X" when an answer is revealed
3. Click "Tutup X" to hide the answer again

#### Triggering Wrong Answer Effects

1. Click the "❌ SUARA SALAH" button when a team gives a wrong answer
2. The board will display a large "X" and play a buzzer sound
3. The effect automatically disappears after 2 seconds

#### Resetting the Game

1. Click the "🔄 RESET GAME" button to hide all revealed answers
2. A confirmation dialog will appear to prevent accidental resets
3. Click "OK" to confirm the reset

### Editing Questions and Answers

#### Modifying Answers

1. Locate the "EDIT JAWABAN" section
2. Edit the text in the answer fields
3. Modify the scores in the number fields
4. Click "📡 UPDATE KE LAYAR" to send changes to the board

#### Saving Your Changes

Changes are automatically saved to your browser's storage:
- Data persists between browser sessions
- Each round's data is saved separately
- Data is specific to your browser and device

## Using the Board Display

### What Participants See

The board display shows:
- The event title: "HIVE MIND - WELCOME PARTY TRM 2025"
- Current round indicator: "SOAL X"
- The current question
- Eight answer cards numbered 1-8

### Answer Reveal Effects

When answers are revealed from the admin panel:
- Cards flip smoothly to show the answer text and score
- A sound effect plays for revealed answers
- Revealed cards have a gold border highlight

### Wrong Answer Effects

When the wrong answer button is pressed:
- A full-screen red overlay appears with a large "X"
- A buzzer sound effect plays
- The overlay automatically disappears after 2 seconds

## Game Flow Recommendations

### Before Starting

1. Open both the admin panel and board display
2. Test audio by clicking the wrong answer button on the board once
3. Verify all rounds display correctly
4. Familiarize yourself with the controls

### During Gameplay

1. Select the first round using the dropdown
2. Read the question aloud to participants
3. Reveal answers as teams guess them
4. Use the wrong answer button for incorrect guesses
5. Reset between rounds as needed

### Between Rounds

1. Select the next round from the dropdown
2. Update any answers if needed
3. Click "📡 UPDATE KE LAYAR" to refresh the board
4. Reset the board to hide all answers

## Troubleshooting

### Common Issues and Solutions

#### Board Not Updating

- Ensure both admin and board are opened in the same browser
- Click "📡 UPDATE KE LAYAR" to force a refresh
- Refresh both browser windows if they become out of sync

#### Sound Not Working

- Click anywhere on the board display once to enable audio
- Check your computer's volume settings
- Ensure your browser allows audio playback

#### Data Not Saving

- Verify you're using the same browser for subsequent sessions
- Check that browser storage is not full
- Try refreshing the admin panel

#### Cards Not Flipping

- Refresh both the admin panel and board display
- Check that both windows are in the same browser
- Ensure JavaScript is enabled in your browser

### Browser Compatibility

The application works best in:
- Google Chrome (recommended)
- Mozilla Firefox
- Microsoft Edge
- Safari

Some features may not work properly in older browsers or Internet Explorer.

## Customization

### Adding New Rounds

To add new rounds, you'll need to modify the JavaScript files:

1. Add a new question to the `questions` array in `admin.js`
2. Add a new set of answers to the `defaultRoundsData` array
3. Update the round selector options in `admin.html`

### Modifying Default Data

The default questions and answers can be changed in `admin.js`:
- Questions are in the `questions` array
- Answers and scores are in the `defaultRoundsData` array
- Changes take effect when the application is reloaded

## Tips for Game Hosts

### Preparation Tips

- Test the application before the event
- Prepare a backup plan in case of technical issues
- Have a microphone ready if presenting to a large group
- Familiarize yourself with all controls beforehand

### Gameplay Tips

- Keep the energy high and engage with participants
- Use the wrong answer effect sparingly for maximum impact
- Reset between rounds to maintain clean visuals
- Update answers before each round if needed

### Technical Tips

- Keep both windows visible but position them appropriately
- Close unnecessary browser tabs to maintain performance
- Have a browser refresh ready if needed
- Position your laptop where you can see both screens

## Event Setup Recommendations

### Display Setup

- Use a large screen or projector for the board display
- Position the admin panel on your laptop screen
- Ensure participants can clearly see all answers
- Test visibility from different areas of the room

### Audio Setup

- Connect to external speakers for better sound
- Test volume levels before the event
- Ensure the board display area has audio access
- Have a backup audio solution ready

### Seating Arrangement

- Arrange seating so all participants can see the board
- Ensure the game host has clear view of both screens
- Consider lighting that won't create glare on screens
- Allow space for team participation if applicable