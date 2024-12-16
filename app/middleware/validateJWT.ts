import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

if (!SECRET_KEY) {
  throw new Error("JWT_SECRET environment variable is not set.");
}

export async function validateJWT(req: NextRequest) {
  // Retrieve the Authorization header
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return { valid: false, error: "Authorization header is missing." };
  }

  // Check if the token follows the Bearer format
  const tokenParts = authHeader.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return { valid: false, error: "Authorization header is malformed." };
  }

  const token = tokenParts[1];

  try {
    // Verify the JWT token
    const payload = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

    // Optionally validate specific claims (e.g., issuer, audience)
    if (!payload || !payload.id) {
      return { valid: false, error: "Invalid token payload." };
    }

    return { valid: true, payload };
  } catch (error) {
    // Handle JWT errors and return meaningful messages
    let errorMessage = "Invalid or expired token.";
    if (error instanceof jwt.TokenExpiredError) {
      errorMessage = "Token has expired.";
    } else if (error instanceof jwt.JsonWebTokenError) {
      errorMessage = "Token is invalid.";
    }

    console.error("JWT validation error:", error.message);
    return { valid: false, error: errorMessage };
  }
}
