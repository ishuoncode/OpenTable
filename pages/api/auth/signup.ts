import { NextApiRequest, NextApiResponse } from 'next';
import validator from 'validator';
import { PrismaClient } from '@prisma/client';
import { SignJWT } from 'jose';
import { setCookie } from 'cookies-next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const errors: string[] = [];
    const { firstname, lastname, Email, password, city, phone } = req.body;

    //Check password 
    const passwordRegex =
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
    const isValidPassword = passwordRegex.test(password);
    if (!isValidPassword) {
      return res
        .status(400)
        .json({ errorMessage: 'Incorrect  password' });
    }

    //check mobile phone number
    const MobilePhoneRegex =/^[0-9]{10}$/;
    const isValidMobilePhone = MobilePhoneRegex.test(phone);
    if (!isValidMobilePhone) {
        return res
          .status(400)
          .json({ errorMessage: 'Incorrect  phone' });
      }
    //checking if password is strong or not && check email address
    const validationSchema = [
      {
        valid: validator.isStrongPassword(password),
        errorMessage: 'Password is not strong',
      },
      {
        valid: validator.isEmail(Email),
        errorMessage: 'Email is invalid',
      }
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
    //check user email already exit 
    const userEmailExist = await prisma.user.findUnique({
      where: { email: Email },
    });

    if (userEmailExist) {
      return res.status(400).json({ errorMessage: 'Email already exists' });
    }
    //check user phone already exit 
    const userPhoneExist = await prisma.user.findUnique({
      where: { phone },
    });
    if (userPhoneExist) {
      return res
        .status(401)
        .json({ errorsMessage: 'Phone number already exists' });
    }

    // hashed the user input password 
    const bcrypt=await import ('bcrypt'); //dynamic bcrypt implementation
    const hashedPassword = await bcrypt.hash(password, 10);

    //create a new user
    const user = await prisma.user.create({
      data: {
        first_name: firstname,
        last_name: lastname,
        password: hashedPassword,
        city: city,
        phone: phone,
        email: Email,
      },
    });
     // assign a jwt token to the user
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ email: user.email})
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(secret);

      // console.log("🚀 ~ file: signup.ts:85 ~ token:", token)
      // Set the cookie to the user Browser
      setCookie('jwt', token, { req, res, maxAge: 60 * 6 * 24 });

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
