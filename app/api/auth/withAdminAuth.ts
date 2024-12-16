import { NextRequest, NextResponse } from "next/server";
import { validateJWT } from "@/app/middleware/validateJWT";

export async function withAdminAuth(req: NextRequest) {
  const validation = await validateJWT(req);
  if (!validation.valid) {
    return NextResponse.json({ error: validation.error }, { status: 401 });
  }

  const { payload } = validation;
  if (payload?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return { valid: true, payload };
}
