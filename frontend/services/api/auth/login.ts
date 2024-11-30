import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "9as1%12";

export default function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (email === "admin" && password === "admin") {
      const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });

      res.setHeader(
        "Set-Cookie",
        serialize("auth_token", token, {
          httpOnly: true,
          path: "/",
          maxAge: 3600,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        })
      );

      return res.status(200).json({ user: { email } });
    } else {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}
