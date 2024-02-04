// pages/api/signup.ts
import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';

const saltRounds = 10; // Use a consistent value for salt rounds

const usersFilePath = path.join(process.cwd(), 'data', 'users.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      // Ensure the data directory exists
      await fs.mkdir(path.dirname(usersFilePath), { recursive: true });

      // Read existing user data from the JSON file
      const usersData = JSON.parse(await fs.readFile(usersFilePath, 'utf-8'));

      // Check if the username already exists
      if (usersData.some((user: any) => user.username === username)) {
        return res.status(400).json({ error: 'Username already exists' });
      }

      // Hash the password using a consistent salt value
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Add the new user to the array
      const newUser = { username, password: hashedPassword };
      usersData.push(newUser);

      // Write the updated user data back to the JSON file
      await fs.writeFile(usersFilePath, JSON.stringify(usersData));

      return res.status(200).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error during signup:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
