# Pomodoro Timer

A cross-platform Pomodoro timer built with **Expo React Native** and deployed as a responsive web app on **Vercel**. The app helps users manage focus sessions, breaks, and custom work routines with preset modes, saved custom profiles, sound feedback, automatic session transitions, and celebration animations.

## Live Demo

[View Live App](https://pomodoro-modern-gamma.vercel.app/)

## GitHub Repository

[View Repository](https://github.com/S-chahine/pomodoro-modern)

## Features

- Focus, short break, and long break timer modes
- Classic, Deep Work, and Light Mode presets
- Custom timer duration settings
- Editable number steppers with typing support
- Press-and-hold controls for faster duration changes
- Save custom presets with user-defined names
- View, select, and delete saved custom presets
- Highlight the active custom preset
- Automatic Pomodoro session transitions
- Long break after four completed focus sessions
- Sound effects for clicks, session completion, and full-cycle celebration
- Animated thumbs-up celebration after completing a Pomodoro cycle
- Light and dark theme support
- Responsive web deployment through Vercel

## Tech Stack

- Expo
- React Native
- TypeScript
- NativeWind
- Gluestack UI
- React Native Reanimated
- Expo Audio
- AsyncStorage
- Expo Router
- Vercel

## How It Works

The app follows a Pomodoro cycle:

1. The user starts a focus session.
2. When the focus session completes, the app switches to a short break.
3. After four completed focus sessions, the app switches to a long break.
4. After the long break finishes, the cycle resets.

The app does not automatically start the next timer. It switches to the next session and waits for the user to press **Start**, giving the user control over when to begin the next session.

## Custom Presets

Users can create custom timer profiles by choosing their own durations for:

- Focus time
- Short break
- Long break

When saving a custom preset, the user is asked to provide a name. Saved presets are stored locally using `AsyncStorage`, allowing the user to reuse them later.

## Installation

Clone the repository:

   git clone https://github.com/S-chahine/pomodoro-modern.git


Navigate into the project:

   cd pomodoro-modern


Install dependencies:

   npm install


Start the development server:

   npx expo start
   

Run the web version:

   npx expo start --web


## Build for web

Create a production web build:
   npx expo export -p web
The exported site will be generated in the dist folder.

## Deployment

This project is deployed on Vercel

Vercel runs the Expo web build command and serves the generated dist folder.