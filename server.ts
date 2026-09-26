import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json());

let isMongoConnected = false;
const inMemoryContacts: any[] = [];

// Connect to MongoDB if URI available
if (MONGODB_URI) {
  mongoose
    .connect(MONGODB_URI, { bufferCommands: false })
    .then(() => {
      isMongoConnected = true;
      console.log('[Database] Successfully connected to MongoDB cluster.');
    })
    .catch((err) => {
      console.warn('[Database] MongoDB connection warning:', err.message);
    });
} else {
  console.log('[Database] MONGODB_URI not provided; using fallback storage.');
}

// 1. GET /api/contact
app.get('/api/contact', (req, res) => {
  res.json({ message: 'Contact API LIVE - atlas-green-zebra' });
});

// 2. POST /api/contact
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message, ...rest } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Name, email, and message are required.' });
    }

    const doc = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      ...rest,
      createdAt: new Date(),
    };

    if (mongoose.connection.readyState === 1 && mongoose.connection.db) {
      const result = await mongoose.connection.db.collection('contacts').insertOne(doc);
      return res.status(201).json({ success: true, id: result.insertedId, saved: doc });
    } else {
      const localDoc = { _id: 'local_' + Date.now(), id: 'local_' + Date.now(), ...doc };
      inMemoryContacts.unshift(localDoc);
      return res.status(201).json({ success: true, id: localDoc.id, saved: localDoc });
    }
  } catch (e: any) {
    console.error('Error saving contact:', e);
    return res.status(500).json({ success: false, error: e?.message || 'Server error' });
  }
});

// 3. GET /api/health
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'mongodb' : 'fallback-active',
    timestamp: new Date().toISOString(),
  });
});

// 4. GET /api/admin/contacts
app.get('/api/admin/contacts', async (req, res) => {
  try {
    const pass = req.query.password;
    if (pass !== 'admin123' && pass !== 'admin') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (mongoose.connection.readyState === 1 && mongoose.connection.db) {
      const docs = await mongoose.connection.db
        .collection('contacts')
        .find()
        .sort({ createdAt: -1 })
        .limit(50)
        .toArray();
      return res.json({ contacts: docs });
    } else {
      return res.json({ contacts: inMemoryContacts });
    }
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || 'Error fetching contacts' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
