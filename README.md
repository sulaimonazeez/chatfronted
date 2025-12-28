ChatIt – Real-Time Messaging Application
ChatIt is a modern, real-time messaging application built with React on the frontend and a Django REST API backend.
It focuses on clean UI, smooth user experience, and scalable architecture.
🚀 Features
🔐 JWT Authentication
👥 Friends System
🔍 Search Users by Username / ID
💬 1-on-1 Chat Messaging
😊 Emoji Support
📱 Mobile-Responsive UI
⚡ Auto Message Polling (WebSocket-ready)
🎨 Modern UI with Glassmorphism
🔒 Secure API requests with Bearer Tokens
🛠 Tech Stack
Frontend
React
React Router
Axios
Bootstrap / Custom CSS
Emoji Picker
Context API
Backend
Django
Django REST Framework
JWT Authentication
PostgreSQL / SQLite
PythonAnywhere (Hosting)
📂 Project Structure

src/
├── auth/
│   ├── AuthProvider.jsx
│   ├── SignOut.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Charts.jsx
│   ├── Chat.jsx
│   ├── Search.jsx
│   ├── Looker.jsx
│
├── assets/
│   ├── message.svg
│
├── styles/
│   ├── ExactUI.css
│
├── App.jsx
├── index.jsx


Authentication Flow
User logs in
Backend returns JWT access & refresh tokens
Tokens stored in localStorage
Axios attaches token via
Authorization: Bearer <access_token>


User Search
Users can search for friends using:
Username
User ID
If found, they can instantly start a chat.
💬 Messaging System
Messages are fetched using polling (every 3 seconds)
Messages are grouped into:
Mine
Theirs
Emojis supported
Designed for easy WebSocket upgrade
🎨 UI Design Philosophy
Glassmorphism panels
Centered layout
Dark theme
Smooth transitions
Mobile-first responsiveness
⚙️ Installation & Setup
frontend



git clone https://github.com/sulaimonazeez/chatfrontend.git
cd chatfrontend
npm install
npm start


git clone https://github.com/sulaimonazeez/chatbackend.git
cd chatbackend
pip install -r requirements.txt
python manage.py runserver


API Endpoints (Sample)
Method
Endpoint
Description
POST
/auth/login/
Login
GET
/friends/
Fetch friends
GET
/search/
Search users
GET
/messages/<id>/
Fetch messages
POST
/messages/<id>/
Send message
🔮 Future Improvements
✅ WebSocket (Django Channels)
✅ Message seen/delivered status
✅ Group chats
✅ Voice notes
✅ File sharing
✅ Push notifications
🧠 Clean Code Principles Used
Separation of concerns
Reusable components
Context for global state
Custom hooks ready
No logic inside JSX
Scalable folder structure
👨‍💻 Author
Azeez Sulaimon
Full-Stack Developer
Focused on scalable systems, clean architecture, and real-world products.
⭐ Show Some Love
If you like this project:
⭐ Star the repo
🐛 Report issues
🤝 Contribute improvements
If you want, next I can:
Write API documentation
Design WebSocket architecture
Improve message performance
Create production deployment guide
