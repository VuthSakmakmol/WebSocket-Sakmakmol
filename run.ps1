Start-Process powershell -ArgumentList "cd backend; nodemon index.js" -NoNewWindow
Start-Process powershell -ArgumentList "cd frontend; npm run dev" -NoNewWindow
