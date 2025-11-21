const express = require('express');
const path = require('path');
const router = express.Router();

// Simple in-memory users store for demo purposes (non-persistent)
const users = {};

// Helper to serve static view files
function sendView(res, name) {
  return res.sendFile(path.join(__dirname, '../views', name));
}

router.get('/', (req, res) => {
  sendView(res, 'index.html');
});

router.get('/login', (req, res) => {
  sendView(res, 'login.html');
});

router.get('/register', (req, res) => {
  sendView(res, 'register.html');
});

// Handle register form (very small demo logic)
router.post('/register', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).send('<h2>Eksik bilgiler. Lütfen kullanıcı adı ve şifre girin.</h2><a href="/register">Geri</a>');
  }
  if (users[username]) {
    return res.status(409).send('<h2>Kullanıcı zaten var.</h2><a href="/register">Geri</a>');
  }
  users[username] = { password };
  return res.send(`<html><head><meta charset="utf-8"><title>Kayıt başarılı</title><link rel="stylesheet" href="/css/styles.css"></head><body class="page"><main class="card"><h2>Kayıt başarılı</h2><p>Hoş geldin, ${username}!</p><a class="btn" href="/">Anasayfaya dön</a></main></body></html>`);
});

// Handle login form
router.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).send('<h2>Eksik bilgiler. Lütfen kullanıcı adı ve şifre girin.</h2><a href="/login">Geri</a>');
  }
  const user = users[username];
  if (!user || user.password !== password) {
    return res.status(401).send('<h2>Giriş başarısız. Kullanıcı bulunamadı veya şifre yanlış.</h2><a href="/login">Geri</a>');
  }
  return res.send(`<html><head><meta charset="utf-8"><title>Giriş başarılı</title><link rel="stylesheet" href="/css/styles.css"></head><body class="page"><main class="card"><h2>Giriş başarılı</h2><p>Hoş geldin tekrar, ${username}!</p><a class="btn" href="/">Anasayfaya dön</a></main></body></html>`);
});

module.exports = router;
