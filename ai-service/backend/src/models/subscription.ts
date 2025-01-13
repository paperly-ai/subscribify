import mongoose, { Document, Schema } from 'mongoose';

interface ISubscription extends Document {
  session_id: string;
  status: 'active' | 'inactive' | 'canceled' | 'expired';
  type: 'free' | 'premium' | 'trial';
  user_id: string;
}

const SubscriptionSchema: Schema = new Schema({
  session_id: { type: String, required: true, unique: true },
  status: { type: String, enum: ['active', 'inactive', 'canceled', 'expired'], default: 'inactive' },
  type: { type: String, enum: ['free', 'premium', 'trial'], required: true },
  user_id: { type: String, required: true },
});

const Subscription = mongoose.model<ISubscription>('Subscription', SubscriptionSchema);

export default Subscription;
