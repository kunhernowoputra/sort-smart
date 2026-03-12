import { d as defineEventHandler, r as readBody, s as setCookie, c as createError } from '../../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const login_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (body.email === "admin@sortsmart.ai" && body.password === "password") {
    setCookie(event, "auth_session", "mock-session-id", {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7
      // 7 days
    });
    return {
      success: true,
      user: {
        id: 1,
        name: "Admin User",
        email: "admin@sortsmart.ai",
        role: "ADMIN"
      }
    };
  }
  throw createError({
    statusCode: 401,
    statusMessage: "Email atau password salah"
  });
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
