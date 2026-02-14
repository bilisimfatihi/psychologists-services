# Psychologists Services

This is a web app for a psychologists service company.

Users can:

- see psychologists
- read psychologist details
- open appointment form
- register and login
- add/remove favorites
- see favorites on a private page

## Current Features

- 3 pages:
  - Home
  - Psychologists
  - Favorites (private)
- Routing with React Router
- Firebase Authentication:
  - register
  - login
  - logout
  - keep user session
- Forms with `react-hook-form` and `yup`:
  - Login form
  - Register form
  - Appointment form
- Psychologist card:
  - basic info
  - Read more section
  - reviews
  - Make an appointment button
- Favorites:
  - add/remove with heart button
  - load user favorites from Firebase
  - show favorites list on Favorites page
- Modal close actions:
  - close button
  - click on backdrop
  - `Esc` key
- Filtering and Sorting:
  - A-Z / Z-A
  - Price (Low-High / High-Low)
  - Popularity
  - Price filtering (<100$ / >100$)
- Pagination:
  - Load more logic for psychologist list
- User Experience:
  - Warning/Error notifications (Toast) for unauthorized actions

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- Firebase (Auth + Firestore)
- React Hook Form
- Yup
- Tailwind CSS

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in project root:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

## Run Commands

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Project Structure

```text
src/
  components/
  context/
  firebase/
  hooks/
  pages/
  router/
  schemas/
  types/
```
