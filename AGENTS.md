# soundWare — Expo SDK 56

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Expo SDK 56 (managed workflow) |
| Routing | expo-router (file-based, `src/app/`) |
| UI | React Native 0.85 + StyleSheet.create() |
| State | Zustand (un store por dominio en `src/stores/`) |
| Types | TypeScript 6.0 con strict: true |
| Animations | react-native-reanimated 4.3 |
| Styling | StyleSheet.create() nativo, sin librerías externas |
| Imports | Absolutos desde `@/` = `./src/`, `@/assets/` = `./assets/` |
| Package manager | pnpm |

## Estructura de carpetas

```
src/
├── app/            # Rutas de expo-router (file-based routing)
│   ├── _layout.tsx # Layout raíz con ThemeProvider
│   └── (tabs)/     # Agrupación de tabs
├── components/     # Componentes compartidos (PascalCase, un archivo por componente)
│   └── ui/         # Primitivas de UI reutilizables
├── constants/      # Colores, temas, tipografía, espaciado
├── hooks/          # Custom hooks (prefijo `use`, un hook por archivo)
├── stores/         # Stores de Zustand (sufijo `Store`, un store por dominio)
├── types/          # Tipos e interfaces compartidas
└── utils/          # Funciones utilitarias puras
```

## Convenciones de nombres

- **Componentes**: `PascalCase` → `Button.tsx`, `UserCard.tsx`
- **Screens (rutas)**: `kebab-case` dentro de `src/app/` → `explore.tsx`, `user-profile.tsx`
- **Hooks**: prefijo `use` → `useAuth.ts`, `useProducts.ts`
- **Stores**: sufijo `Store` → `authStore.ts`, `productsStore.ts`
- **Utilidades**: `camelCase` → `formatDate.ts`, `apiClient.ts`
- **Tipos**: `PascalCase` → `User.ts`, `Navigation.ts`

## Reglas de TypeScript

- `strict: true` — nunca uses `any`
- Props de componentes: interfaz separada con nombre `{ComponenteName}Props`
- Exports nombrados en `stores/` y `utils/`:
  ```ts
  // stores/authStore.ts
  export const useAuthStore = create(...)

  // utils/formatDate.ts
  export const formatDate = (date: Date): string => ...
  ```
- `export default` solo en componentes y screens (archivos dentro de `components/` y `app/`)
- Tipos de navegación en `src/types/navigation.ts`

## Reglas de componentes

- Un archivo por componente
- Estilos al final del archivo con `StyleSheet.create()`
- Lógica asíncrona delegada al store, nunca en el componente
- Sin `console.log` en producción
- Usar `useCallback` y `useMemo` solo cuando haya evidencia de problemas de rendimiento

## Reglas de Zustand

- Un store por dominio
- Lógica asíncrona dentro del store (acciones)
- Seleccionar solo lo necesario con selectores:
  ```ts
  const count = useStore((s) => s.count)
  const increment = useStore((s) => s.increment)
  ```
- No mezclar lógica de dominios distintos en un mismo store

## Reglas de navegación

- Todas las rutas definidas por archivos en `src/app/`
- Tipos de ruta en `src/types/navigation.ts`
- Usar `Link` y `router` de `expo-router`
- Navegación profunda tipada con `Href<T>`

## Lo que NO debes hacer sin pedirlo explícitamente

- No tocar archivos nativos (`android/` ni `ios/`)
- No instalar, actualizar ni eliminar paquetes
- No modificar `tsconfig.json`, `babel.config.js` ni `metro.config.js`
- No modificar `app.json` (salvo `android.package` o `versionCode`)
- No refactorizar archivos fuera de la tarea actual
- No crear archivos README ni documentación
- No añadir comentarios al código salvo que el motivo no sea obvio desde el código mismo
- No hacer commits ni pushes
- No ejecutar `npx expo prebuild`, `npx expo eject` ni `eas build`
- No modificar `eas.json` si no existe

## Reglas de Expo SDK 56

- Leer la documentación versionada en https://docs.expo.dev/versions/v56.0.0/ antes de escribir código que use APIs de Expo
- Usar `expo-router` para navegación (no React Navigation manual)
- Usar `@expo/ui` para componentes nativos de Expo (cuando aplique)
- Usar `expo-image` en lugar de `<Image>` de React Native
- Usar `expo-symbols` para iconos nativos (SF Symbols en iOS, Material en Android)
- Las fuentes se cargan con `expo-font` en el layout raíz
