# 🚀 Quick Start Guide

## One-Minute Setup

### Option 1: Local Development (Recommended for beginners)

```bash
# 1. Install dependencies
npm install
cd client && npm install && cd ..

# 2. Start backend (Terminal 1)
npm start

# 3. Start frontend (Terminal 2)
cd client && npm start
```

App opens at http://localhost:3000 ✨

### Option 2: Docker (If you have Docker)

```bash
# Build
docker-compose build

# Run
docker-compose up
```

Visit http://localhost:3000

## File Structure at a Glance

```
Root (Backend)
├── server.js ← Main backend
├── package.json
└── data/ ← Where feedback is saved

client/ (Frontend)
├── src/
│   ├── App.js ← Main component
│   └── components/ ← UI parts
└── package.json
```

## What Each File Does

| File | Purpose |
|------|---------|
| `server.js` | Express backend that handles API requests |
| `App.js` | Main React component managing feedback state |
| `FeedbackForm.js` | Form to submit new feedback |
| `FeedbackItem.js` | Individual feedback card |
| `App.css` | Main styling and animations |

## API Cheat Sheet

All endpoints work with:
- **Base URL:** `http://localhost:5000/api`

| Method | Endpoint | What it does |
|--------|----------|-------------|
| GET | `/feedback` | Get all feedback |
| POST | `/feedback` | Add new feedback |
| PUT | `/feedback/:id` | Edit feedback |
| DELETE | `/feedback/:id` | Delete feedback |
| POST | `/feedback/:id/like` | Add like |

Example:
```bash
curl http://localhost:5000/api/feedback
```

## Troubleshooting

**Port 3000 in use?**
```bash
cd client && PORT=3001 npm start
```

**Port 5000 in use?**
```bash
PORT=5001 npm start
```

**Dependencies not installing?**
```bash
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. ✅ Run locally
2. 📝 Add more features
3. 🚀 Deploy to Vercel or Heroku
4. 🎉 Share with others!

---

Need help? Check [README.md](./README.md) for full documentation!
