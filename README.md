# 💬 LAN Chat — Anonymous Local Network Chatroom

A real-time anonymous chatroom for users on the same local network (LAN).  
Built with **Node.js**, **Express**, and **Socket.IO**.

---

## ✨ Features

- 🎭 Auto-generated anonymous usernames (e.g. `PhantomWolf42`)
- ⚡ Real-time messaging via WebSockets
- ✍️ Live typing indicators
- 👥 Online user sidebar
- 🌐 Works across all devices on the same Wi-Fi/LAN
- 🔒 No accounts, no data stored, session-only messages

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the server

```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

### 3. Find your local IP address

**Windows:**
```
ipconfig
```
Look for `IPv4 Address` under your active adapter (e.g. `192.168.1.5`)

**Mac/Linux:**
```
ifconfig
# or
ip a
```
Look for something like `192.168.x.x`

### 4. Connect

- **Host machine:** Open `http://localhost:3000`
- **Other LAN devices:** Open `http://<your-local-ip>:3000`

---

## 📁 Project Structure

```
lan-chat/
├── server/
│   ├── index.js            # Express + Socket.IO server
│   └── nameGenerator.js    # Anonymous username generator
├── client/
│   └── index.html          # Frontend (single file)
├── package.json
└── README.md
```

---

## 🔌 Socket.IO Events

| Event              | Direction            | Description                     |
|--------------------|----------------------|---------------------------------|
| `assigned-username`| Server → Client      | User's generated username        |
| `message`          | Client ↔ Server ↔ All| Send/receive chat messages       |
| `typing`           | Client → Others      | User started typing              |
| `stop-typing`      | Client → Others      | User stopped typing              |
| `user-joined`      | Server → All         | Announce new user connection     |
| `user-left`        | Server → All         | Announce user disconnect         |
| `user-list`        | Server → All         | Updated list of online users     |

---

## ⚙️ Configuration

Change the port in `server/index.js`:
```js
const PORT = process.env.PORT || 3000;
```

Or set it via environment variable:
```bash
PORT=8080 npm start
```

---

## 🛡️ Notes

- Messages are **not persisted** — they exist only for the duration of the session
- All users are anonymous; usernames are freed when a user disconnects
- Make sure your firewall allows incoming connections on port 3000 for LAN access
