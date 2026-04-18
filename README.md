# QuizApp

A React Native quiz app built with Expo, React Navigation, and React Native Elements.  
Supports three question types: **Multiple Choice**, **Multiple Answer**, and **True/False**.

---

## Features

- Sequential question flow — no going back
- Three question types:
  - **Multiple Choice** — pick one answer
  - **Multiple Answer** — pick all that apply
  - **True/False** — binary choice
- Summary screen with total score and per-question breakdown
- Incorrect chosen answers shown with ~~strikethrough~~
- Correct answers shown in **bold**

---

## Tech Stack

| Library | Purpose |
|---|---|
| [Expo](https://expo.dev) | Development platform & build tooling |
| [React Navigation](https://reactnavigation.org) | Screen navigation |
| [React Native Elements (RNEUI)](https://reactnativeelements.com) | UI components (ButtonGroup) |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) v22+
- [Expo Go](https://expo.dev/go) app installed on your iOS or Android device

### Install & Run

```bash
git clone https://github.com/bukihax/quizapp.git
cd quizapp
npm install
npx expo start
```

Scan the QR code with:
- **iPhone**: Camera app → tap the Expo Go link
- **Android**: Expo Go app → scan QR code

> Your phone and computer must be on the same Wi-Fi network.

---

## Project Structure

```
quizapp/
├── App.js                  # Navigation setup + sample questions
├── components/
│   ├── Question.js         # Question screen (ButtonGroup choices)
│   └── Summary.js          # Results screen with score breakdown
└── index.js                # Expo entry point
```

---

## Question Data Format

Questions are passed as route params to the `Question` component:

```json
[
  {
    "prompt": "What is the capital of France?",
    "type": "multiple-choice",
    "choices": ["Berlin", "Paris", "Madrid", "Rome"],
    "correct": 1
  },
  {
    "prompt": "Which are cellular processes?",
    "type": "multiple-answer",
    "choices": ["Photosynthesis", "Erosion", "Respiration", "Tectonic drift"],
    "correct": [0, 2]
  },
  {
    "prompt": "The Earth orbits the Sun.",
    "type": "true-false",
    "choices": ["True", "False"],
    "correct": 0
  }
]
```

- `correct` is an **integer** for single-answer types
- `correct` is an **array of integers** for `multiple-answer`
- Index `0` = first choice

---

## Sample Questions & Answers

| # | Type | Correct Answer |
|---|---|---|
| 1 | Multiple Choice | Paris (index 1) |
| 2 | Multiple Answer | Photosynthesis + Respiration (indices 0, 2) |
| 3 | True/False | True (index 0) |
| 4 | Multiple Choice | Mars (index 2) |
| 5 | True/False | False (index 1) |

---

## Deployment Note

GitHub Pages is for static websites and **does not support React Native apps**.  
To share this app, use **Expo** publishing (free):

```bash
# Anyone with the repo can run it locally:
npx expo start

# To publish a shareable Expo link:
npx expo publish
```

Or share the GitHub repo link — others can clone and run it with `npx expo start`.

---

## License

MIT
