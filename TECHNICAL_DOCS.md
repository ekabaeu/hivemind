# Technical Documentation

This document provides detailed technical information about the Hive Mind application architecture, code structure, and implementation details for developers who may need to maintain or extend the application.

## Architecture Overview

The application follows a client-server-like pattern within the browser using modern web APIs:

### Communication Layer

- **BroadcastChannel API**: Enables real-time communication between admin and board interfaces
- **Message Passing**: Structured event system for all interactions
- **State Synchronization**: Automatic state updates across interfaces

### Data Layer

- **localStorage**: Persistent storage for game data
- **In-Memory State**: Active data management during sessions
- **Data Validation**: Built-in validation for game data

### Presentation Layer

- **Component-based UI**: Modular interface components
- **Event-driven Updates**: Reactive UI updates based on events
- **CSS-driven Animations**: Hardware-accelerated visual effects

## Code Structure

### File Organization

```
├── admin.html          # Admin control panel markup
├── admin.js            # Admin panel logic and data management
├── board.html          # Board display markup
├── board.js            # Board display logic and event handling
└── stranger-things.css # Shared styling and visual design
```

### Module Dependencies

- **admin.js** ↔ **board.js**: Communicate via BroadcastChannel
- **Both HTML files**: Reference stranger-things.css for styling
- **No external dependencies**: Pure HTML, CSS, and JavaScript

## Admin Panel Implementation

### Core Variables

```javascript
const gameChannel = new BroadcastChannel('stranger_channel');
let currentRound = 0;
let answersState = Array(8).fill(false);
```

### Data Structures

#### Questions Array

```javascript
const questions = [
  "Question 1?",
  "Question 2?",
  // ... 5 total questions
];
```

#### Round Data Structure

```javascript
const defaultRoundsData = [
  // Round 1
  [
    { text: "ANSWER 1", score: 35 },
    { text: "ANSWER 2", score: 25 },
    // ... 8 answers per round
  ],
  // ... 5 rounds total
];
```

### Key Functions

#### renderRound()

Responsible for generating the UI elements for the current round:
- Creates toggle buttons for each answer
- Generates input fields for editing answers
- Updates the question display
- Sets up event listeners

#### switchRound()

Handles round transitions:
- Saves current round data to localStorage
- Loads new round data
- Re-renders the interface
- Updates the board with new data

#### pushDataToBoard()

Sends updated data to the board display:
- Collects data from input fields
- Updates local gameData array
- Saves to localStorage
- Sends UPDATE_DATA message to board

#### toggleAnswer(index)

Controls answer visibility:
- Updates answersState array
- Toggles button styling
- Sends TOGGLE message to board

### Event Handling

#### BroadcastChannel Events

The admin panel sends these message types:
- `UPDATE_DATA`: Complete data refresh
- `TOGGLE`: Individual answer state change
- `WRONG_SOUND`: Trigger wrong answer effect
- `RESET`: Reset all answers

#### DOM Events

- `onchange` for round selector
- `onclick` for buttons
- `onload` for initial rendering

## Board Display Implementation

### Core Variables

```javascript
const gameChannel = new BroadcastChannel('stranger_channel');
const board = document.getElementById('board');
```

### Data Management

#### Local Data Storage

```javascript
let localData = Array(8).fill({ text: "...", score: 0 });
let currentRound = 0;
let currentQuestion = "";
```

### Key Functions

#### renderBoard()

Generates the visual representation of answers:
- Creates card elements for each answer
- Sets up front/back card structure
- Applies appropriate styling classes
- Attaches necessary IDs for targeting

#### resetAllCards()

Resets visual state of all cards:
- Removes "is-open" class from all cards
- Ensures consistent starting state

### Event Handling

#### BroadcastChannel Events

The board listens for these message types:
- `UPDATE_DATA`: Refreshes all displayed data
- `TOGGLE`: Changes individual answer visibility
- `WRONG_SOUND`: Triggers wrong answer effect
- `RESET`: Resets all answers to hidden state

#### Audio Management

```javascript
const soundWrong = new Audio('sound-url');
const soundCorrect = new Audio('sound-url');
```

Audio handling includes:
- Preloading for better performance
- Error handling for playback failures
- User interaction requirements for autoplay

## CSS Implementation

### CSS Architecture

#### Variables System

```css
:root {
  --color-dark: #0d0d1a;
  --color-accent: #8a0303;
  /* ... other variables */
}
```

#### Component-based Styling

- **Card Components**: Reusable card styling
- **Button Components**: Consistent button design
- **Layout Components**: Grid and flexbox patterns
- **Animation Components**: Reusable animation definitions

### Responsive Design

#### Media Queries

Breakpoints are handled through:
- Flexible units (%, em, rem)
- CSS Grid for layout flexibility
- Flexbox for content arrangement
- Relative sizing for text and elements

#### Mobile Considerations

- Touch-friendly button sizes
- Appropriate spacing for fingers
- Orientation-aware layouts
- Performance optimization for mobile devices

## Performance Considerations

### Optimization Strategies

#### DOM Manipulation

- Minimal DOM queries with cached references
- Batched DOM updates where possible
- Efficient element creation and destruction
- Proper event listener management

#### Memory Management

- Avoiding memory leaks through proper cleanup
- Efficient data structures for game state
- LocalStorage usage for persistence without server
- Garbage collection friendly code patterns

#### Rendering Performance

- CSS transforms for animations
- Hardware acceleration for visual effects
- Efficient repaint and reflow management
- Optimized image and asset usage

## Browser Compatibility

### Supported Features

#### JavaScript APIs

- BroadcastChannel API (modern browsers)
- localStorage API (widely supported)
- Audio API (HTML5 standard)
- Modern ES6+ features

#### CSS Features

- CSS Variables (modern browsers)
- CSS Grid and Flexbox
- Advanced animations and transitions
- Modern pseudo-selectors

### Fallback Strategies

#### Progressive Enhancement

- Core functionality works without advanced features
- Graceful degradation for unsupported features
- Clear error messages for missing capabilities
- Alternative interaction methods where possible

## Security Considerations

### Client-side Security

- No server communication reduces attack surface
- localStorage data is origin-restricted
- No external dependencies minimize risks
- Pure client-side execution

### Data Handling

- Input sanitization for user-editable fields
- Safe string handling for text content
- Proper error handling for edge cases
- No sensitive data storage requirements

## Extensibility Guide

### Adding New Features

#### New Message Types

To add new communication features:
1. Define new message type constants
2. Implement sender in admin.js
3. Add handler in board.js
4. Test bidirectional communication

#### New UI Components

To add new interface elements:
1. Add markup to appropriate HTML file
2. Style with CSS components
3. Add JavaScript functionality
4. Connect to BroadcastChannel events

#### Data Extensions

To extend data structures:
1. Update data arrays in admin.js
2. Modify rendering functions
3. Update localStorage handling
4. Ensure backward compatibility

### Customization Points

#### Styling Customization

- CSS variables for easy theme changes
- Modular component styling
- Consistent class naming conventions
- Well-documented style hierarchy

#### Functional Customization

- Event-driven architecture for easy extension
- Clear separation of concerns
- Well-defined data interfaces
- Comprehensive error handling

## Testing Considerations

### Manual Testing

#### Interface Testing

- Verify all buttons function correctly
- Check all visual states display properly
- Test all round transitions
- Validate data persistence

#### Cross-browser Testing

- Test in Chrome, Firefox, Edge, Safari
- Verify audio functionality in each browser
- Check visual consistency across browsers
- Validate localStorage behavior

### Debugging Features

#### Console Logging

- Event tracking in console
- Error reporting for failed operations
- State change notifications
- Performance monitoring hooks

#### Development Helpers

- Timeout-based initialization for sync
- Clear error messages for common issues
- Visual indicators for state changes
- Debug-friendly code structure

## Deployment Considerations

### Hosting Requirements

- Static file hosting (no server required)
- HTTPS recommended for audio autoplay
- Modern browser support
- No special server configurations needed

### File Distribution

- All files must be in same origin for BroadcastChannel
- Audio files should be accessible via HTTPS
- CSS and JS files properly linked
- No external CDN dependencies

### Performance Optimization

#### File Size Optimization

- Minify CSS and JavaScript for production
- Optimize audio files for web use
- Remove unused CSS rules
- Combine files where appropriate

#### Loading Optimization

- Efficient resource loading order
- Preload critical assets
- Lazy loading for non-critical resources
- Caching strategies for static assets

## Maintenance Guidelines

### Code Updates

#### Updating Questions and Answers

1. Modify the `questions` array in admin.js
2. Update the `defaultRoundsData` structure
3. Test all rounds display correctly
4. Verify data persistence works

#### Adding New Rounds

1. Extend the questions array
2. Add new data to defaultRoundsData
3. Update the round selector in admin.html
4. Test new round functionality

### Troubleshooting

#### Common Issues

- **Communication failures**: Check same-origin and browser compatibility
- **Data persistence issues**: Verify localStorage availability
- **Audio problems**: Check user interaction requirements
- **Visual glitches**: Validate CSS support and hardware acceleration

#### Debugging Process

1. Check browser console for errors
2. Verify both windows are in same browser
3. Test BroadcastChannel functionality separately
4. Validate data structures and message formats