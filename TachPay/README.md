
## Build a basic version of PayTM

This repository contains a small demo app with two parts:

- `backend/` - Node + Express API (MongoDB)
- `frontend/` - React + Vite single-page app

Below are step-by-step instructions to run both parts locally on Windows.

### Prerequisites

- Node.js (v16+ recommended) and npm installed. Check with `node -v` and `npm -v`.
- (Optional) MongoDB Atlas account or a MongoDB URI. A sample MONGO_URI is present in `backend/.env` but you should use your own for production.

### 1) Start the backend

1. Open a terminal and change to the backend folder:

	cd backend

2. Install dependencies:

	npm install

3. Create or verify `.env` in the `backend/` folder. The project expects a `MONGO_URI` variable. Example `.env`:

	MONGO_URI=your-mongodb-connection-string

	Note: The repository includes a `.env` with a sample URI. Replace it if you want to use a different database.

4. Start the server:

	node index.js

The backend listens on port 8000 and mounts its API under `/api/v1` (for example: `http://localhost:8000/api/v1/user/signup`).

If you prefer a convenience npm script, you can add one to `backend/package.json` (not included by default):

```json
"scripts": {
  "start": "node index.js"
}
```

### 2) Start the frontend

1. Open a second terminal and change to the frontend folder:

	cd frontend

2. Install dependencies:

	npm install

3. Start the dev server:

	npm run dev

Vite will start the frontend (by default on `http://localhost:5173`). The app's code calls the backend at `http://localhost:8000/api/v1` (see `src/Components/Users.jsx`) so both servers must be running.

### 3) Quick test

1. Open your browser and visit the frontend URL (e.g. `http://localhost:5173`).
2. Use the UI to sign up a user (Signup page) or call the backend endpoints with curl / Postman.

### Troubleshooting

- If the frontend cannot reach the backend, ensure the backend is running on port 8000 and there is no firewall blocking connections.
- If MongoDB connection fails, check your `MONGO_URI` in `backend/.env` and that your IP is allowed in Atlas IP whitelist (if using Atlas).
- For CORS issues: the backend enables CORS globally in `backend/index.js` using the `cors` package, so requests from `localhost:5173` should work.

- If the backend process crashes when a transfer is attempted, check the backend terminal for errors and restart the server. A common cause is transient MongoDB transaction errors (WriteConflict). The backend has been updated to use `session.withTransaction(...)` which retries transient transaction errors, but you should still inspect the logs:

	1. In a terminal, run:

		 cd backend
		 node index.js

	2. Watch the console for stack traces. If you see `WriteConflict` or `TransientTransactionError`, trying the transfer again usually succeeds. If the server exits with an unhandled exception, open `backend/routes/account.js` and ensure the `withTransaction` implementation is present; if you prefer, I can send a patch that adds retry/backoff logic.

### Optional: Running both with one command

You can run both servers in separate terminals. If you want to run them together, consider using a tool like `concurrently` or running two PowerShell tabs. Example install and run (optional):

In the project root (TachPay) or in your dev environment:

```powershell
cd backend; npm install; start-Process powershell -ArgumentList '-NoExit','-Command','cd backend; node index.js';
cd ..\frontend; npm install; npm run dev
```

Replace the above with whatever workflow you prefer.

---

If you want, I can add a `start` script to `backend/package.json` and a small PowerShell script to the repository to bootstrap both servers — tell me if you'd like that and whether you prefer a cross-platform solution or Windows-only helper.
