import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  // Graceful warning for local/preview if env not injected yet
  console.warn('MONGODB_URI not found in environment variables')
}

let cached = global.mongoose
if (!cached) cached = global.mongoose = { conn: null, promise: null }

async function dbConnect() {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    if (!MONGODB_URI) throw new Error('MONGODB_URI not found')
    cached.promise = mongoose.connect(MONGODB_URI).then(m => m)
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect
