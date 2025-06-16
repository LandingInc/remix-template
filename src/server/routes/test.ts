import { Router } from 'express';

const testRouter = Router();

testRouter.get('/', (req, res) => {
  res.json({ message: 'TEST API' });
});

export default testRouter;
