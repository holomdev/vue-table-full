# Arquitectura de Componentes de Tabla con Vue 3 + TypeScript

Una arquitectura modular y escalable de componentes de tabla construida con Vue 3, TypeScript y Element Plus. Este proyecto demuestra las mejores prácticas para construir componentes de tabla mantenibles y reutilizables con características avanzadas como desplazamiento virtual, filtrado y gestión de modales.

## Descripción General de la Arquitectura

El proyecto sigue una arquitectura basada en módulos con organización por características. Cada funcionalidad principal (como usuarios, facturación) es un módulo separado, promoviendo la organización del código, la reutilización y la mantenibilidad.

### Características Principales

- 🎯 Arquitectura modular
- 📦 Organización basada en características
- 🔄 Componentes reutilizables
- 🎨 Estilos consistentes con Tailwind CSS
- 🌙 Soporte para modo oscuro
- ✨ Desplazamiento virtual para rendimiento
- 🔍 Búsqueda y filtrado avanzado
- 📱 Diseño responsivo
- 📝 Validación de formularios con Vee-Validate y Yup

### Estructura del Proyecto

```
src/
├── assets/              # Recursos estáticos
├── components/          # Componentes compartidos
│   ├── base/           # Componentes UI base
│   └── layout/         # Componentes de diseño
├── composables/        # Funciones composables compartidas
├── modules/            # Módulos de características
│   ├── users/         # Módulo de usuarios
│   │   ├── components/    # Componentes específicos del módulo
│   │   ├── composables/   # Composables específicos del módulo
│   │   ├── constants/     # Constantes del módulo
│   │   └── types/        # Tipos TypeScript
│   └── billing/       # Módulo de facturación
│       ├── components/
│       ├── composables/
│       ├── constants/
│       └── types/
└── router/            # Configuración de Vue Router
```

### Estructura de Módulos

Cada módulo sigue una estructura consistente:

```
modulo/
├── components/        # Componentes del módulo
│   ├── ModuloTabla.vue          # Componente principal de tabla
│   ├── ModuloTablaColumnas.vue  # Definición de columnas
│   ├── ModuloTablaFiltros.vue   # Filtros de tabla
│   └── modals/                  # Modales del módulo
├── composables/      # Composables del módulo
├── constants/        # Constantes del módulo
└── types/           # Tipos TypeScript
```

## Decisiones de Arquitectura

### ¿Por qué esta Arquitectura?

1. **Modularidad**: Cada característica está autocontenida, facilitando:
   - Agregar nuevas características
   - Modificar características existentes
   - Eliminar características sin afectar otras
   - Probar características de forma aislada

2. **Reutilización**: Los componentes y lógica comunes son compartidos:
   - Componentes base reutilizables
   - Composables manejan funcionalidad común
   - Tipos y constantes aseguran consistencia

3. **Mantenibilidad**: La organización clara hace que el código sea más fácil de:
   - Entender
   - Depurar
   - Extender
   - Probar

### Diseño de Componentes

Los componentes siguen estos principios:

1. **Responsabilidad Única**: Cada componente tiene un propósito claro
2. **Configuración por Props**: Componentes configurables mediante props
3. **Comunicación por Eventos**: Componentes emiten eventos para el manejo paterno
4. **API de Composición**: Usa la API de Composición de Vue 3 para mejor organización
5. **TypeScript**: Tipado fuerte para mejor mantenibilidad

## Gestión de Modales

Los modales se gestionan usando un patrón consistente:

```vue
<!-- Componente Padre -->
<template>
  <ModuloTabla @editar="manejarEdicion" />
  
  <ModuloModalEdicion
    v-model="modalEdicion.isOpen"
    :data="modalEdicion.data"
    @guardar="manejarGuardado"
  />
</template>

<script setup>
const modalEdicion = ref({
  isOpen: false,
  data: null
})

const manejarEdicion = (data) => {
  modalEdicion.value.data = data
  modalEdicion.value.isOpen = true
}

const manejarGuardado = (data) => {
  // Lógica de guardado
  modalEdicion.value.isOpen = false
}
</script>
```

### Mejores Prácticas para Modales

1. **Gestión de Estado**:
   - Usar `ref` para estado del modal
   - Mantener datos del modal separados
   - Limpiar datos al cerrar

2. **Manejo de Eventos**:
   - Usar `v-model` para visibilidad
   - Emitir eventos específicos para acciones
   - Manejar toda la lógica en componente padre

## Validación de Formularios

El proyecto utiliza Vee-Validate junto con Yup para la validación de formularios. Esta combinación proporciona una solución robusta y tipada para la validación.

### Configuración de Validación

1. **Definición del Schema**:
```typescript
const schema = yup.object({
  firstName: yup.string()
    .required('El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: yup.string()
    .required('El email es requerido')
    .email('Email inválido')
})
```

2. **Implementación en Componentes**:
```vue
<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

const schema = yup.object({...})

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {...}
})

const onSubmit = handleSubmit((values) => {
  // Manejar envío
})
</script>

<template>
  <Form @submit="onSubmit">
    <Field name="firstName" v-slot="{ field, errors }">
      <input v-bind="field" :class="{ 'error': errors.firstName }" />
      <ErrorMessage name="firstName" />
    </Field>
  </Form>
</template>
```

### Agregar Nuevas Validaciones

Para agregar validaciones a nuevos formularios:

1. **Definir Schema**:
```typescript
const schema = yup.object({
  // Definir reglas para cada campo
  campo: yup.string()
    .required('Mensaje de error')
    .min(5, 'Longitud mínima')
    .matches(/patron/, 'Mensaje si no coincide')
})
```

2. **Integrar con el Formulario**:
```vue
<Form
  :validation-schema="schema"
  :initial-values="initialValues"
  @submit="onSubmit"
>
  <Field name="campo" v-slot="{ field, errors }">
    <input 
      v-bind="field"
      :class="{ 'error': errors.campo }"
    />
    <ErrorMessage name="campo" />
  </Field>
</Form>
```

3. **Manejar Envío**:
```typescript
const onSubmit = handleSubmit((values) => {
  // Los valores ya están validados aquí
  console.log(values)
})
```

### Tipos Comunes de Validación

```typescript
const validaciones = {
  // Campos de texto
  texto: yup.string()
    .required('Campo requerido')
    .min(2, 'Mínimo 2 caracteres')
    .max(50, 'Máximo 50 caracteres'),

  // Email
  email: yup.string()
    .required('Email requerido')
    .email('Email inválido'),

  // Números
  numero: yup.number()
    .required('Número requerido')
    .min(0, 'Debe ser positivo')
    .max(1000, 'Máximo 1000'),

  // Selección
  seleccion: yup.string()
    .required('Selección requerida')
    .oneOf(['opcion1', 'opcion2'], 'Opción inválida'),

  // Fecha
  fecha: yup.date()
    .required('Fecha requerida')
    .min(new Date(), 'Debe ser fecha futura'),

  // Teléfono
  telefono: yup.string()
    .required('Teléfono requerido')
    .matches(/^\d{10}$/, 'Debe tener 10 dígitos')
}
```

## Comunicación de Eventos

Los eventos siguen un patrón consistente:

1. **Eventos de Componente**:
   ```vue
   <!-- Componente Hijo -->
   <template>
     <button @click="emit('accion', data)">Acción</button>
   </template>

   <script setup>
   const emit = defineEmits(['accion'])
   </script>
   ```

2. **Manejo de Eventos**:
   ```vue
   <!-- Componente Padre -->
   <template>
     <ComponenteHijo @accion="manejarAccion" />
   </template>

   <script setup>
   const manejarAccion = (data) => {
     // Manejar acción
   }
   </script>
   ```

## Agregar Nuevos Módulos

Para agregar un nuevo módulo:

1. Crear estructura de directorio:
   ```
   modules/nuevo-modulo/
   ├── components/
   ├── composables/
   ├── constants/
   └── types/
   ```

2. Crear componentes requeridos:
   - `ModuloTabla.vue`
   - `ModuloTablaColumnas.vue`
   - `ModuloTablaFiltros.vue`
   - Componentes modales

3. Definir tipos y constantes:
   ```typescript
   // types/index.ts
   export interface ItemModulo {
     id: number
     // ... otras propiedades
   }

   // constants/index.ts
   export const OPCIONES_ESTADO = ['activo', 'inactivo'] as const
   ```

4. Crear composables para lógica de negocio:
   ```typescript
   // composables/useModulo.ts
   export function useModulo() {
     // Estado y lógica
     return {
       // Funcionalidad expuesta
     }
   }
   ```

5. Agregar ruta en `router/index.ts`:
   ```typescript
   {
     path: '/nuevo-modulo',
     name: 'nuevo-modulo',
     component: () => import('@/modules/nuevo-modulo/components/ModuloVista.vue')
   }
   ```

## Mejores Prácticas

1. **Organización de Componentes**:
   - Mantener componentes enfocados y pequeños
   - Usar composición para lógica compleja
   - Compartir funcionalidad común via composables

2. **Seguridad de Tipos**:
   - Definir interfaces para todas las estructuras de datos
   - Usar verificaciones estrictas de TypeScript
   - Validar props y eventos

3. **Gestión de Estado**:
   - Usar composables para estado complejo
   - Mantener estado cerca de donde se usa
   - Evitar estado global cuando sea posible

4. **Rendimiento**:
   - Usar desplazamiento virtual para listas grandes
   - Implementar búsqueda con debounce
   - Cargar componentes y rutas de forma perezosa

5. **Estilos**:
   - Usar clases utilitarias de Tailwind
   - Mantener estilos modulares y con scope
   - Seguir convenciones de nombres consistentes

## Flujo de Desarrollo

1. **Iniciar Desarrollo**:
   ```bash
   npm run dev
   ```

2. **Construir para Producción**:
   ```bash
   npm run build
   ```

3. **Verificación de Tipos**:
   ```bash
   vue-tsc --noEmit
   ```

## Contribuir

Al contribuir:

1. Seguir la arquitectura existente
2. Mantener seguridad de tipos
3. Agregar pruebas para nuevas características
4. Actualizar documentación
5. Seguir estándares de código

## Licencia

MIT