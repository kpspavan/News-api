// pages/api/login.ts
import fs from "fs/promises";
import path from "path";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

const usersFilePath = path.join(process.cwd(), "data", "users.json");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    try {
      const usersData = JSON.parse(await fs.readFile(usersFilePath, "utf-8"));

      console.log("Username:", username);
      console.log("Password:", password);
      console.log("Users Data:", usersData);

      const user = usersData.find((user: any) => user.username === username);

      if (!user) {
        console.log("User not found");
        return res.status(401).json({ error: "User credentials not found" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        console.log("Incorrect password");
        return res.status(401).json({ error: "Incorrect password" });
      }

      // You might want to include additional user information in the response
      return res.status(200).json({ message: "Login successful" });
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
