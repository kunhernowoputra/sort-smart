export function useColorMode() {
  const isDark = ref(true)

  const apply = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('color-mode', isDark.value ? 'dark' : 'light')
  }

  const toggle = () => {
    isDark.value = !isDark.value
    apply()
  }

  onMounted(() => {
    const saved = localStorage.getItem('color-mode')
    isDark.value = saved ? saved === 'dark' : true // default: dark
    apply()
  })

  return { isDark, toggle }
}
