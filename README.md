# ✨ Feedback Collector

A modern, full-stack feedback collection application built with React and Express.js. Users can submit, view, like, edit, and delete feedback with persistent storage. Features include category filtering, sorting, and a beautiful, responsive UI.

## 🚀 Features

- ✅ **Submit Feedback** - Add feedback with optional categories
- ❤️ **Like System** - Like feedback items to show appreciation
- ✏️ **Edit Feedback** - Modify your feedback after submission
- 🗑️ **Delete Feedback** - Remove unwanted feedback
- 🔄 **Persistent Storage** - All feedback saved to backend
- 📊 **Sorting** - Sort by newest, oldest, most liked, least liked
- 🏷️ **Category Filtering** - Filter feedback by category
- 💾 **Fallback Storage** - LocalStorage backup when backend unavailable
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations
- ⚡ **Real-time Updates** - Instant feedback without page refresh
- 🔍 **Search Ready** - Clean data structure for easy searching

## 📋 Tech Stack

### Frontend
- **React 18** - UI library
- **CSS3** - Styling with CSS variables and animations
- **Fetch API** - HTTP requests

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin requests
- **File System** - JSON file-based storage

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd feedback-collector
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Create data directory** (if it doesn't exist)
   ```bash
   mkdir -p data
   ```

4. **Start the backend server**
   ```bash
   npm start
   ```
   Server runs on `http://localhost:5000`

### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Start development server** (in a new terminal)
   ```bash
   npm start
   ```
   App opens at `http://localhost:3000`

### Running Both Concurrently (Optional)

From the root directory:
```bash
npm run dev  # Terminal 1 - Backend
npm run client  # Terminal 2 - Frontend
```

## 📁 Project Structure

```
feedback-collector/
├── server.js                 # Express backend server
├── package.json             # Backend dependencies
├── data/
│   └── feedback.json        # Persistent storage file
├── client/                  # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── index.js
│   │   ├── index.css
│   │   ├── App.js           # Main app component
│   │   ├── App.css
│   │   └── components/
│   │       ├── FeedbackForm.js
│   │       ├── FeedbackForm.css
│   │       ├── FeedbackList.js
│   │       ├── FeedbackList.css
│   │       ├── FeedbackItem.js
│   │       └── FeedbackItem.css
│   └── package.json         # Frontend dependencies
└── README.md
```

## 🔌 API Endpoints

### GET /api/feedback
Get all feedback
```bash
curl http://localhost:5000/api/feedback
```

### POST /api/feedback
Create new feedback
```bash
curl -X POST http://localhost:5000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{"message":"Great app!","category":"praise"}'
```

### PUT /api/feedback/:id
Update feedback
```bash
curl -X PUT http://localhost:5000/api/feedback/123 \
  -H "Content-Type: application/json" \
  -d '{"message":"Updated message","category":"improvement"}'
```

### POST /api/feedback/:id/like
Like feedback (increments likes by 1)
```bash
curl -X POST http://localhost:5000/api/feedback/123/like
```

### DELETE /api/feedback/:id
Delete feedback
```bash
curl -X DELETE http://localhost:5000/api/feedback/123
```

### GET /api/health
Health check
```bash
curl http://localhost:5000/api/health
```

## 📦 Data Structure

Each feedback item has:
```json
{
  "id": "1234567890",
  "message": "This is great feedback",
  "category": "praise",
  "likes": 5,
  "createdAt": "2024-04-05T10:30:00.000Z",
  "updatedAt": "2024-04-05T10:30:00.000Z"
}
```

**Categories:**
- general (default)
- bug
- feature
- improvement
- praise

## 🚀 Deployment

### Vercel (Frontend)
1. Push code to GitHub
2. Connect repo to Vercel
3. Set environment variable: `REACT_APP_API_URL=your-backend-url`
4. Deploy!

### Heroku (Backend)
1. Push code to GitHub
2. Create Heroku app: `heroku create app-name`
3. Deploy: `git push heroku main`
4. View logs: `heroku logs --tail`

### Alternative: Self-Hosted
1. Install Node.js on server
2. Clone repository
3. Install dependencies: `npm install && cd client && npm install`
4. Build frontend: `cd client && npm run build`
5. Start server: `npm start` (from root)
6. Use PM2 for process management: `npm install -g pm2 && pm2 start server.js`

## 🎨 Customization

### Change Colors
Edit CSS variables in `client/src/App.css`:
```css
:root {
  --primary: #6366f1;
  --secondary: #ec4899;
  /* ... */
}
```

### Change Max Character Limit
Edit `client/src/components/FeedbackForm.js`:
```javascript
const maxChars = 500; // Change this value
```

### Change Categories
Edit `server.js` FeedbackForm options and `App.js` category list.

## 🐛 Troubleshooting

**CORS Errors?**
- Ensure backend is running on port 5000
- Check proxy setting in `client/package.json`

**Feedback not persisting?**
- Check if `data/` directory exists
- Ensure server has write permissions
- Check browser console for errors

**Frontend won't connect to backend?**
- Start backend first on port 5000
- Ensure `REACT_APP_API_URL` is set correctly
- Check that CORS is enabled in `server.js`

**Port already in use?**
- Backend: `PORT=5001 npm start`
- Frontend: `PORT=3001 npm start`

## 📚 Features Breakdown

### Core Features
- ✅ Submit feedback (no empty input validation)
- ✅ Display all feedback
- ✅ Persistent storage (file-based)

### Bonus Features
- ✅ Like system with like count
- ✅ Edit feedback functionality
- ✅ Delete feedback with confirmation
- ✅ Sort by: newest, oldest, most liked, least liked
- ✅ Filter by category
- ✅ Edit timestamp indicator
- ✅ Real-time character counter
- ✅ Beautiful animations and transitions
- ✅ Fallback to localStorage when offline
- ✅ Responsive mobile-first design

## 🔐 Security Notes

This is a demo app. For production:
- Add authentication
- Validate all inputs on backend
- Implement rate limiting
- Use a real database (MongoDB, PostgreSQL)
- Add HTTPS
- Implement input sanitization

## 📝 License

MIT License - Feel free to use this project!

## 🤝 Contributing

Contributions welcome! Please fork and submit pull requests.

## 📧 Support

For issues or questions, open a GitHub issue or contact the maintainer.

---

**Made with ❤️ by Your Team**
# FeedBack-Collector
