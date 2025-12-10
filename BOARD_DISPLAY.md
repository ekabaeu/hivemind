# Board Display Documentation

The board display (`board.html`) is the presentation interface for the Hive Mind game. It shows questions and answers to participants and provides visual and audio feedback during gameplay.

## Interface Overview

The board display consists of several key components:

1. **Header Title**: "HIVE MIND - WELCOME PARTY TRM 2025"
2. **Round Indicator**: Shows the current round number
3. **Question Display**: Shows the current question
4. **Answer Cards**: 8 cards that display answers when revealed
5. **Wrong Answer Overlay**: Large "X" display for wrong answers

## Visual Design

### Answer Cards

Each answer is displayed in a card with a flip animation:
- **Front**: Shows only the number with a red glow effect
- **Back**: Displays the answer text and score in a red gradient background
- **Hover Effects**: Cards lift slightly and glow when hovered
- **Reveal Animation**: Smooth flip animation when answers are revealed

### Color Scheme

- **Background**: Deep navy blue gradient
- **Text**: Light gray for most elements, gold for headers
- **Cards**: Dark background with red accents
- **Highlights**: Gold accents for important elements

### Animations and Effects

- **Breathing Animation**: Subtle glow effect on cards
- **Flip Animation**: Smooth transition when revealing answers
- **Wrong Answer Effect**: Full-screen "X" overlay with glitch animation
- **Particle Effects**: Subtle background particles for atmosphere

## Features and Functionality

### Question Display

- Shows the current question at the top of the board
- Updates automatically when admin changes rounds
- Styled with gold text and subtle glow effect

### Round Indicator

- Displays the current round number (SOAL 1-5)
- Updates automatically when admin changes rounds
- Prominently displayed for easy identification

### Answer Cards

Eight answer cards arranged in a 2x4 grid:
- Numbered 1-8
- Initially show only the number on the front
- Reveal answer text and score when triggered by admin
- Visual feedback when hovered

### Wrong Answer Display

- Full-screen red overlay with large "X"
- Glitch animation effect for visual impact
- Automatically disappears after 2 seconds
- Accompanied by wrong answer sound effect

### Sound Effects

The board plays audio feedback for game events:
- **Correct Answer**: Family Feud-style "good answer" sound
- **Wrong Answer**: Family Feud-style buzzer sound
- Audio requires initial user interaction to enable playback

## Technical Implementation

### Communication

The board display uses BroadcastChannel API to receive messages from the admin panel:

```javascript
const gameChannel = new BroadcastChannel('stranger_channel');
```

Message types received from admin:
- `UPDATE_DATA`: Updates questions, answers, and round information
- `TOGGLE`: Reveals or hides a specific answer
- `WRONG_SOUND`: Triggers wrong answer sound and visual
- `RESET`: Resets all answers to hidden state

### Data Handling

- Stores current answer data in `localData` array
- Maintains current round and question information
- Renders cards dynamically based on data
- Resets card states when rounds change

### Audio Management

- Uses HTML5 Audio API for sound effects
- Preloads audio files for better performance
- Handles browser autoplay restrictions
- Includes error handling for audio playback failures

### Visual Effects

- CSS animations for card flipping and breathing effects
- JavaScript-driven overlay display for wrong answers
- Glitch animation for wrong answer overlay
- Responsive design using CSS Grid and Flexbox

## Browser Compatibility

- Requires modern browser with BroadcastChannel API support
- CSS features may not work in older browsers
- Audio autoplay requires user interaction in most browsers
- Best experienced in Chrome, Firefox, Edge, or Safari