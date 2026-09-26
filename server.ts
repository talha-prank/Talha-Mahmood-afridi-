import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory fallback contact storage
interface ContactDocument {
  _id: string;
  id?: string;
  name: string;
  email: string;
  whatsapp: string;
  message: string;
  createdAt: Date;
}

let inMemoryContacts: ContactDocument[] = [
  {
    _id: 'mock-1',
    id: 'mock-1',
    name: 'Zubair Shah',
    email: 'zubair.shah@example.com',
    whatsapp: '+923001234567',
    message: 'Hello Talha, we reviewed your UET projects and would like to discuss a frontend dashboard for our Peshawar company.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)
  },
  {
    _id: 'mock-2',
    id: 'mock-2',
    name: 'Sarah Jenkins',
    email: 'sarah.j@techreach.org',
    whatsapp: '+447911123456',
    message: 'Interested in your SEO and web development services. Could you provide a quotation for our website revamp?',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12)
  }
];

// Mongoose Schema & Model
const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  whatsapp: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

let ContactModel: mongoose.Model<any> | null = null;
let isMongoConnected = false;

async function initMongoDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log('[Database] MONGODB_URI not provided. Running in persistent memory-mode for preview/local testing.');
    return;
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    ContactModel = mongoose.models.Contact || mongoose.model('Contact', ContactSchema, 'contacts');
    isMongoConnected = true;
    console.log('[Database] Successfully connected to MongoDB cluster (collection: contacts).');
  } catch (error: any) {
    console.warn('[Database] Could not connect to MongoDB:', error?.message || error);
    console.warn('[Database] Using memory store fallback.');
  }
}

// Resend Email Notification
async function sendEmailNotification(contact: { name: string; email: string; whatsapp: string; message: string }) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const recipientEmail = process.env.MY_EMAIL || 'talhamahmood1055@gmail.com';

  if (!resendApiKey) {
    console.log('[Email] RESEND_API_KEY not set. Notification skipped.');
    return { success: false, reason: 'No RESEND_API_KEY' };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: recipientEmail,
        subject: `New Portfolio Message from ${contact.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #0f172a; color: #f8fafc; border-radius: 8px;">
            <h2 style="color: #38bdf8; margin-top: 0;">New Contact Form Message</h2>
            <p><strong>Name:</strong> ${contact.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${contact.email}" style="color: #38bdf8;">${contact.email}</a></p>
            <p><strong>WhatsApp:</strong> <a href="https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}" style="color: #34d399;">${contact.whatsapp}</a></p>
            <hr style="border: 0; border-top: 1px solid #334155; margin: 16px 0;" />
            <p><strong>Message:</strong></p>
            <blockquote style="margin: 0; padding: 12px 16px; background-color: #1e293b; border-left: 4px solid #38bdf8; border-radius: 4px;">
              ${contact.message.replace(/\n/g, '<br/>')}
            </blockquote>
            <p style="font-size: 12px; color: #94a3b8; margin-top: 20px;">
              Received via Talha Mahmood Afridi Portfolio Website
            </p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('[Email] Resend API error response:', errorText);
      return { success: false, error: errorText };
    }

    const data = await res.json();
    console.log('[Email] Resend notification delivered successfully:', data);
    return { success: true, data };
  } catch (err: any) {
    console.error('[Email] Failed to dispatch email via Resend:', err.message);
    return { success: false, error: err.message };
  }
}

// Twilio WhatsApp Notification
async function sendTwilioWhatsApp(contact: { name: string; email: string; whatsapp: string; message: string }) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioNumber = process.env.TWILIO_WHATSAPP_NUMBER;
  const myWhatsApp = process.env.MY_WHATSAPP_NUMBER || 'whatsapp:+923255691055';

  if (!accountSid || !authToken || !twilioNumber) {
    console.log('[WhatsApp] Twilio credentials not configured. WhatsApp dispatch skipped.');
    return { success: false, reason: 'Twilio not configured' };
  }

  try {
    const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64');
    const params = new URLSearchParams();
    params.append('From', twilioNumber.startsWith('whatsapp:') ? twilioNumber : `whatsapp:${twilioNumber}`);
    params.append('To', myWhatsApp.startsWith('whatsapp:') ? myWhatsApp : `whatsapp:${myWhatsApp}`);
    params.append(
      'Body',
      `*New Portfolio Inquiry*\n*From:* ${contact.name}\n*Email:* ${contact.email}\n*WhatsApp:* ${contact.whatsapp}\n*Message:* ${contact.message}`
    );

    const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.warn('[WhatsApp] Twilio returned status:', res.status, errBody);
      return { success: false, error: errBody };
    }

    const data = await res.json();
    console.log('[WhatsApp] Twilio notification sent successfully.');
    return { success: true, data };
  } catch (err: any) {
    console.warn('[WhatsApp] Twilio send failed (optional):', err?.message || err);
    return { success: false, error: err?.message };
  }
}

// --- API ROUTES ---

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    database: isMongoConnected ? 'mongodb' : 'in-memory',
    timestamp: new Date().toISOString(),
  });
});

// 2. GET /api/contact - Health verification endpoint
app.get('/api/contact', (req, res) => {
  res.json({ status: 'API WORKING - POST to this endpoint' });
});

// 3. POST /api/contact - Submit contact form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message, whatsapp } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and message are required.',
      });
    }

    const contactData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      whatsapp: whatsapp ? whatsapp.trim() : '',
      message: message.trim(),
      createdAt: new Date(),
    };

    let savedContact: any = null;

    if (isMongoConnected && ContactModel) {
      const newDoc = new ContactModel(contactData);
      savedContact = await newDoc.save();
    } else {
      savedContact = {
        _id: 'local_' + Date.now(),
        id: 'local_' + Date.now(),
        ...contactData,
      };
      inMemoryContacts.unshift(savedContact);
    }

    // Trigger notifications asynchronously if configured
    sendEmailNotification({ name, email, whatsapp: contactData.whatsapp, message }).catch(() => {});
    sendTwilioWhatsApp({ name, email, whatsapp: contactData.whatsapp, message }).catch(() => {});

    return res.status(201).json({
      success: true,
      message: 'Message Sent Successfully!',
      saved: savedContact,
      data: savedContact,
      contact: savedContact,
    });
  } catch (error: any) {
    console.error('[API /api/contact] Error processing submission:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'An internal error occurred while saving your message.',
    });
  }
});

// Admin Authentication Middleware
function checkAdminAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader ? authHeader.replace(/^Bearer\s+/i, '') : '';
  const queryPass = req.query.password as string;

  if (token === 'admin123' || token === 'admin-authorized-token' || queryPass === 'admin123') {
    return next();
  }

  return res.status(401).json({
    success: false,
    error: 'Unauthorized: Invalid admin credentials.',
  });
}

// 3. POST /api/admin/login
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === 'admin123') {
    return res.json({
      success: true,
      token: 'admin123',
      message: 'Authentication successful',
    });
  }
  return res.status(401).json({
    success: false,
    error: 'Incorrect admin password.',
  });
});

// 4. GET /api/admin/contacts - Retrieve all messages
app.get('/api/admin/contacts', checkAdminAuth, async (req, res) => {
  try {
    let contacts: any[] = [];

    if (isMongoConnected && ContactModel) {
      contacts = await ContactModel.find().sort({ createdAt: -1 }).lean();
    } else {
      contacts = [...inMemoryContacts];
    }

    return res.json({
      success: true,
      count: contacts.length,
      database: isMongoConnected ? 'MongoDB (connected)' : 'Memory / Fallback Cache',
      contacts: contacts.map(c => ({
        id: c._id ? c._id.toString() : c.id,
        name: c.name,
        email: c.email,
        whatsapp: c.whatsapp,
        message: c.message,
        createdAt: c.createdAt,
      })),
    });
  } catch (error: any) {
    console.error('[API /api/admin/contacts] Error fetching contacts:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to retrieve contacts from database.',
    });
  }
});

// 5. DELETE /api/admin/contacts/:id - Remove message
app.delete('/api/admin/contacts/:id', checkAdminAuth, async (req, res) => {
  const { id } = req.params;

  try {
    if (isMongoConnected && ContactModel) {
      await ContactModel.findByIdAndDelete(id);
    } else {
      inMemoryContacts = inMemoryContacts.filter(c => (c._id !== id && c.id !== id));
    }

    return res.json({
      success: true,
      message: `Contact ${id} deleted successfully.`,
    });
  } catch (error: any) {
    console.error('[API DELETE /api/admin/contacts] Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to delete contact record.',
    });
  }
});

// Vite Middleware integration for Full-Stack development
async function startServer() {
  await initMongoDB();

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
