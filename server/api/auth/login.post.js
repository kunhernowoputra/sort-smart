// server/api/auth/login.post.js
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  // Simulation for Phase 1
  if (body.email === 'admin@sortsmart.ai' && body.password === 'password') {
    // Set mock cookie
    setCookie(event, 'auth_session', 'mock-session-id', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    return {
      success: true,
      user: {
        id: 1,
        name: 'Admin User',
        email: 'admin@sortsmart.ai',
        role: 'ADMIN'
      }
    }
  }

  throw createError({
    statusCode: 401,
    statusMessage: 'Email atau password salah',
  })
})
