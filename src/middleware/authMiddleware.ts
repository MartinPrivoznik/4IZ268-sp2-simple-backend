import { Request, Response, NextFunction } from 'express';

export function requireApiToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log('API_TOKEN');
  const token = req.headers['x-api-token'] as string;

  if (!token) {
    return res.status(401).json({ message: 'API token is required' });
  }

  if (token !== process.env.API_TOKEN) {
    return res.status(403).json({ message: 'Invalid API token' });
  }

  next();
}
