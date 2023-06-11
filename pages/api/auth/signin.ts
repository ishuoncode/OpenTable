
import { NextApiRequest, NextApiResponse } from 'next';
import validator from 'validator';
import { SignJWT } from 'jose';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { setCookie } from "cookies-next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const errors: string[] = [];
    const { Email, password } = req.body;
    //Check password 
    const passwordRegex =
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
    const isValidPassword = passwordRegex.test(password);

    if (!isValidPassword) {
      return res
        .status(400)
        .json({ errorMessage: 'Incorrect email or password' });
    }
    // checking  email address
    const validationSchema = [
      {
        valid: validator.isEmail(Email),
        errorMessage: 'Incorrect email or password',
      },
    ];
    //give error message if above validation is false
    validationSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage);
      }
    });

    if (errors.length) {
      return res.status(400).json({ errorMessage: errors[0] });
    }

    const user = await prisma.user.findUnique({
      where: { email: Email },
    });
    if (!user) {
      return res
        .status(401)
        .json({ errorMessage: 'Email or password is invalid' });
    }

    //compare user input password with database password
      const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ errorMessage: 'Email or password is invalid' });
    }

    // assign a jwt token to the user
    const alg = "HS256";
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ email: user.email })
      .setProtectedHeader({ alg })
      .setExpirationTime("24h")
      .sign(secret);

     // Set the cookie to the user Browser
    setCookie("jwt", token, { req, res, maxAge: 60 * 6 * 24 });

    return res.status(200).json({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      city: user.city,
    });
  }
  return res.status(404).json('Unknow endpoint');
}
