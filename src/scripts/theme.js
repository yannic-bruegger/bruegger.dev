import { createThemeManager } from '../utils/theme.js'

// Initialize theme manager
const { toggleTheme } = createThemeManager()

// Make toggleTheme available globally for the button
window.__toggleTheme = toggleTheme