// app/composables/useColorMode.js
export function useColorMode() {
  const colorMode = useNuxtApp().$colorMode
  
  const isDark = computed(() => colorMode.value === 'dark')

  const toggle = () => {
    colorMode.preference = isDark.value ? 'light' : 'dark'
  }

  return { isDark, toggle }
}
