// server/api/auth/logout.post.js
export default defineEventHandler((event) => {
  deleteCookie(event, 'auth_session')
  return { success: true }
})
