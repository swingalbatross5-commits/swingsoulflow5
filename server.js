const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // ให้ index.html และไฟล์อื่นๆ ถูกเสิร์ฟ

const REVIEW_FILE = path.join(__dirname, 'review.txt');

// อ่านรีวิวทั้งหมด
app.get('/api/reviews', (req, res) => {
  if (!fs.existsSync(REVIEW_FILE)) return res.json([]);
  const data = fs.readFileSync(REVIEW_FILE, 'utf8');
  const reviews = data
    .split('\n')
    .filter(line => line.trim())
    .map(line => {
      try { return JSON.parse(line); } catch { return null; }
    })
    .filter(Boolean);
  res.json(reviews);
});

// บันทึกรีวิวใหม่
app.post('/api/reviews', (req, res) => {
  const review = req.body;
  if (
    !review.name || !review.surname || !review.email ||
    !review.text || review.text.length > 200
  ) {
    return res.status(400).json({ error: 'ข้อมูลไม่ถูกต้อง' });
  }
  fs.appendFileSync(REVIEW_FILE, JSON.stringify(review) + '\n');
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log('Server running at http://localhost:' + PORT);
});


const multer = require('multer');
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 4 * 1024 * 1024 } // 4MB
});

// POST รีวิว (รองรับไฟล์)
app.post('/api/reviews', upload.single('image'), (req, res) => {
  const review = req.body;
  if (
    !review.name || !review.surname || !review.email ||
    !review.text || review.text.length > 200
  ) {
    return res.status(400).json({ error: 'ข้อมูลไม่ถูกต้อง' });
  }
  // ถ้ามีไฟล์แนบ
  if (req.file) {
    review.image = req.file.filename; // เก็บชื่อไฟล์ไว้ใน review
  }
  fs.appendFileSync(REVIEW_FILE, JSON.stringify(review) + '\n');
  res.json({ success: true });
});

// ให้เสิร์ฟไฟล์รูป
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));