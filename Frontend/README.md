# ClinicalOps Frontend

This is a modern, minimal React frontend for the ClinicalOps Spring Boot backend.

## Prerequisites
- Node.js (v18+ recommended)
- The Spring Boot backend running on http://localhost:8080

## Setup & Run

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Start the development server:**
   ```sh
   npm run dev
   ```
   The app will open at [http://localhost:5173](http://localhost:5173) by default.

3. **Ensure the backend is running** at http://localhost:8080. The frontend fetches patient data from `/patient`.

## Features
- Clean, professional, single-page UI
- Fetches and displays patient data in a beautiful, responsive table
- Elegant loading spinner and error handling
- Hand-written CSS, no frameworks

## Customization
- To change the backend URL, edit `API_URL` in `src/App.jsx`.

---

For any issues, ensure the backend is running and accessible from the frontend.
