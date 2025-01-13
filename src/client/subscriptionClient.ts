import axios from 'axios';
import { error } from 'console';

const SUBSCRIPTION_SERVICE_URL = process.env.SUBSCRIPTION_SERVICE_URL

export async function createCheckoutSession() {
  const url = `${SUBSCRIPTION_SERVICE_URL}/api/stripe/create-checkout-session`;
  try {
    const response = await axios.post(url);
    if (response.status == 201) {
      return response.data;
    }
    else {
      throw error("Client Exception");
    }
  } catch (error) {
    console.error('Error upserting document:', error);
    throw error;
  }
}

