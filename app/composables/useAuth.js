// app/composables/useAuth.js
export const useAuth = () => {
  const user = useState('auth:user', () => null)
  const isLoading = useState('auth:loading', () => false)

  const isLoggedIn = computed(() => !!user.value)

  const login = async (email, password) => {
    isLoading.value = true
    try {
      const response = await $fetch('/api/auth/login', {
        method: 'POST',
        body: { email, password }
      })
      user.value = response.user
      return { success: true }
    } catch (error) {
      return { success: false, error: error.statusMessage || 'Login failed' }
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    await $fetch('/api/auth/logout', { method: 'POST' })
    user.value = null
    navigateTo('/login')
  }

  return {
    user,
    isLoggedIn,
    isLoading,
    login,
    logout
  }
}
