# CSS Styling and Design Documentation

The `stranger-things.css` file provides a comprehensive styling solution for the Hive Mind game, featuring a Stranger Things-inspired theme with elegant dark styling and red accents.

## Design Concept

The design combines:
- **Stranger Things Aesthetic**: Dark themes with red and gold accents
- **Elegant Typography**: Cinzel for headers, Montserrat for body text
- **Interactive Elements**: Smooth animations and hover effects
- **Responsive Layout**: Adapts to different screen sizes

## Color Palette

The color scheme is defined using CSS variables:

```css
:root {
  --color-dark: #0d0d1a;        /* Deep navy blue */
  --color-accent: #8a0303;      /* Rich burgundy */
  --color-highlight: #d32f2f;   /* Vibrant red */
  --color-gold: #d4af37;        /* Metallic gold */
  --color-light: #e6e6e6;       /* Soft light gray */
}
```

### Color Usage

- **Dark Backgrounds**: `--color-dark` for main backgrounds
- **Accents**: `--color-gold` for headers and important elements
- **Highlights**: `--color-highlight` for interactive elements
- **Text**: `--color-light` for most text elements
- **Special Effects**: `--color-accent` for subtle accents

## Typography

### Fonts

Two Google Fonts are imported:
- **Cinzel**: Decorative serif font for headers
- **Montserrat**: Clean sans-serif font for body text

### Font Variables

```css
:root {
  --font-header: 'Cinzel', serif;
  --font-body: 'Montserrat', sans-serif;
}
```

### Text Styling

- **Headers**: Gold color with subtle glow effect
- **Body Text**: Light gray for readability
- **Special Elements**: Custom styling for cards and overlays
- **Shadows**: Text shadows for glow effects on important elements

## Layout Components

### Admin Panel Layout

- **Container**: Centered with maximum width of 700px
- **Sections**: Clear separation between controls and editor
- **Grid System**: CSS Grid for button layouts
- **Responsive Padding**: Adapts to different screen sizes

### Board Display Layout

- **Full Screen**: Utilizes entire viewport height
- **Centered Content**: Flexbox centering for main elements
- **Card Grid**: 2x4 grid for answer cards
- **Overlay System**: Absolute positioning for special effects

## Interactive Elements

### Buttons

All buttons share common styling:
- Transparent background with gold border
- Subtle hover effects with glow
- Smooth transitions for state changes
- Custom styling for specific button types

#### Button Variants

1. **Default Buttons**: Standard control buttons
2. **Toggle Buttons**: Special styling for answer controls
3. **Wrong Answer Button**: Red-themed for wrong answers
4. **Reset Button**: Subtle styling for reset function
5. **Update Button**: Blue-themed for data updates

### Input Fields

Text and number inputs:
- Dark background with gold border
- Light text for readability
- Focus states with highlight color
- Different widths for text vs. number inputs

### Cards

Answer cards feature:
- **3D Effect**: Box shadows for depth
- **Flip Animation**: CSS-based card flip transition
- **Hover Effects**: Lift and glow on hover
- **State Indicators**: Visual feedback for open/closed states

#### Card States

1. **Closed**: Shows only number with red glow
2. **Open**: Reveals answer text and score
3. **Hover**: Lifts slightly with enhanced glow
4. **Active**: Gold border when revealed

## Animations and Effects

### CSS Animations

1. **Breathing Effect**: Subtle glow pulsation on cards
2. **Flip Animation**: Smooth card flip transition
3. **Glitch Effect**: Wrong answer overlay animation
4. **Pulse Effect**: Background particle animation

### Transitions

- **Button States**: Smooth color and shadow transitions
- **Card States**: 0.4s transitions for all state changes
- **Overlay Effects**: Fade in/out for overlays
- **Hover Effects**: Quick response to user interaction

### Special Effects

1. **Text Glow**: Subtle glow on important text elements
2. **Box Shadows**: Depth effects on cards and buttons
3. **Gradients**: Background and card styling
4. **Particle System**: Subtle background elements

## Responsive Design

### Media Queries

The design adapts to different screen sizes:
- **Large Screens**: Full layout with all elements
- **Medium Screens**: Adjusted spacing and sizing
- **Small Screens**: Stacked elements for better fit

### Flexible Components

- **Grid Layouts**: CSS Grid for flexible card arrangement
- **Flexible Images**: Properly sized for different resolutions
- **Text Scaling**: Relative units for better readability
- **Padding Adjustments**: Responsive padding for all elements

## Custom Components

### Answer Cards

```css
.card {
  background: rgba(10, 10, 30, 0.7);
  border: 1px solid rgba(212, 175, 55, 0.3);
  height: 100px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: all 0.4s ease;
  border-radius: 4px;
}
```

### Wrong Answer Overlay

```css
.wrong-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(50, 0, 0, 0.6);
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 99;
  backdrop-filter: blur(5px);
}
```

### Editor Rows

```css
.editor-row {
  display: flex;
  gap: 5px;
  margin-bottom: 5px;
}
```

## Browser Compatibility

### CSS Features Used

- CSS Variables (Custom Properties)
- CSS Grid Layout
- Flexbox
- CSS Transitions
- CSS Animations
- Box Shadow
- Border Radius
- Gradient Backgrounds

### Fallbacks

- Basic styling for older browsers
- Graceful degradation for unsupported features
- Vendor prefixes where necessary
- Progressive enhancement approach

## Performance Considerations

### Optimization Techniques

- **Efficient Selectors**: Minimal specificity for better performance
- **Hardware Acceleration**: Used for animations where appropriate
- **Minimized Reflows**: Proper positioning to reduce layout recalculations
- **Optimized Animations**: Using transform and opacity for smoother animations

### Loading Performance

- **Font Loading**: Efficient Google Fonts import
- **Asset Optimization**: Minimal external dependencies
- **Code Organization**: Well-structured CSS for maintainability
- **Compression Ready**: Clean code that compresses well