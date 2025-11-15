# SimpleCalc

## Project Overview
SimpleCalc is a lightweight, web‑based calculator that runs entirely in the browser. It provides a clean, responsive interface for basic arithmetic operations without the need for any build tools or server‑side components.

## Features
- **Basic arithmetic**: addition, subtraction, multiplication, division
- **Clear (C) and backspace (←) functionality**
- **Decimal support**
- **Keyboard shortcuts** for digits, operators, Enter (equals), Backspace, Delete (clear), and `.` (decimal)
- **Responsive design** that works on both desktop and mobile browsers
- **Accessible display** with `aria-live` for screen readers

## Tech Stack
- **HTML** – structure of the calculator UI
- **CSS** – styling and responsive layout
- **JavaScript** – handling user interaction, calculations, and keyboard support

## Setup
1. Clone or download the repository.
2. Open `index.html` in any modern web browser.

No additional dependencies, build steps, or package managers are required.

## Usage
- **UI**: Click the on‑screen buttons to enter numbers and operators. The display shows the current expression and result.
- **Keyboard shortcuts**:
  - Digits `0–9` and `.` (decimal) input the corresponding character.
  - `+`, `-`, `*`, `/` perform the respective operation.
  - `Enter` or `=` evaluates the expression.
  - `Backspace` deletes the last character.
  - `Delete` or `Esc` clears the entire input.
- **Calculations** follow the standard left‑to‑right evaluation used by simple calculators (no operator precedence).

## Responsive Design
The layout adapts to various screen sizes:
- On larger screens the calculator appears centered with a grid of buttons.
- On mobile devices the buttons expand to fill the width, ensuring easy tapping.

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests to improve features, fix bugs, or enhance accessibility.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.
