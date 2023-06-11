import { NextApiRequest, NextApiResponse } from 'next';

import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

///////////Extract USER data from  jwt payload //////////
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bearerToken = req.headers['authorization'] as string;

  const token = bearerToken.split(' ')[1];

  // Get the email from jwt payload
  const payload = jwt.decode(token) as { email: string };

  if (!payload.email) {
    return res.status(401).json({ message: 'Unauthorized request' });
  }

  const user = await prisma.user.findUnique({
    where: { email: payload.email },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      city: true,
      phone: true
    },
  });
  if (!user) {
    return res.status(401).json({ message: 'USER not found' });
  }

  return res
    .status(200)
    .json({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      city: user.city,
      phone: user.phone 
    });
}
