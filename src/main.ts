import express, { Request, Response } from 'express';
import Stripe from 'stripe';

const router = express.Router();
const stripe = new Stripe("sk_test_51OoJDOSDwYqHucXKi4FihG8H6VVWAzvbfEYYYpOXXV1beWhKZ6NTs2eCv6CqL709YPBacm8OljO6ULHUEdIKoVDv00v1teJiDG", {
  apiVersion: "2024-06-20",
});

const YOUR_DOMAIN = 'http://localhost:3000';

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
    console.log(req.body.lookup_key)
    const prices = await stripe.prices.list({
      limit: 3,
    });
    console.log(prices.data[0].id);

    const session = await stripe.checkout.sessions.create({
      billing_address_collection: 'auto',
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

// Create portal session endpoint
router.post('/create-portal-session', async (req: Request<any, any, CreatePortalSessionRequestBody>, res: Response) => {
  try {
    const { session_id } = req.body;
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: "lokesh", // Replace with actual customer ID
      return_url: YOUR_DOMAIN,
    });

    res.redirect(303, portalSession.url); // Redirect to Billing Portal
  } catch (error) {
    errorHandler(error, res);
  }
});

// Webhook handling endpoint
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const payload = req.body;
  const sig = req.headers['stripe-signature'] as string;
  const endpointSecret = 'whsec_12345'; // Replace with your endpoint secret

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err: any) {
    console.error('Webhook Error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'customer.subscription.trial_will_end':
    case 'customer.subscription.deleted':
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      console.log(`Subscription event received: ${event.type}`);
      break;
    case 'entitlements.active_entitlement_summary.updated':
      console.log(`Active entitlement summary updated for ${event.data.object}`);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

export default router;
