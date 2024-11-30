import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default function logoutHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader(
    "Set-Cookie",
    serialize("auth_token", "", {
      httpOnly: true,
      path: "/",
      expires: new Date(0),
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
  );

  res.status(200).json({ message: "Logout bem-sucedido" });
}
