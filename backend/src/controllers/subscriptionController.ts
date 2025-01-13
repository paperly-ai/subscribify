import { Request, Response } from 'express';
import { createCheckoutSession } from '../client/subscriptionClient';
import Subscription from '../models/subscription';

export const createCheckout = async (req: Request, res: Response): Promise<void> => {
  const user = res.locals.user;
  try {
    const result = await createCheckoutSession();
    const subscription = new Subscription({
      session_id: result.id,
      user_id: user.id,
      status: 'inactive',
      type: 'premium'
    });
    await subscription.save();
    res.redirect(result.url);
  } catch (err:any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateSubscription = async (req: Request, res: Response): Promise<void> => {
  try {
    const subscription = await Subscription.findOneAndUpdate(
      { session_id: req.params.session_id },
      { status: 'active', ...req.body },
      { new: true }
    );
    if (subscription) {
      res.status(200).json(subscription); 
    } else {
      res.status(404).json({ error: 'Subscription not found' });
    }
  } catch (err:any) {
    res.status(400).json({ error: err.message });
  }
};
