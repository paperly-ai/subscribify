import express, { Request, Response } from 'express';
import Stripe from 'stripe';

const router = express.Router();
const stripe = new Stripe("sk_test_51OoJDOSDwYqHucXKi4FihG8H6VVWAzvbfEYYYpOXXV1beWhKZ6NTs2eCv6CqL709YPBacm8OljO6ULHUEdIKoVDv00v1teJiDG", {
  apiVersion: "2024-06-20",
});

const YOUR_DOMAIN = 'http://localhost:5173/chat';

const errorHandler = (err: any, res: Response) => {
  console.error('Error:', err);
  res.status(500).send('Internal Server Error');
};

interface CreateCheckoutSessionRequestBody {
  lookup_key: string;
}

interface CreatePortalSessionRequestBody {
  session_id: string;
}

router.post('/create-checkout-session', async (req: Request<any, any, CreateCheckoutSessionRequestBody>, res: Response) => {
  try {
    console.log(req.body.lookup_key);
    const prices = await stripe.prices.list({
      limit: 3,
      currency: 'inr',
    });

    const session = await stripe.checkout.sessions.create({
      billing_address_collection: 'required', 
      line_items: [
        {
          price: prices.data[0].id,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${YOUR_DOMAIN}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });

    console.log(session);
    res.json(session);
  } catch (error) {
    errorHandler(error, res);
  }
});

router.post('/create-portal-session', async (req: Request<any, any, CreatePortalSessionRequestBody>, res: Response) => {
  try {
    const { session_id } = req.body;
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: "lokesh", 
      return_url: YOUR_DOMAIN,
    });

    res.redirect(303, portalSession.url); 
  } catch (error) {
    errorHandler(error, res);
  }
});


export default router;
