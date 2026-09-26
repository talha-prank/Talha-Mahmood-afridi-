import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  whatsapp: string;
  message: string;
  createdAt: Date;
}

const ContactSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name.'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters.'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address.'],
      trim: true,
      lowercase: true,
    },
    whatsapp: {
      type: String,
      required: [true, 'Please provide your WhatsApp number.'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Please provide a message.'],
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'contacts',
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Prevent mongoose model recompilation error in Next.js hot reload
const Contact: Model<IContact> =
  mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);

export default Contact;
