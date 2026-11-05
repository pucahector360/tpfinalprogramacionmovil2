# Gestor de Gastos Personales

Trabajo Práctico Final — **Programación Móvil 2**
Tecnicatura Universitaria en Programación con Orientación en Desarrollo de Aplicaciones
2° Año

## Integrantes

- Puca, Héctor Raúl
- Puca, María del Valle

## Opción elegida

**Opción 1 — Gestor de gastos personales**

## Descripción

Aplicación móvil desarrollada con **React Native + Expo** que permite registrar, consultar y administrar gastos personales, conociendo cuánto dinero se gastó y en qué categorías. Toda la información se maneja localmente dentro de la aplicación mediante estados, arrays y objetos, sin base de datos ni backend.

## Tecnologías utilizadas

- React Native
- Expo (SDK actual)
- JavaScript (ES6+)
- Componentes: `useState`, `TextInput`, `TouchableOpacity`, `ScrollView`, `Alert`, `KeyboardAvoidingView`, `StatusBar`

## Funcionalidades implementadas

### Obligatorias
- **Agregar un gasto**: formulario con descripción, monto y categoría, con validaciones (descripción no vacía y monto numérico mayor a 0).
- **Mostrar los gastos**: listado con descripción, monto y categoría de cada gasto.
- **Calcular el total**: total gastado calculado dinámicamente con `reduce()` y actualizado al agregar o eliminar gastos.
- **Eliminar un gasto**: botón "Eliminar" por cada gasto de la lista.
- **Categorías**: Alimentación, Transporte, Entretenimiento, Salud y Otros.

### Opcionales (incorporadas)
- **Total por categoría**: tarjeta "Gasto por categoría" con el subtotal de cada categoría.
- **Filtro por categoría**: chips para ver solo los gastos de una categoría y ver el subtotal filtrado.
- **Gasto más alto**: se calcula automáticamente con `reduce()` y se muestra en el resumen.
- **Cantidad total de gastos**: contador en la tarjeta de resumen.
- **Formato de moneda argentina**: los montos se muestran como `$15.000` mediante una función auxiliar `formatearMonto`.
- **Datos de ejemplo precargados**: la app inicia con 3 gastos de muestra para facilitar la demostración.

## Conceptos de la cursada aplicados

- `useState` para el manejo de estados (formulario, lista de gastos, filtro y categoría seleccionada).
- `TextInput` para la entrada de datos.
- `TouchableOpacity` para acciones y eventos (chips, botones).
- `map()` para renderizar categorías, filtros y lista de gastos.
- Condicionales para validaciones, filtrado, subtotales y mensajes de lista vacía.
- Eventos (`onPress`, `onChangeText`).
- Arrays y objetos para modelar los gastos.
- Funciones para agregar, eliminar y calcular (incluida la función auxiliar `formatearMonto`).
- Filtrado de información por categoría.
- Cálculos a partir de los datos (`reduce`, totales generales, totales por categoría y gasto máximo).

## Estructura del proyecto
