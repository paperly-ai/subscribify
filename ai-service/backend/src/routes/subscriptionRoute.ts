import { Router } from 'express';
import { createCheckout, updateSubscription } from '../controllers/subscriptionController';

const subscriptionRouter = Router();

subscriptionRouter.post('/checkout', createCheckout);
subscriptionRouter.post('/update/:session_id', updateSubscription);

export default subscriptionRouter;
