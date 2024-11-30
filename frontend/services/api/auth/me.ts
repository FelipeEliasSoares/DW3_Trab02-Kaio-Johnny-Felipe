import type { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "mysecretkey";

export default function meHandler(req: NextApiRequest, res: NextApiResponse) {
  const { auth_token } = parse(req.headers.cookie || "");

  if (!auth_token) {
    return res.status(401).json({ message: "Não autenticado" });
  }

  try {
    const decoded = jwt.verify(auth_token, SECRET_KEY) as { email: string };
    res.status(200).json({ user: { email: decoded.email } });
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
  }
}
