# Nuxt 4.x Project Guidelines

## Tech Stack

- **Framework**: Nuxt 4.x (Vue 3 + Nitro server engine)
- **Language**: JavaScript (vanilla JS, no TypeScript)
- **Build Tool**: Vite
- **Server Engine**: Nitro (h3-based)
- **Package Manager**: npm (semua command menggunakan npm)

## Directory Structure (Nuxt 4 Default)

Nuxt 4 mengubah default `srcDir` menjadi `app/`. Berikut struktur direktori:

```
project-root/
├── app/                    # srcDir (~ alias points here)
│   ├── assets/             # Build-processed assets (CSS, images, fonts)
│   ├── components/         # Auto-imported Vue components
│   ├── composables/        # Auto-imported Vue composables (use* pattern)
│   ├── layouts/            # Layout components wrapping pages
│   ├── middleware/          # Route middleware (named, global)
│   ├── pages/              # File-based routing
│   ├── plugins/            # Vue plugins, auto-registered
│   ├── stores/             # Pinia stores (auto-imported)
│   ├── utils/              # Auto-imported utility functions
│   ├── app.vue             # Root component
│   ├── app.config.js       # Reactive app configuration
│   └── error.vue           # Error page
├── server/                 # Nitro server code
│   ├── api/                # API routes (auto-prefixed /api)
│   ├── routes/             # Server routes (no prefix)
│   ├── middleware/          # Server middleware (runs on every request)
│   ├── plugins/            # Nitro lifecycle plugins
│   └── utils/              # Server-side utilities (auto-imported)
├── shared/                 # Code shared between app and server
├── public/                 # Static files served at root (not processed)
├── content/                # File-based CMS (Nuxt Content module)
├── layers/                 # Reusable code layers
├── modules/                # Local Nuxt modules
├── nuxt.config.js          # Main Nuxt configuration
├── .nuxtrc                 # Additional Nuxt configuration
└── .nuxtignore             # Files to ignore during build
```

## Auto-Imports

Nuxt otomatis import dari direktori ini tanpa perlu statement import manual:

- `app/components/` - Vue components (named by directory path: `base/foo/Button.vue` -> `<BaseFooButton>`)
- `app/composables/` - Only top-level files scanned. For nested: re-export from `index.js` or configure in nuxt.config
- `app/stores/` - Pinia stores (named by file: `user.js` -> `useUserStore()`)
- `app/utils/` - Utility functions
- `server/utils/` - Server-side utilities
- Vue APIs: `ref`, `computed`, `watch`, `reactive`, etc.
- Nuxt composables: `useFetch`, `useAsyncData`, `useState`, `useRoute`, `useRouter`, `useRuntimeConfig`, `useNuxtApp`, etc.

Explicit imports available via `#imports` alias when needed.

## Component Conventions

- **Naming**: Path-based by default. `components/base/Button.vue` -> `<BaseButton>`
- **Lazy loading**: Prefix with `Lazy` -> `<LazyMountainsList>` for dynamic import
- **Client-only**: `.client.vue` suffix renders only on client
- **Server-only**: `.server.vue` suffix renders only on server (experimental)
- **Delayed hydration**: Use `hydrate-on-visible`, `hydrate-on-idle`, `hydrate-on-interaction`, `hydrate-never`, etc.
- **Dynamic components**: Use `resolveComponent('Name')` or import from `#components`
- Pages must have a **single root element** for route transitions

## Data Fetching — Mengambil Data

- **`useFetch`**: Primary composable untuk fetch data (SSR-safe, prevent double-fetch)
- **`useAsyncData`**: Untuk operasi async yang bukan berbasis URL
- **`$fetch`**: Direct fetch (gunakan di event handlers, bukan setup — bisa double-fetch di SSR)
- `data` default ke `undefined` (bukan `null`)
- `data` adalah `shallowRef` — replace seluruh object untuk trigger reactivity, atau gunakan `{ deep: true }`
- Call dengan key yang sama share data, error, dan status refs
- Data dibersihkan saat component terakhir yang menggunakannya unmount
- Buat custom `useAPI` composable untuk logic fetch project-specific (base URL, auth headers, error handling)

## Routing — Routing Berbasis File

- **File-based routing** via `app/pages/` — setiap file otomatis menjadi route
- **Dynamic routes**: `[id].vue`, optional: `[[slug]].vue`, catch-all: `[...slug].vue`
- **Nested routes**: Gunakan `<NuxtPage>` di parent components
- **Route groups**: Wrap folder dengan parentheses `(group)` — tidak mempengaruhi URL
- **Navigation**: `<NuxtLink>` untuk link, `navigateTo()` untuk programmatic (selalu `await`)
- **Client-only pages**: `.client.vue` suffix (render hanya di browser)
- **Server-only pages**: `.server.vue` suffix (render hanya di server)
- **Page metadata**: `definePageMeta({ layout, middleware, keepalive, ... })` untuk konfigurasi per-page

## Middleware

### Route Middleware (`app/middleware/`)
- **Anonymous**: Inline in `definePageMeta`
- **Named**: Files in `app/middleware/`, referenced in pages
- **Global**: `.global.js` suffix, runs on every route change
- Execution order: Global (alphabetical) -> Inline -> Named (array order)
- Use `01.setup.global.js` numbering to control global order
- Return `navigateTo()` to redirect, `abortNavigation()` to block
- Use `to` and `from` params, NOT `useRoute()` inside middleware

### Server Middleware (`server/middleware/`)
- Runs on every server request before route handlers
- Should NOT return values or close responses
- Use for logging, auth injection, request augmentation

## Server (Nitro)

- API routes in `server/api/` -> auto-prefixed with `/api`
- Server routes in `server/routes/` -> no prefix
- Use `defineEventHandler()` for all handlers
- HTTP method matching: suffix filename `.get.js`, `.post.js`, `.put.js`, `.delete.js`
- Dynamic params: `[name].js` -> `getRouterParam(event, 'name')`
- Body: `readBody(event)`, Query: `getQuery(event)`
- Errors: `throw createError({ statusCode: 400, message: '...' })`
- Runtime config: `useRuntimeConfig(event)` — always pass event
- Use `event.$fetch()` for context forwarding in server-to-server calls
- Background tasks: `event.waitUntil(promise)`
- Import server utils via `#server/utils/filename`

## Plugins (`app/plugins/`)

- Auto-registered, no need to add to nuxt.config
- Only top-level files scanned
- Use `.client.js` / `.server.js` suffixes for environment-specific plugins
- Order: alphabetical, use number prefixes `01.plugin.js` for control
- Provide helpers via `return { provide: { myHelper } }` — prefer composables instead
- Use `parallel: true` to avoid blocking, `dependsOn: ['name']` for dependencies

## Environment Variables & Runtime Config — Konfigurasi Environment

### Setup

Environment variables dapat diakses melalui `runtimeConfig` yang dideklarasikan di `nuxt.config.js`:

```js
// nuxt.config.js
export default defineNuxtConfig({
  runtimeConfig: {
    // ❌ Private (server-only) — Jangan expose ke client
    apiSecret: '',
    databaseUrl: '',

    // ✅ Public (client + server) — Safe untuk expose
    public: {
      apiBase: '',
      siteName: 'My App',
    },
  },
})
```

### Environment Variables Mapping

Nuxt otomatis membaca `.env` files dan memetakan ke `runtimeConfig`:

```bash
# .env atau .env.local
NUXT_API_SECRET=super-secret-key
NUXT_DATABASE_URL=postgresql://...
NUXT_PUBLIC_API_BASE=https://api.example.com
NUXT_PUBLIC_SITE_NAME="My App"
```

**Naming Convention:**
- Private: `NUXT_KEY_NAME` → `runtimeConfig.keyName`
- Public: `NUXT_PUBLIC_KEY_NAME` → `runtimeConfig.public.keyName`
- Nested: `NUXT_PUBLIC_API_BASE_URL` → `runtimeConfig.public.api.baseUrl` (gunakan underscore untuk nested)

### Accessing Config

**Di Vue Components:**
```js
<script setup>
// Akses dari composable (SSR-safe)
const config = useRuntimeConfig()
const apiBase = config.public.apiBase
</script>
```

**Di Server Routes:**
```js
// server/api/example.get.js
export default defineEventHandler((event) => {
  // Selalu pass event untuk proper environment override
  const config = useRuntimeConfig(event)
  const secret = config.apiSecret
  return { /* response */ }
})
```

**Di Plugins:**
```js
// app/plugins/api.js
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  // Setup dengan config
})
```

### Best Practices

- ✅ Deklarasikan semua env vars di `nuxt.config.js` (whitelist approach)
- ✅ Gunakan `NUXT_PUBLIC_*` hanya untuk non-sensitive data
- ✅ Jangan commit `.env.local` ke git (gunakan `.env.example`)
- ✅ Di production, set env vars langsung di hosting (tidak baca .env file)
- ❌ Jangan expose secrets ke client-side
- ❌ Jangan gunakan `process.env` langsung (gunakan `useRuntimeConfig()`)
- ❌ Jangan simpan API keys di components

## State Management — Pinia

### Setup

Install Pinia module:

```bash
# Auto setup (recommended)
npx nuxi@latest module add pinia

# Atau manual
npm install pinia @pinia/nuxt
```

**Configuration (`nuxt.config.js`):**
```js
export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  pinia: {
    // Optional: customize stores directory
    storesDirs: ['./app/stores'],
  },
})
```

### Creating Stores

**Directory Structure:**
```
app/
├── stores/
│   ├── user.js          # User store
│   ├── counter.js       # Counter store
│   └── cart.js          # Shopping cart store
```

**Simple Store (Setup API):**
```js
// app/stores/counter.js
export const useCounterStore = defineStore('counter', () => {
  // State
  const count = ref(0)
  const name = ref('Counter')

  // Getters
  const doubled = computed(() => count.value * 2)

  // Actions
  const increment = () => count.value++
  const reset = () => count.value = 0

  return {
    // State
    count,
    name,
    // Getters
    doubled,
    // Actions
    increment,
    reset,
  }
})
```

**Store dengan Options API:**
```js
// app/stores/user.js
export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isLoading: false,
    error: null,
  }),

  getters: {
    isLoggedIn: (state) => state.user !== null,
    userName: (state) => state.user?.name || 'Guest',
  },

  actions: {
    async fetchUser(id) {
      this.isLoading = true
      try {
        this.user = await $fetch(`/api/users/${id}`)
        this.error = null
      } catch (err) {
        this.error = err.message
        this.user = null
      } finally {
        this.isLoading = false
      }
    },

    logout() {
      this.user = null
      this.error = null
    },
  },
})
```

### Using Stores

**Di Components:**
```js
<script setup>
// Auto-imported store
const counter = useCounterStore()
const user = useUserStore()
</script>

<template>
  <div>
    <!-- Access state -->
    <p>{{ counter.count }}</p>

    <!-- Use getters -->
    <p v-if="user.isLoggedIn">Welcome {{ user.userName }}</p>

    <!-- Call actions -->
    <button @click="counter.increment">+</button>
  </div>
</template>
```

**Destructuring dengan reactivity:**
```js
<script setup>
const counter = useCounterStore()

// ❌ Loses reactivity
const { count, increment } = counter

// ✅ Keep reactivity
const { count, increment } = storeToRefs(counter)
</script>
```

### Best Practices

- ✅ Satu store per domain (user, products, cart, etc.)
- ✅ Keep state flat atau minimally nested
- ✅ Actions untuk logic kompleks, getters untuk derived state
- ✅ Gunakan `storeToRefs()` jika destructuring
- ✅ Reset store pada logout/cleanup
- ✅ Persist store data ke localStorage jika diperlukan (composable terpisah)
- ❌ Jangan mutate state langsung di components
- ❌ Jangan ubah store dari multiple places (centralize di actions)
- ❌ Jangan mix Pinia dengan `useState()` untuk same data

### Persisting Store Data

```js
// app/composables/useStorePersist.js
export const useStorePersist = () => {
  const user = useUserStore()

  onMounted(() => {
    // Load dari localStorage
    const saved = localStorage.getItem('user-store')
    if (saved) {
      user.$patch(JSON.parse(saved))
    }
  })

  // Auto-save saat berubah
  watch(() => user.$state, (state) => {
    localStorage.setItem('user-store', JSON.stringify(state))
  }, { deep: true })
}
```

## Authentication & Authorization — Otentikasi & Autorisasi

### Basic Session Pattern

**Server Route untuk Login:**
```js
// server/api/auth/login.post.js
export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)

  // Validate credentials (dalam production, cek ke database)
  const user = await db.users.findOne({ email })
  if (!user || !verifyPassword(password, user.password)) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
    })
  }

  // Set secure session cookie
  setCookie(event, 'auth_token', generateToken(user), {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    secure: true, // HTTPS only
    httpOnly: true, // Tidak accessible dari JavaScript
    sameSite: 'strict', // CSRF protection
  })

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  }
})
```

**Server Route untuk Logout:**
```js
// server/api/auth/logout.post.js
export default defineEventHandler((event) => {
  deleteCookie(event, 'auth_token')
  return { success: true }
})
```

### Auth Composable (Client-side)

```js
// app/composables/useAuth.js
export const useAuth = () => {
  const router = useRouter()
  const user = useState('auth.user', () => null)
  const isLoggedIn = computed(() => user.value !== null)

  // Check auth status on app load
  const initAuth = async () => {
    try {
      // Cek session dengan server
      const response = await $fetch('/api/auth/me')
      user.value = response.user
    } catch (err) {
      user.value = null
    }
  }

  // Login
  const login = async (email, password) => {
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    })
    user.value = response.user
    await navigateTo('/dashboard')
  }

  // Logout
  const logout = async () => {
    await $fetch('/api/auth/logout', { method: 'POST' })
    user.value = null
    await navigateTo('/login')
  }

  return {
    user: readonly(user),
    isLoggedIn,
    initAuth,
    login,
    logout,
  }
}
```

### Auth Middleware untuk Protected Routes

```js
// app/middleware/auth.js
export default defineRouteMiddleware((to, from) => {
  const { isLoggedIn, initAuth } = useAuth()

  // Initialize auth jika belum
  if (isLoggedIn.value === null) {
    initAuth()
  }

  // Jika belum login dan akses protected route
  if (!isLoggedIn.value && to.path.startsWith('/dashboard')) {
    return navigateTo('/login')
  }

  // Jika sudah login dan akses login page
  if (isLoggedIn.value && to.path === '/login') {
    return navigateTo('/dashboard')
  }
})
```

**Apply middleware ke pages:**
```js
// app/pages/dashboard/index.vue
<script setup>
definePageMeta({
  middleware: 'auth',
})
</script>
```

### Permission/Role-based Access

```js
// app/composables/useAuth.js (extended)
export const useAuth = () => {
  // ... previous code ...

  const hasPermission = (permission) => {
    return user.value?.permissions?.includes(permission) || false
  }

  const hasRole = (role) => {
    return user.value?.role === role
  }

  return {
    // ... previous ...
    hasPermission,
    hasRole,
  }
}
```

**Usage:**
```js
<script setup>
const { hasRole, hasPermission } = useAuth()
</script>

<template>
  <div v-if="hasPermission('edit-posts')" class="admin-panel">
    <!-- Admin content -->
  </div>
</template>
```

### Best Practices

- ✅ Simpan token di HTTP-only cookies (lebih aman dari localStorage)
- ✅ Implement session validation di middleware
- ✅ Check permissions di server-side (jangan trust client)
- ✅ Logout: clear cookies + state
- ✅ Add refresh token mechanism untuk long sessions
- ✅ CSRF protection dengan SameSite cookies
- ❌ Jangan simpan sensitive data di `useState` (exposed di HTML)
- ❌ Jangan trust client-side permission checks saja
- ❌ Jangan expose user data yang tidak perlu

## Error Handling — Penanganan Error

### Global Error Page

**Create `app/error.vue`:**
```vue
<script setup>
const error = useError()
const pendingPath = ref(null)

const clearError = () => {
  // Option 1: Redirect dan clear error
  navigateTo('/')

  // Option 2: Stay dan clear error
  // error.value = null
}

const goBack = () => {
  navigateTo(-1)
}
</script>

<template>
  <div class="error-page">
    <h1>{{ error?.statusCode || 500 }}</h1>
    <p>{{ error?.message || 'Something went wrong' }}</p>

    <button @click="goBack">Go Back</button>
    <button @click="clearError">Return Home</button>
  </div>
</template>
```

### Throwing Errors

**Di Server Routes:**
```js
// server/api/users/[id].get.js
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const user = await db.users.findOne({ id })

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found',
      data: { id }, // Optional context
    })
  }

  return user
})
```

**Di Components/Composables:**
```js
const { data, error } = await useFetch('/api/users/123')

if (error.value) {
  // Handle error gracefully
  console.error('Failed to load user:', error.value)
  // Show toast or message
}

// Atau throw untuk fatal error
if (!data.value?.id) {
  throw createError({
    statusCode: 400,
    statusMessage: 'Invalid user data',
    fatal: true, // Show full-page error
  })
}
```

### NuxtErrorBoundary untuk Component Errors

```vue
<template>
  <NuxtErrorBoundary @error="handleError">
    <template #default>
      <!-- Components yang mungkin error -->
      <MyRiskyComponent />
    </template>

    <template #error="{ error }">
      <!-- Show error locally (tidak replace whole page) -->
      <div class="error-box">
        <p>{{ error.message }}</p>
        <button @click="$fetch">Retry</button>
      </div>
    </template>
  </NuxtErrorBoundary>
</template>

<script setup>
const handleError = (error) => {
  // Log ke error tracking service
  console.error('Component error:', error)
}
</script>
```

### Custom Error Utilities

```js
// app/utils/errors.js
export const createApiError = (statusCode, message, data) => {
  return createError({
    statusCode,
    statusMessage: message,
    data,
    fatal: statusCode >= 500, // Server errors = fatal
  })
}

export const handleFetchError = (error) => {
  if (error.statusCode === 404) {
    // Not found handling
  } else if (error.statusCode === 403) {
    // Forbidden handling
    navigateTo('/login')
  } else if (error.statusCode >= 500) {
    // Server error
    console.error('Server error:', error)
  }
}
```

### Global Error Handling Hook

```js
// app/plugins/error-handler.js
export default defineNuxtPlugin((nuxtApp) => {
  // Hook untuk startup errors
  nuxtApp.hook('app:error', (error) => {
    // Log ke external service
    console.error('App error:', error)

    // Send to error tracking (Sentry, etc.)
    // errorTracker.captureException(error)
  })

  // Vue error handler
  nuxtApp.vueApp.config.errorHandler = (error, context) => {
    console.error('Vue error:', error, context)
  }
})
```

### Best Practices

- ✅ Throw meaningful errors dengan context
- ✅ Handle errors explicitly (jangan silent)
- ✅ Use NuxtErrorBoundary untuk component isolation
- ✅ Log errors ke error tracking service
- ✅ Provide user-friendly error messages
- ✅ Use `fatal: true` untuk unrecoverable errors
- ❌ Jangan ignore error responses
- ❌ Jangan expose internal error messages ke user
- ❌ Jangan use try-catch untuk control flow
- ❌ Jangan mix error handling di multiple places

## Database Integration — Integrasi Database

### Setup dengan Prisma (Recommended)

**Installation:**
```bash
npm install @prisma/client
npm install -D prisma
npx prisma init
```

**Konfigurasi `.env`:**
```bash
# .env.local (jangan commit)
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
# atau SQLite untuk development
DATABASE_URL="file:./dev.db"
```

**Setup Prisma Schema (`prisma/schema.prisma`):**
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql" // atau "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id    Int     @id @default(autoincrement())
  title String
  body  String?
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

### Database Client Utility

**Create `server/utils/db.js`:**
```js
// server/utils/db.js
import { PrismaClient } from '@prisma/client'

// Singleton pattern untuk dev/prod
const prismaClientSingleton = () => {
  return new PrismaClient()
}

const globalForPrisma = globalThis

export const db = globalForPrisma.prisma || prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db
}
```

### Using Database dalam Server Routes

**GET Example:**
```js
// server/api/users/[id].get.js
export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id'))

  try {
    const user = await db.user.findUnique({
      where: { id },
      include: { posts: true }, // Include relations
    })

    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found',
      })
    }

    return user
  } catch (error) {
    if (error.code === 'P2025') { // Prisma not found error
      throw createError({
        statusCode: 404,
        statusMessage: 'Resource not found',
      })
    }
    throw error
  }
})
```

**POST Example:**
```js
// server/api/users.post.js
export default defineEventHandler(async (event) => {
  const { email, name } = await readBody(event)

  // Validation
  if (!email || !name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email and name are required',
    })
  }

  try {
    const user = await db.user.create({
      data: {
        email,
        name,
      },
    })

    return user
  } catch (error) {
    if (error.code === 'P2002') { // Unique constraint violation
      throw createError({
        statusCode: 409,
        statusMessage: 'Email already exists',
      })
    }
    throw error
  }
})
```

**PUT/UPDATE Example:**
```js
// server/api/users/[id].put.js
export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id'))
  const { name, email } = await readBody(event)

  const user = await db.user.update({
    where: { id },
    data: {
      ...(name && { name }),
      ...(email && { email }),
    },
  })

  return user
})
```

**DELETE Example:**
```js
// server/api/users/[id].delete.js
export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id'))

  await db.user.delete({
    where: { id },
  })

  return { success: true }
})
```

### Database Composable (Client-side)

```js
// app/composables/useUsers.js
export const useUsers = () => {
  const users = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  const fetchUsers = async () => {
    isLoading.value = true
    error.value = null

    try {
      users.value = await $fetch('/api/users')
    } catch (err) {
      error.value = err.data?.message || 'Failed to load users'
    } finally {
      isLoading.value = false
    }
  }

  const createUser = async (userData) => {
    try {
      const newUser = await $fetch('/api/users', {
        method: 'POST',
        body: userData,
      })
      users.value.push(newUser)
      return newUser
    } catch (err) {
      throw err
    }
  }

  const updateUser = async (id, userData) => {
    try {
      const updated = await $fetch(`/api/users/${id}`, {
        method: 'PUT',
        body: userData,
      })
      const index = users.value.findIndex(u => u.id === id)
      if (index !== -1) users.value[index] = updated
      return updated
    } catch (err) {
      throw err
    }
  }

  const deleteUser = async (id) => {
    try {
      await $fetch(`/api/users/${id}`, { method: 'DELETE' })
      users.value = users.value.filter(u => u.id !== id)
    } catch (err) {
      throw err
    }
  }

  return {
    users: readonly(users),
    isLoading: readonly(isLoading),
    error: readonly(error),
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
  }
}
```

### Migrations

**Generate migration dari schema changes:**
```bash
npx prisma migrate dev --name <migration-name>
```

**Deploy migrations ke production:**
```bash
npx prisma migrate deploy
```

**Reset database (development only):**
```bash
npx prisma migrate reset
```

### Best Practices

- ✅ Gunakan Prisma schema sebagai single source of truth
- ✅ Keep database logic di server routes saja (jangan di composables)
- ✅ Validate input di server routes sebelum database operations
- ✅ Handle Prisma-specific error codes (P2002, P2025, etc.)
- ✅ Use transactions untuk operasi multi-step
- ✅ Use include/select untuk optimize query results
- ✅ Setup proper indexes di schema untuk frequent queries
- ✅ Use migrations untuk semua schema changes
- ❌ Jangan expose raw database errors ke client
- ❌ Jangan select sensitive fields yang tidak perlu
- ❌ Jangan share PrismaClient instances tanpa singleton pattern
- ❌ Jangan skip migrations di production

## Sensitive Data Handling — Penanganan Data Sensitif

### Tipe Data Sensitif Yang Harus Dilindungi

#### 1. Identitas Pribadi (Identity Theft Risk)
Data yang jika bocor dapat digunakan untuk pencurian identitas:
- **Nomor Identitas Resmi**: NIK (KTP), nomor Paspor, nomor SIM, NPWP
- **Informasi Biometrik**: Sidik jari, pemindaian retina, FaceID, struktur suara
- **Kontak Pribadi**: Alamat rumah, nomor telepon pribadi, email pribadi

#### 2. Informasi Finansial (Critical Security Risk)
Data yang memberikan akses langsung ke aset keuangan:
- **Detail Kartu**: Nomor kartu kredit/debit (PAN), kode CVV/CVC, tanggal kedaluwarsa
- **Rekening Bank**: Nomor rekening, riwayat transaksi (mutasi)
- **Kredensial Akses**: PIN ATM, password perbankan, Private Keys kripto

#### 3. Data Medis & Kesehatan (PHI - Protected Health Information)
Data bersifat sangat privat (dilindungi HIPAA, UU PDP):
- **Rekam Medis**: Riwayat penyakit, diagnosis dokter, hasil tes lab, resep obat
- **Informasi Asuransi**: Nomor polis asuransi, rincian klaim
- **Kesehatan Mental**: Catatan konseling, psikoterapi

#### 4. Kredensial Keamanan (Auth Data - NEVER Log)
Data untuk membuktikan identitas dalam sistem digital:
- **Kunci Rahasia**: Password, Secret Keys (API keys), Token sesi aktif
- **MFA Recovery**: Kode pemulihan untuk autentikasi dua faktor
- **OAuth Tokens**: Bearer tokens, refresh tokens, session cookies

#### 5. Data Privasi Khusus (Protected Personal Data)
Data yang menyangkut hak asasi dan preferensi personal:
- **Orientasi & Keyakinan**: Agama, pandangan politik, orientasi seksual, serikat pekerja
- **Lokasi Real-time**: GPS tracking, log pergerakan presisi seseorang

---

### Best Practices — Penanganan Data Sensitif

#### ❌ JANGAN Pernah Lakukan:

```js
// ❌ NEVER: Log sensitive data
console.log('User data:', user) // user object berisi password hash
console.log('Card:', cardNumber) // Expose nomor kartu
console.error('Auth error:', token) // Expose token ke error logs

// ❌ NEVER: Return raw sensitive data
return {
  user: {
    id: user.id,
    password: user.password, // ❌ NEVER
    ssn: user.ssn, // ❌ NEVER
    medicalHistory: user.medicalHistory, // ❌ NEVER
  }
}

// ❌ NEVER: Store di localStorage atau sessionStorage
localStorage.setItem('userPassword', password) // ❌
localStorage.setItem('apiKey', apiKey) // ❌
localStorage.setItem('creditCard', cardNumber) // ❌

// ❌ NEVER: Include dalam URL atau query params
navigateTo(`/checkout?cardNumber=4512111111111234`) // ❌
fetch(`/api/auth?password=${password}`) // ❌

// ❌ NEVER: Include dalam comments atau commit messages
// API Key: sk-1234567890abcdef ❌
// User ID 123 password is 'SecurePass123' ❌
```

#### ✅ DO: Implementasikan Best Practices:

**1. Masking / Anonymization — Tampilkan Data Sebagian:**
```js
// app/composables/useDataMasking.js
export const maskCardNumber = (cardNumber) => {
  // Input: "4512111111111234"
  // Output: "4512-xxxx-xxxx-1234"
  return cardNumber.replace(/(.{4})(?:.{8})(.{4})/, '$1-xxxx-xxxx-$2')
}

export const maskEmail = (email) => {
  // Input: "john.doe@example.com"
  // Output: "j***@example.com"
  const [name, domain] = email.split('@')
  return `${name.charAt(0)}${'*'.repeat(name.length - 2)}@${domain}`
}

export const maskPhone = (phone) => {
  // Input: "+62812345678"
  // Output: "+62812****678"
  return phone.replace(/(\+\d{3})(?:\d{4})(\d{3})/, '$1****$2')
}

export const maskNIK = (nik) => {
  // Input: "3201234567891234"
  // Output: "3201xxxx****1234"
  return nik.replace(/(.{4})(?:.{8})(.{4})/, '$1xxxx****$2')
}
```

**2. Select Only Non-Sensitive Fields:**
```js
// ❌ Bad - return semua fields
const user = await db.user.findOne({ id: userId })

// ✅ Good - explicit select
const user = await db.user.findOne(
  { id: userId },
  {
    select: {
      id: true,
      email: true,
      name: true,
      // EXCLUDE: password, ssn, medicalHistory, creditCard
    }
  }
)

// ✅ Better - use Prisma select
export const getUserPublicProfile = async (userId) => {
  return db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      avatar: true,
      createdAt: true,
    },
  })
}
```

**3. Encryption at Rest — Enkripsi di Database:**
```js
// server/utils/encryption.js
import crypto from 'crypto'

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY // 32 bytes hex
const ALGORITHM = 'aes-256-gcm'

export const encryptSensitiveData = (data) => {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(
    ALGORITHM,
    Buffer.from(ENCRYPTION_KEY, 'hex'),
    iv
  )

  let encrypted = cipher.update(data, 'utf8', 'hex')
  encrypted += cipher.final('hex')

  const authTag = cipher.getAuthTag()
  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`
}

export const decryptSensitiveData = (encryptedData) => {
  const [iv, authTag, encrypted] = encryptedData.split(':')
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    Buffer.from(ENCRYPTION_KEY, 'hex'),
    Buffer.from(iv, 'hex')
  )

  decipher.setAuthTag(Buffer.from(authTag, 'hex'))

  let decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8')

  return decrypted
}
```

**4. Field-Level Encryption — Enkripsi Kolom Tertentu:**
```js
// app/stores/user.js
import { encryptSensitiveData, decryptSensitiveData } from '~/server/utils/encryption'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),

  actions: {
    // Simpan ke server (enkripsi sensitive fields)
    async updateProfile(userData) {
      const toSend = {
        name: userData.name,
        email: userData.email,
        // SENSITIVE: encrypt sebelum send
        ssn: encryptSensitiveData(userData.ssn),
        medicalInfo: encryptSensitiveData(userData.medicalInfo),
      }

      const response = await $fetch('/api/users/profile', {
        method: 'PUT',
        body: toSend,
      })

      // NEVER store decrypted sensitive data di state
      this.user = response.user // Server return masked/minimal data
    },
  },
})
```

**5. NO LOGGING — Jangan Log Data Sensitif:**
```js
// ❌ Bad - log semua
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log('Request body:', body) // ❌ Expose password, API key, etc.
})

// ✅ Good - selective logging
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Log only non-sensitive fields
  console.log('Login attempt for:', body.email) // ✅

  // NEVER log:
  // - passwords
  // - tokens
  // - API keys
  // - credit card numbers
  // - medical information
})

// ✅ Best - custom logger
export const safeLog = (message, data) => {
  const safe = { ...data }

  // Remove sensitive keys
  const sensitiveKeys = [
    'password',
    'token',
    'apiKey',
    'apiSecret',
    'cardNumber',
    'cvv',
    'ssn',
    'medicalHistory',
  ]

  sensitiveKeys.forEach(key => {
    delete safe[key]
  })

  console.log(message, safe)
}
```

**6. HTTP-Only Cookies untuk Auth Token:**
```js
// server/api/auth/login.post.js
export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)

  // ... validate credentials ...

  // ✅ Set HTTP-Only cookie (not accessible from JavaScript)
  setCookie(event, 'auth_token', token, {
    maxAge: 60 * 60 * 24 * 7,
    secure: true, // HTTPS only
    httpOnly: true, // CRITICAL: tidak bisa diakses dari JS
    sameSite: 'strict', // CSRF protection
  })

  // Return user data tanpa sensitive fields
  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      // NEVER: password, ssn, medicalHistory
    },
    // NEVER return token dalam response
  }
})
```

**7. Environment Variables untuk Secrets:**
```bash
# .env.local (JANGAN COMMIT)
# Private keys (server-only)
NUXT_DATABASE_PASSWORD=xxxxx
NUXT_JWT_SECRET=xxxxx
NUXT_ENCRYPTION_KEY=xxxxx
NUXT_STRIPE_SECRET_KEY=xxxxx
NUXT_OAUTH_CLIENT_SECRET=xxxxx

# Public config (safe untuk expose)
NUXT_PUBLIC_API_BASE=https://api.example.com
NUXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_xxxxx
```

**8. Audit Logging untuk Sensitive Data:**
```js
// server/utils/auditLog.js
export const logSensitiveAccess = async (action, userId, resourceType) => {
  // Log ONLY:
  // - WHO accessed (userId)
  // - WHEN (timestamp)
  // - WHAT resource type (generic, tidak detail)
  // - ACTION (read, write, delete)

  // NEVER log:
  // - actual data content
  // - sensitive field values
  // - passwords, tokens

  await db.auditLog.create({
    data: {
      action, // 'READ_PROFILE', 'UPDATE_PAYMENT', etc.
      userId,
      resourceType, // 'USER_PROFILE', 'PAYMENT_METHOD', etc.
      timestamp: new Date(),
      ipAddress: getClientIP(event), // untuk security analysis
      // NOT: sensitiveData, passwords, tokens
    },
  })
}
```

---

### Checklist — Implementasi Data Security

- ✅ Identifikasi semua sensitive data di aplikasi
- ✅ Setup encryption at rest (AES-256) untuk database
- ✅ Gunakan HTTP-only cookies untuk auth tokens
- ✅ Mask sensitive data sebelum display ke user
- ✅ NEVER log passwords, tokens, atau credentials
- ✅ Use environment variables untuk secrets (JANGAN hardcode)
- ✅ Setup HTTPS everywhere (tidak HTTP plaintext)
- ✅ Implement audit logging untuk sensitive access
- ✅ Review database backups tidak expose sensitive data
- ✅ Implement row-level security di database
- ✅ Setup data retention policy (delete old logs, etc.)
- ✅ Regular security audits untuk compliance (GDPR, PDP, HIPAA)

---

### Compliance & Legal

**Indonesia:**
- **UU No. 27 Tahun 2022** (Perlindungan Data Pribadi) — Data pribadi, biometric, finansial
- **OJK Regulations** — Untuk data finansial dan keamanan transaksi
- **Bank Indonesia Guidelines** — Untuk integrasi payment gateway

**International:**
- **GDPR** (EU) — Personal data protection
- **HIPAA** (US) — Health information
- **PCI DSS** — Credit card data handling

---

### Tools & Libraries

```bash
# Encryption
npm install crypto-js argon2

# Environment management
npm install dotenv dotenv-vault

# Data validation & sanitization
npm install zod joi yup

# Audit logging
npm install winston pino

# Security headers
npm install helmet
```

---

## Rendering Modes

Configure in `nuxt.config.js`:

```js
export default defineNuxtConfig({
  // Global: SSR (default) or CSR
  ssr: true, // or false for SPA

  // Per-route hybrid rendering
  routeRules: {
    '/': { prerender: true },           // Static at build time
    '/products/**': { swr: 3600 },      // Stale-while-revalidate
    '/blog/**': { isr: true },          // Incremental static regeneration
    '/admin/**': { ssr: false },        // Client-side only
    '/old-page': { redirect: '/new' },  // Redirect
  },
})
```

## JavaScript — Bahasa Pemrograman

- Gunakan vanilla JavaScript (TypeScript tidak diperlukan)
- JSDoc comments bisa digunakan untuk optional type hints jika diperlukan
- Tidak perlu type checking — Nuxt bekerja seamless tanpa types

## Composable Rules

- Must be called synchronously within `<script setup>`, Vue lifecycle hooks, or Nuxt plugins
- Cannot be used outside Nuxt plugin, route middleware, or Vue setup function
- Only top-level files in `app/composables/` are auto-scanned
- For nested composables: re-export from `index.js` or configure custom scan patterns in nuxt.config

## Performance Best Practices

- Use `<NuxtLink>` instead of `<a>` — enables prefetching and smart internal/external detection
- Use `<NuxtImg>` instead of `<img>` for automatic image optimization
- Lazy-load non-critical components with `Lazy` prefix
- Use hybrid rendering `routeRules` for optimal caching per route
- Use `shallowRef` and `v-once` where appropriate
- Defer third-party scripts with Nuxt Scripts module
- Audit bundles with `nuxi analyze`

## Nuxt 4 Breaking Changes (from Nuxt 3)

Key migration items to be aware of:

1. **Directory**: `srcDir` defaults to `app/` — move app files into `app/` folder
2. **Data defaults**: `useFetch`/`useAsyncData` `data` defaults to `undefined` not `null`
3. **Shallow data**: `data` is `shallowRef` — use `{ deep: true }` if needed
4. **Singleton data**: Same key shares data/error/status across components
5. **Pending**: `pending` is `true` only when `status` is pending
6. **dedupe**: `dedupe: true/false` removed — use `'cancel'` or `'defer'`
7. **Component names**: Normalized to match Nuxt pattern (e.g., `SomeFolderMyComponent`)
8. **Module order**: Layer modules load before project modules
9. **Head**: Unhead v2 — removed `vmid`, `hid`, `children`, `body` props
10. **Prerender config**: Use `nitro.prerender` instead of `generate`
11. **CSS inlining**: Only Vue component CSS is inlined, not global CSS
12. **`window.__NUXT__`**: Removed — use `useNuxtApp().payload`
13. **callHook**: May return void — use `await` instead of `.then()`

## Code Style

- Use `<script setup>` in all Vue components
- Use Composition API exclusively (no Options API)
- Composables must follow `use*` naming convention
- Server handlers must use `defineEventHandler()`
- Prefer composables over plugin `provide` helpers
- Keep pages thin — extract logic into composables
- Use `definePageMeta()` for page configuration (not route meta in router config)
- Use camelCase for function and variable names
- Use PascalCase for component names

## Clean Code Principles

### Naming Conventions

- **Use descriptive, pronounceable names** — Code is read more than written
- **Make names searchable** — Avoid single-letter variables (except loop counters)
- **Avoid misleading names** — Don't use names that suggest something they don't deliver
- **Use intention-revealing names** — Name should answer: Why it exists, what it does, how it's used

```js
// ❌ Bad
const d = new Date()
const hl = getList()
const temp = []

// ✅ Good
const createdDate = new Date()
const userList = getList()
const tempUsers = []
```

### Functions (Single Responsibility)

- **Do one thing** — Function should do one thing, do it well, do it only
- **Keep functions small** — Ideally < 20 lines
- **Minimize parameters** — Maximum 2-3 parameters (0-2 preferred), use objects for multiple params
- **Avoid flag parameters** — Don't use boolean flags to determine behavior
- **No side effects** — Functions should not modify global state unexpectedly

```js
// ❌ Bad - does multiple things
const useUserData = (id, shouldCache = true, shouldValidate = false) => {
  // fetch, cache, validate, transform
}

// ✅ Good - single responsibility
const useFetchUser = (id) => {
  return useFetch(`/api/users/${id}`)
}
```

### Comments (Minimize, Make Meaningful)

- **Comments explain WHY, not WHAT** — Code should be clear enough; comments explain decisions
- **Avoid redundant comments** — Don't comment obvious code
- **No commented-out code** — Use git history instead
- **Keep comments updated** — Outdated comments are worse than no comments

```js
// ❌ Bad - redundant
const getUser = () => {
  // fetch user from API
  return fetch('/api/user')
}

// ✅ Good - meaningful WHY
const useFetchUser = (id) => {
  // Retry 3x because API timeout occurs ~5% of requests on first attempt
  return useFetch(`/api/users/${id}`, { retry: 3 })
}
```

### Code Organization (Vertical Structure)

- **High-level concepts first** — Read code top-to-bottom like a newspaper
- **Related concepts grouped together** — Minimize vertical distance
- **Functions called near their definition** — Define before use
- **Initialize imports/constants at top** — Then composables → refs → functions → lifecycle

```js
// ✅ Good structure
<script setup>
// 1. Imports
import { useUser } from '~/composables'
import Button from '~/components/Button.vue'

// 2. Constants
const MAX_RETRIES = 3

// 3. Composables/reactive
const user = useUser()
const route = useRoute()

// 4. Computed/derived state
const isAdmin = computed(() => user.value?.role === 'admin')

// 5. Functions
const handleSubmit = async () => { }

// 6. Lifecycle hooks
onMounted(() => { })
</script>
```

### DRY (Don't Repeat Yourself)

- **Extract repeated code into composables, utils, or components**
- **Reuse existing components instead of copy-paste**
- **Repeated logic = bug source** — Fix once in one place
- **Be pragmatic** — Don't over-abstract for hypothetical reuse

### Error Handling (Explicit, Never Silent)

- **Handle errors explicitly** — Don't ignore or silently fail
- **Throw meaningful errors** — Include context about what went wrong
- **Use try-catch for unexpected errors** — Not for control flow
- **Create custom error types when appropriate** — For domain-specific errors

```js
// ❌ Bad - silent failure
const user = await fetchUser(id).catch(() => null)

// ✅ Good - explicit error handling
const user = await useFetch(`/api/users/${id}`)
if (user.error.value) {
  throw createError({
    statusCode: 404,
    message: `User ${id} not found`
  })
}
```

### Testing (FIRST Principle)

- **Fast** — Tests should run quickly (< 100ms ideally)
- **Independent** — No dependencies or order requirements between tests
- **Repeatable** — Consistent results, no flakiness
- **Self-validating** — Pass/fail clearly, no manual checks
- **Timely** — Write tests before or alongside code

Tests should have:
- **One logical assertion** — Test one behavior per test
- **Clear, descriptive names** — Name should describe what's being tested
- **Arrange-Act-Assert pattern** — Setup → Execute → Verify

### Code Smells (Warning Signs)

Refactor if you notice:

- **Rigidity** — Hard to change without breaking things
- **Fragility** — Breaks in unexpected places when changed
- **Immobility** — Hard to extract and reuse in other contexts
- **Unnecessary complexity** — Over-engineered for current needs
- **Repetition** — Same code in multiple places
- **Opacity** — Hard to understand what code does

### Boy Scout Rule

**Leave the code cleaner than you found it.** Small improvements add up:
- Fix a comment while reading
- Rename an unclear variable
- Extract a repeated line
- Remove unused code
- Improve a small function

## Nuxt UI Component Library

### What is Nuxt UI

**Nuxt UI** is a comprehensive Vue component library with 125+ production-ready, accessible components built on:
- **Reka UI** — WAI-ARIA compliance, keyboard navigation, focus management
- **Tailwind CSS** — Fast builds, container queries, cascade layers
- **Tailwind Variants** — Dynamic styling with TypeScript support

**Key Features:**
- Accessible by default (WAI-ARIA, keyboard nav)
- Beautiful by default (modern aesthetic)
- 1000+ Vitest tests, actively maintained
- Works with Nuxt and standalone Vue projects
- Full TypeScript support & IntelliSense
- 200,000+ icons via Iconify
- Dark/Light mode with auto-detection
- i18n support for 50+ languages

### Installation & Setup

```bash
# Install Nuxt UI
npm install @nuxt/ui

# For Nuxt projects, add to nuxt.config.js
export default defineNuxtConfig({
  modules: ['@nuxt/ui'],
  ui: {
    colors: {
      primary: 'blue',
      // customize colors
    },
  },
})
```

### Component Categories

**125+ components organized into 12 categories:**

1. **Layout** (8) — App, Container, Error, Footer, Header, Main, Sidebar, Theme
2. **Element** (16) — Alert, Avatar, Badge, Button, Calendar, Card, Chip, Icon, Progress, Skeleton, etc.
3. **Form** (19) — Input, Checkbox, Select, Radio, Textarea, FileUpload, ColorPicker, Slider, etc.
4. **Data** (9) — Table, Accordion, Carousel, Timeline, Tree, ScrollArea, Empty, etc.
5. **Navigation** (8) — Breadcrumb, Pagination, Stepper, Tabs, CommandPalette, Link, etc.
6. **Overlay** (8) — Modal, Drawer, ContextMenu, Popover, Dropdown, Tooltip, Toast, Slideover
7. **Page** (23) — Marketing components for landing pages, pricing, blogs, changelogs
8. **Dashboard** (10) — Resizable panels, toolbars, dynamic dashboard layouts
9. **AI Chat** (7) — Conversational UI components powered by Vercel AI SDK
10. **Editor** (6) — Rich text editing with TipTap (markdown/HTML support)
11. **Content** (5) — Documentation navigation and search integration
12. **Utilities** (6) — Color mode switching, i18n helpers

### Key Components Usage

#### Button
```js
<UButton color="primary" variant="solid" size="md"
  leading-icon="i-heroicons-check" @click="handleClick">
  Click me
</UButton>
```

**Props:** `color`, `variant` (solid/outline/soft/subtle/ghost/link), `size`, `disabled`, `loading`, `icon`, `leadingIcon`, `trailingIcon`

#### Input
```js
<UInput v-model="email" type="email" placeholder="Enter email"
  color="primary" variant="outline" size="md"
  leading-icon="i-heroicons-envelope" :highlight="error" />
```

**Props:** `type`, `placeholder`, `color`, `variant`, `size`, `disabled`, `icon`, `loading`

#### Form (with Validation)
```js
<script setup>
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

const state = reactive({ email: '', password: '' })
</script>

<template>
  <UForm :state="state" :schema="schema" @submit="onSubmit">
    <UFormField name="email" label="Email">
      <UInput v-model="state.email" type="email" />
    </UFormField>

    <UFormField name="password" label="Password">
      <UInput v-model="state.password" type="password" />
    </UFormField>

    <UButton type="submit">Submit</UButton>
  </UForm>
</template>
```

**Validation Libraries:** Zod, Valibot, Yup, Joi, Regle, Superstruct or custom validation

#### Modal
```js
<UModal v-model:open="isOpen" title="Confirm Action" description="Are you sure?">
  <template #content>
    <p>This action cannot be undone.</p>
  </template>

  <template #footer>
    <UButton color="gray" @click="isOpen = false">Cancel</UButton>
    <UButton @click="handleConfirm">Confirm</UButton>
  </template>

  <UButton>Open Modal</UButton>
</UModal>
```

#### Table
```js
<UTable :rows="data" :columns="columns">
  <template #actions-data="{ row }">
    <UButton size="xs" color="primary" @click="editRow(row)">Edit</UButton>
  </template>
</UTable>
```

### Form Best Practices

- Use `<UForm>` with validation schemas (Zod recommended)
- Pair with `<UFormField>` for automatic label + error display
- Validate on `input`, `change`, `blur`, or submit
- Use `@error` event to handle submission errors (e.g., focus first invalid field)
- For nested forms, use the `nested` prop and dot notation for field names
- Track `dirty`, `touched`, `blurredFields` states for conditional UI

### Customization & Theming

**Configure in `nuxt.config.js`:**
```js
export default defineNuxtConfig({
  modules: ['@nuxt/ui'],
  ui: {
    colors: {
      primary: 'blue',
      secondary: 'gray',
    },
    components: {
      button: {
        default: {
          size: 'md',
          variant: 'solid',
        },
      },
    },
  },
})
```

**Dark Mode:** Auto-detected, no configuration needed. Control with `UColorMode` component or `useColorMode()` composable.

**Customizing Components:** Override via `class` and `ui` props:
```js
<UButton class="my-custom-class"
  :ui="{ base: 'custom-base', variant: { solid: 'custom-solid' } }">
  Custom Button
</UButton>
```

### Icon Integration

**200,000+ icons from Iconify available:**
```js
<UIcon name="i-heroicons-check" size="md" />
<UButton leading-icon="i-heroicons-check">Done</UButton>
```

Icon names follow pattern: `i-{collection}-{icon-name}`
- Common collections: `heroicons`, `mdi`, `feather`, `carbon`

### Accessibility

All Nuxt UI components include:
- WAI-ARIA attributes and roles
- Keyboard navigation (Tab, Escape, Arrow keys, Enter)
- Focus management
- Screen reader support
- Semantic HTML

**Always use semantic components** — don't use Button for links, use `<ULink>` or wrap with router-link.

### Best Practices with Nuxt UI

- ✅ Use components directly without custom wrappers (already accessible)
- ✅ Validate forms with schema libraries (Zod preferred)
- ✅ Use `UTable` for data display, pair with pagination
- ✅ Use `UToast` for notifications, `useToast()` to trigger
- ✅ Leverage dark mode automatically — don't manually toggle
- ✅ Use icons for visual clarity in buttons/inputs
- ✅ Keep modals simple — use for critical actions only
- ❌ Don't override component styles heavily (use theming instead)
- ❌ Don't ignore accessibility features
- ❌ Don't create custom components for built-in functionality

### Nuxt UI Composables

#### defineShortcuts — Keyboard Shortcuts

**Gunakan untuk menangani keyboard shortcuts di aplikasi:**

```js
<script setup>
// Definisikan keyboard shortcuts
defineShortcuts({
  meta_k: () => {
    // Command palette (Ctrl+K di Windows, ⌘+K di Mac)
    openCommandPalette()
  },
  'g-d': () => {
    // Sequence: G diikuti D (seperti vim)
    navigateTo('/dashboard')
  },
  escape: () => {
    // Close modal/menu
    closeModal()
  },
})
</script>
```

**Format Shortcut:**
- Single key: `'a'`, `'?'`, `'1'`
- Key combination: `'ctrl_shift_f'`, `'meta_k'`, `'shift_enter'`
- Sequence: `'g-d'`, `'g-h'` (tekan G lalu D)

**Modifiers:** `meta` (⌘/Ctrl), `ctrl`, `shift`

**Special Keys:** `escape`, `enter`, `arrowup`, `arrowdown`, `arrowleft`, `arrowright`

**Options:**
```js
defineShortcuts({
  'ctrl_k': {
    usingInput: false, // Hanya trigger jika tidak fokus ke input
    handler: () => { }
  },
  'cmd_slash': {
    usingInput: 'search', // Trigger hanya saat fokus ke input bernama 'search'
    handler: () => { }
  }
})
```

### Typography — Markdown & Prose Styling

**Nuxt UI menyediakan styling beautiful untuk prose content:**

#### Approach 1: ContentRenderer (Simplest)

```vue
<script setup>
import { ContentRenderer } from '@nuxtjs/content/components'

const { data } = await useAsyncData('content', () =>
  queryCollectionItem('content').where('_id', 'blog/first-post').findOne()
)
</script>

<template>
  <!-- Markdown otomatis mendapat prose styling -->
  <ContentRenderer :value="data" />
</template>
```

#### Approach 2: MDC Component (More Control)

```vue
<script setup>
// Gunakan untuk content dari API atau dynamic sources
const markdownContent = `
# Heading

**Bold text** dan _italic_.

\`\`\`js
const x = 1
\`\`\`
`
</script>

<template>
  <MDC :value="markdownContent" />
</template>
```

#### Approach 3: Direct Prose Components (Full Customization)

```vue
<template>
  <ProseH1>Judul Besar</ProseH1>
  <ProseP>Paragraf dengan styling otomatis</ProseP>
  <ProseCode>const x = 1</ProseCode>

  <ProseUl>
    <li>Item 1</li>
    <li>Item 2</li>
  </ProseUl>
</template>
```

**Automatic Element Mapping:**
- `# Heading` → `<ProseH1>` (dengan anchor links)
- `**Bold**` → `<ProseStrong>`
- `` `code` `` → `<ProseCode>` (dengan syntax highlight)
- Lists → `<ProseUl>`, `<ProseOl>`
- Links → `<ProseA>`
- Images → `<ProseImg>`

**Customization via `app.config.js`:**

```js
export default defineAppConfig({
  ui: {
    prose: {
      h1: {
        base: 'text-4xl font-bold text-gray-900 dark:text-white',
      },
      p: {
        base: 'text-lg text-gray-700 dark:text-gray-300',
      },
      code: {
        base: 'bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded',
      },
    },
  },
})
```

**MDC Syntax Support:**

Markdown files bisa include Vue components:

```markdown
# Blog Post

Ini paragraf biasa.

:::alert{type="info"}
Info callout dengan MDC syntax
:::

:::code-group
\`\`\`js [index.js]
const x = 1
\`\`\`

\`\`\`ts [index.ts]
const x: number = 1
\`\`\`
:::
```

### Best Practices with Nuxt UI Composables & Typography

**Composables:**
- ✅ Use `defineShortcuts` untuk keyboard navigation
- ✅ Set `usingInput: false` untuk mencegah shortcut conflict dengan form inputs
- ✅ Gunakan `meta_k` untuk command palette (cross-platform)
- ❌ Jangan set terlalu banyak shortcuts (user tidak akan ingat)

**Typography:**
- ✅ Gunakan `ContentRenderer` untuk markdown content dari Nuxt Content
- ✅ Customize prose styling di `app.config.js` untuk consistency
- ✅ Leverage MDC syntax untuk rich interactive content
- ✅ Use semantic HTML (`<ProseH1>`, `<ProseP>`) untuk accessibility
- ❌ Jangan hardcode styling di prose components

## Configuration Reference

```js
// nuxt.config.js
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },

  routeRules: {
    // per-route rendering rules
  },

  runtimeConfig: {
    secretKey: '', // server-only, from NUXT_SECRET_KEY env
    public: {
      apiBase: '', // client+server, from NUXT_PUBLIC_API_BASE env
    },
  },

  modules: [
    '@pinia/nuxt',    // State management
    '@nuxt/ui',       // UI components
    '@nuxt/image',    // Image optimization
    '@nuxt/fonts',    // Font optimization
    '@nuxt/icon',     // Icon library
  ],

  // Pinia state management
  pinia: {
    storesDirs: ['./app/stores'],
  },

  // UI customization
  ui: {
    colors: {
      primary: 'blue',
      secondary: 'gray',
    },
  },

  imports: {
    // auto-import configuration
  },

  components: [
    // component directory configuration
  ],

  nitro: {
    // Konfigurasi Nitro server
    prerender: {
      routes: [],
      ignore: [],
    },
  },
})
```

## API Reference — Composables & Utilities

### Essential Composables (Auto-imported)

**Data Fetching:**
- **`useFetch(url, options)`** — Primary composable untuk fetch data (SSR-safe)
  ```js
  const { data, error, status, refresh } = await useFetch('/api/users')
  ```
- **`useAsyncData(key, fn, options)`** — Untuk async operation non-URL
  ```js
  const { data } = await useAsyncData('users', () => $fetch('/api/users'))
  ```
- **`useState(key, init)`** — Reactive state shared SSR/client
  ```js
  const counter = useState('counter', () => 0)
  ```

**Navigation & Routing:**
- **`useRouter()`** — Vue Router instance
- **`useRoute()`** — Current route info
- **`navigateTo(to, options)`** — Navigate (always `await`)
  ```js
  await navigateTo('/dashboard')
  ```

**App & Context:**
- **`useNuxtApp()`** — Akses Nuxt app instance dan plugins
- **`useRuntimeConfig()`** — Akses runtime configuration
- **`useAppConfig()`** — Akses reactive app config

**Head & Meta:**
- **`useHead(meta)`** — Set page metadata (title, description, og tags)
  ```js
  useHead({
    title: 'Page Title',
    meta: [{ name: 'description', content: 'Description' }]
  })
  ```

**Others:**
- **`useCookie(name, options)`** — Reactive cookie access (SSR-safe)
- **`useRequestFetch()`** — Forward user headers/cookies di SSR
- **`useTemplateRef(key)`** — Get ref ke DOM element
- **`useError()`** — Access global error state

### Essential Components (Auto-imported)

**Page Components:**
- **`<NuxtLayout>`** — Render layout wrapper
- **`<NuxtPage>`** — Render page content dalam layout
- **`<NuxtLink to="...">`** — Navigation link (optimized)

**Other Components:**
- **`<ClientOnly fallback="...">`** — Render hanya client-side
- **`<NuxtImg>`** — Image component dengan optimization
- **`<NuxtErrorBoundary>`** — Error boundary untuk component

### Essential Utilities

**HTTP & Fetch:**
- **`$fetch(url, options)`** — Global HTTP client (built on ofetch)
  ```js
  const data = await $fetch('/api/users', {
    method: 'POST',
    body: { name: 'John' }
  })
  ```

**Navigation & Errors:**
- **`navigateTo(to)`** — Navigate to route
- **`abortNavigation(error)`** — Prevent navigation
- **`createError(options)`** — Create meaningful error
  ```js
  throw createError({ statusCode: 404, statusMessage: 'Not Found' })
  ```

**Definitions:**
- **`definePageMeta(meta)`** — Set page metadata
- **`defineRouteMiddleware(fn)`** — Define route middleware
- **`defineNuxtPlugin(plugin)`** — Define plugin
- **`defineNuxtConfig(config)`** — Define configuration

## CLI Commands — Command Line Interface

**Development:**
```bash
npm run dev              # Start dev server (localhost:3000)
npm run dev -- --port 8000  # Custom port
npm run dev -- --open    # Auto-open browser
npm run dev -- --https   # Enable HTTPS
```

**Building:**
```bash
npm run build            # Build untuk production
npm run generate         # Pre-render static site (SSG)
npm run preview          # Preview production build
```

**Analysis & Inspection:**
```bash
npm run analyze          # Analyze bundle size
npm run build -- --analyze  # Build with bundle analysis
npx nuxi typecheck       # Type checking
npx nuxi prepare         # Generate .nuxt directory
npx nuxi info            # Show project info
```

**Command Options:**
- `--cwd <dir>` — Working directory
- `--logLevel <level>` — Logging level (silent, info, verbose)
- `--dotenv <file>` — Load .env file
- `-p, --port <number>` — Port
- `-h, --host <string>` — Host address

## Essential Nuxt Modules

### Nuxt Image — Image Optimization

**Fungsi:** Plug-and-play image optimization dengan resize, transform, dan optimization otomatis.

**Installation:**
```bash
npm install @nuxt/image
```

**Configuration (`nuxt.config.js`):**
```js
export default defineNuxtConfig({
  modules: ['@nuxt/image'],
  image: {
    // Pilih provider: ipx (default), cloudinary, imgix, vercel, sanity, etc.
    provider: 'ipx', // Built-in resizer
    domains: ['example.com'],

    // Atau gunakan CDN provider
    // provider: 'cloudinary',
    // cloudinary: { baseURL: 'https://res.cloudinary.com/...' }
  },
})
```

**Usage:**
```vue
<!-- Replace <img> dengan <NuxtImg> -->
<NuxtImg src="/image.jpg" width="300" height="200" />

<!-- Responsive images -->
<NuxtImg
  src="/image.jpg"
  sizes="sm:100vw md:50vw lg:400px"
  alt="Description"
/>

<!-- Use <NuxtPicture> untuk srcset & format optimization -->
<NuxtPicture src="/image.jpg" preload />
```

**Features:**
- Automatic WebP/AVIF format support
- Dynamic responsive image generation
- Support untuk 20+ image providers (Cloudinary, Imgix, Vercel, Sanity, Shopify, etc.)
- Built-in IPX resizer (no external dependency)

**Best Practices:**
- ✅ Selalu gunakan `<NuxtImg>` bukan `<img>` untuk performa
- ✅ Set `width` dan `height` untuk prevent layout shift
- ✅ Gunakan `sizes` prop untuk responsive images
- ✅ Enable preload untuk critical images
- ❌ Jangan upload image ukuran besar (optimize terlebih dahulu)

### Nuxt Fonts — Web Font Optimization

**Fungsi:** Zero-config web font optimization - download, cache, dan optimize otomatis.

**Installation:**
```bash
npm install @nuxt/fonts
```

**Configuration (`nuxt.config.js`):**
```js
export default defineNuxtConfig({
  modules: ['@nuxt/fonts'],
  fonts: {
    families: {
      // Google Fonts
      'Poppins': [400, 500, 600, 700],
      'Inter': [400, 500, 600, 700],

      // Fallback fonts
      'serif': 'Georgia, serif',
    },

    // Optional: custom providers
    provider: 'google', // default
  },
})
```

**Usage (dalam CSS):**
```css
body {
  font-family: 'Poppins', sans-serif;
}

h1 {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
}
```

**Features:**
- Zero configuration (deklarasi font-family, module handle sisanya)
- Support 6 built-in providers (Google Fonts, Bunny, etc.)
- Custom providers support
- Automatic font metric optimization (fontaine, capsize)
- Font file download untuk production (no external requests)
- Built-in caching at dev/build time

**Best Practices:**
- ✅ Load hanya font weights yang digunakan
- ✅ Gunakan fallback fonts untuk better CLS
- ✅ Leverage font metric optimization otomatis
- ❌ Jangan load terlalu banyak font weights

### Nuxt Icon — Icon Library (200k+ Icons)

**Fungsi:** Access 200k+ icons dari Iconify library dengan SVG atau CSS rendering.

**Installation:**
```bash
npm install -D @nuxt/icon
# atau
npx nuxi module add icon
```

**Configuration (`nuxt.config.js`):**
```js
export default defineNuxtConfig({
  modules: ['@nuxt/icon'],
  icon: {
    // Mode: 'svg' (default) atau 'css'
    mode: 'svg',

    // Custom aliases untuk easier component swap
    aliases: {
      'my-icon': 'i-heroicons-star',
    },
  },
})
```

**Usage:**
```vue
<template>
  <!-- Basic usage -->
  <Icon name="i-heroicons-star" />

  <!-- Custom size & color -->
  <Icon name="i-heroicons-check" size="24" class="text-green-500" />

  <!-- Dengan SVG mode (default) -->
  <Icon name="uil:github" :size="32" />

  <!-- Dengan alias -->
  <Icon name="my-icon" />

  <!-- Local SVG file -->
  <Icon name="local-icon" />
</template>
```

**Icon Collections:**
- **heroicons** — `i-heroicons-star`, `i-heroicons-check`, `i-heroicons-menu`
- **uil** — `i-uil:github`, `i-uil:sun`
- **mdi** — `i-mdi:account`
- **carbon** — `i-carbon:add`
- **tabler** — `i-tabler:star`
- Dan 200k+ lainnya dari Iconify

**Format:** `i-{collection}:{icon-name}`

**Customization:**
```js
// app.config.js
export default defineAppConfig({
  icon: {
    size: '24px', // Default size
    class: 'icon', // CSS class
    aliases: {
      'close': 'i-heroicons-x-mark',
      'menu': 'i-heroicons-bars-3',
    },
  },
})
```

**Best Practices:**
- ✅ Gunakan semantic icon names untuk consistency
- ✅ Install local collections (`@iconify-json/heroicons`) untuk performa
- ✅ Gunakan aliases untuk easier component swaps
- ✅ SVG mode lebih fleksibel, CSS mode lebih ringan
- ❌ Jangan load terlalu banyak icon collections

### Nuxt Test Utils — Testing Framework

**Fungsi:** First-class testing support untuk unit & E2E testing dengan Vitest, Jest, atau Playwright.

**Installation:**
```bash
npm i --save-dev @nuxt/test-utils vitest @vue/test-utils happy-dom
# Untuk E2E testing tambahkan:
npm i --save-dev playwright-core
```

**Project Structure:**
```
test/
├── unit/               # Node environment (faster)
│   └── utils.spec.js
├── nuxt/               # Nuxt runtime (component testing)
│   └── components.spec.js
└── e2e/                # End-to-end tests
    └── pages.spec.js
```

**Configuration (`vitest.config.js`):**
```js
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import nuxt from '@nuxt/test-utils/build'

export default defineConfig({
  plugins: [nuxt(), vue()],
  test: {
    environment: 'happy-dom',
    globals: true,
  },
})
```

**Unit Testing (Components):**
```js
import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils'
import MyComponent from '~/components/MyComponent.vue'

describe('MyComponent', () => {
  it('renders correctly', async () => {
    // Mount component dalam Nuxt environment
    const component = await mountSuspended(MyComponent)
    expect(component.text()).toContain('Expected text')
  })
})
```

**Unit Testing (Utilities):**
```js
import { describe, it, expect } from 'vitest'
import { myUtil } from '~/utils/myUtil'

describe('myUtil', () => {
  it('works correctly', () => {
    expect(myUtil(5)).toBe(10)
  })
})
```

**E2E Testing:**
```js
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils'

describe('E2E Tests', async () => {
  await setup({
    // Options: setupTimeout, build, server, browser, host
  })

  it('fetches data', async () => {
    const data = await $fetch('/api/users')
    expect(data).toHaveLength(5)
  })

  it('renders page', async () => {
    const html = await $fetch('/')
    expect(html).toContain('Welcome')
  })
})
```

**Testing Helpers:**
- **`mountSuspended(component)`** — Mount component dalam Nuxt environment
- **`renderSuspended(component)`** — Render dengan Testing Library (screen, fireEvent)
- **`mockNuxtImport(name, mock)`** — Mock auto-import composables
- **`mockComponent(name, mock)`** — Mock Nuxt components
- **`registerEndpoint(path, handler)`** — Mock Nitro endpoints

**Testing Patterns:**
```js
// Test composables
import { mockNuxtImport } from '@nuxt/test-utils'

mockNuxtImport('useUser', () => ({
  useUser: () => ({
    user: ref({ name: 'John' })
  })
}))

// Test API calls
import { registerEndpoint } from '@nuxt/test-utils'

registerEndpoint('/api/test', () => ({ success: true }))

// Test dengan API mocking
const { data } = await useFetch('/api/test')
```

**Best Practices:**
- ✅ Pisahkan unit tests dari Nuxt-dependent tests
- ✅ Gunakan `happy-dom` untuk unit tests (lebih cepat)
- ✅ Gunakan Playwright untuk E2E testing
- ✅ Mock API responses dengan `registerEndpoint`
- ✅ Reset global state antara tests
- ✅ Gunakan `beforeAll`, `afterEach` untuk setup/cleanup
- ❌ Jangan mix unit & E2E tests di file yang sama
- ❌ Jangan mutate global state tanpa reset

**Run Tests:**
```bash
npm run test              # Run all tests
npm run test:unit        # Unit tests only
npm run test:e2e         # E2E tests only
npm run test -- --watch  # Watch mode
```
