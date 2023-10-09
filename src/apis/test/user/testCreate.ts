import express, { Request, Response } from 'express';

export const testCreate = (req: Request, res: Response) => {
  res.status(200).json({ data: 'hello' });
};
