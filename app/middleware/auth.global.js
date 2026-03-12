// app/middleware/auth.global.js
export default defineNuxtRouteMiddleware((to, from) => {
  const { isLoggedIn } = useAuth()

  // Allow access to login page
  if (to.path === '/login') {
    if (isLoggedIn.value) {
      return navigateTo('/')
    }
    return
  }

  // Protect all other routes
  if (!isLoggedIn.value) {
    return navigateTo('/login')
  }
})
