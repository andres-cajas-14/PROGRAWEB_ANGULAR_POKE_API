# Duelo Pokémon – Simulador de Batallas

Aplicación web interactiva desarrollada con **Angular 22 y TypeScript**, que permite realizar batallas por turnos entre dos Pokémon utilizando información obtenida desde **PokéAPI**.

La aplicación permite buscar dos Pokémon por nombre o identificador, visualizar sus características, seleccionar movimientos y realizar un combate mediante reglas programadas en TypeScript.

PokéAPI proporciona los datos necesarios, pero los cálculos de daño, la actualización de vida, los turnos y la determinación del ganador son realizados por la propia aplicación.

## Información de la práctica

- **Universidad:** Universidad Politécnica Salesiana
- **Carrera:** Computación
- **Asignatura:** Programación y Plataformas Web
- **Práctica:** 02 – Desarrollo de una aplicación web interactiva con Angular y PokéAPI
- **Proyecto:** Duelo Pokémon

## 1. Enlaces del proyecto

**Aplicación publicada en Vercel:**

https://prograweb-angular-poke-api.vercel.app/

**Repositorio público de GitHub:**

https://github.com/andres-cajas-14/PROGRAWEB_ANGULAR_POKE_API

## 2. Objetivo

Desarrollar una aplicación web interactiva mediante Angular que consuma tres tipos diferentes de recursos de PokéAPI, utilizando los datos obtenidos para implementar un simulador de batallas entre Pokémon.

La aplicación integra consultas HTTP, componentes Angular, eventos, validación de entradas, funciones de cálculo y actualización dinámica de la interfaz.

El proyecto funciona sin necesidad de implementar un backend propio ni una base de datos.

## 3. Funcionalidades principales

### Búsqueda de Pokémon

- Buscar Pokémon por nombre o número de identificación.
- Seleccionar un Pokémon para el jugador y otro para el rival.
- Mostrar el nombre, número, imagen y tipos de cada Pokémon.
- Consultar las estadísticas de vida, ataque y defensa.
- Obtener hasta cuatro movimientos con poder de ataque.

### Simulación de batalla

- Seleccionar un movimiento del Pokémon del jugador.
- Ejecutar un ataque contra el rival.
- Calcular el daño utilizando el poder del movimiento, el ataque, la defensa y la efectividad entre tipos.
- Permitir que el Pokémon rival responda con un movimiento seleccionado aleatoriamente.
- Actualizar la vida de ambos Pokémon después de recibir daño.
- Registrar los movimientos utilizados y el daño causado.
- Determinar y mostrar el ganador cuando uno de los Pokémon pierde toda su vida.
- Reiniciar la batalla y recuperar los valores iniciales.

### Interacción y validaciones

- Buscar mediante campos de texto y botones.
- Comprobar que el usuario ingrese un nombre o identificador válido.
- Mostrar mensajes cuando un Pokémon no existe o se presenta un problema de conexión.
- Indicar los estados de carga durante las consultas.
- Deshabilitar los ataques cuando termina la batalla o mientras se está procesando un turno.

## 4. Endpoints utilizados de PokéAPI

La aplicación utiliza tres tipos diferentes de recursos de la API REST pública de Pokémon.

**URL base:** https://pokeapi.co/api/v2/

### 4.1. Endpoint Pokémon

**Recurso:** `GET /pokemon/{nombre_o_id}`

Ejemplo:

https://pokeapi.co/api/v2/pokemon/charmander

Este endpoint proporciona información de cada Pokémon, incluyendo nombre, identificador, imagen, estadísticas, tipos y movimientos disponibles.

**Uso en la aplicación:** permite obtener las características del jugador y del rival. Las estadísticas de vida, ataque y defensa se utilizan posteriormente en los cálculos del combate.

### 4.2. Endpoint Movimientos

**Recurso:** `GET /move/{nombre}`

Ejemplo:

https://pokeapi.co/api/v2/move/fire-punch

Proporciona información sobre los movimientos, incluyendo su tipo y poder.

**Uso en la aplicación:** permite seleccionar hasta cuatro movimientos con poder mayor que cero y utilizar sus características para calcular el daño durante los turnos.

### 4.3. Endpoint Tipos

**Recurso:** `GET /type/{nombre}`

Ejemplo:

https://pokeapi.co/api/v2/type/fire

Proporciona información sobre las relaciones de daño entre tipos de Pokémon.

**Uso en la aplicación:** permite determinar la efectividad de un movimiento contra los tipos del Pokémon defensor, incluyendo ataques muy efectivos, poco efectivos y ataques que no producen daño.

Los tres recursos están relacionados con funcionalidades del simulador. No se utilizan únicamente para mostrar respuestas JSON.

## 5. Reglas de combate implementadas

PokéAPI proporciona las estadísticas, los movimientos y los tipos, pero no ejecuta las batallas.

Por esta razón, las reglas del simulador están programadas en TypeScript.

### 5.1. Vida inicial

La vida inicial de cada Pokémon corresponde a su estadística base `hp`, obtenida de PokéAPI.

Cuando recibe un ataque, su vida disminuye según el daño calculado.

La vida no puede ser menor que cero.

### 5.2. Fórmula de daño

El simulador utiliza la siguiente fórmula simplificada:

**Daño = redondear((Poder × (Ataque / max(Defensa, 1)) / 5) × Efectividad)**

Donde:

- **Poder:** potencia del movimiento consultada mediante `/move`.
- **Ataque:** estadística de ataque del Pokémon atacante.
- **Defensa:** estadística de defensa del Pokémon rival.
- **Efectividad:** multiplicador calculado según los tipos.

Se utiliza `max(Defensa, 1)` para evitar divisiones entre cero.

Cuando el movimiento afecta al rival, el daño mínimo es de un punto. Cuando existe inmunidad, el daño es cero.

### 5.3. Efectividad entre tipos

La aplicación utiliza los siguientes multiplicadores:

| Relación | Multiplicador |
|---|---|
| Muy efectivo | ×2 |
| Poco efectivo | ×0,5 |
| Sin efecto | ×0 |
| Efectividad normal | ×1 |

Si el Pokémon defensor tiene dos tipos, los multiplicadores se combinan mediante multiplicación.

### 5.4. Desarrollo de los turnos

1. El usuario busca y selecciona a los dos Pokémon.
2. La aplicación consulta sus estadísticas y movimientos.
3. El jugador selecciona un ataque.
4. La aplicación consulta la efectividad del tipo del movimiento.
5. Se calcula el daño y disminuye la vida del rival.
6. Si el rival continúa con vida, responde con un ataque aleatorio.
7. Se calcula el daño del rival y se actualiza la vida del jugador.
8. La batalla continúa hasta que uno de los participantes pierde toda su vida.
9. La aplicación determina y muestra el ganador.

**Nota:** El sistema utiliza reglas simplificadas creadas para esta práctica académica y no reproduce exactamente el sistema oficial de combate de los videojuegos Pokémon.

## 6. Tecnologías utilizadas

| Tecnología | Función |
|---|---|
| Angular 22 | Estructura de la aplicación y componentes |
| TypeScript | Lógica de programación y cálculos de combate |
| HTML | Estructura visual de la página |
| CSS | Estilos y presentación |
| Fetch API | Consultas HTTP a PokéAPI |
| PokéAPI | Datos de Pokémon, movimientos y tipos |
| GitHub | Almacenamiento público del código fuente |
| Vercel | Publicación de la aplicación web |

Se utilizan componentes standalone de Angular, señales `signal()`, valores calculados con `computed()` y estructuras de control de plantillas como `@if` y `@for`.

## 7. Organización del proyecto

```text
src/
└── app/
    ├── components/
    │   ├── batalla/
    │   ├── buscador-pokemon/
    │   └── tarjeta-pokemon/
    │
    ├── models/
    │   ├── luchador.ts
    │   ├── movimiento.ts
    │   ├── pokemon.ts
    │   ├── respuestas.ts
    │   └── tipo.ts
    │
    ├── services/
    │   └── pokeapi.ts
    │
    ├── utils/
    │   ├── combate.ts
    │   └── entrada.ts
    │
    ├── app.config.ts
    ├── app.css
    ├── app.html
    └── app.ts
```

### Componentes

**batalla:** administra los dos luchadores, el desarrollo de los turnos, los puntos de vida, el registro de ataques y el ganador.

**buscador-pokemon:** permite ingresar el nombre o identificador, consultar la información y seleccionar un Pokémon.

**tarjeta-pokemon:** presenta la imagen, los tipos, las estadísticas, los movimientos y la vida del Pokémon.

### Modelos

La carpeta `models` contiene las interfaces TypeScript utilizadas para organizar los datos de Pokémon, movimientos, tipos, luchadores y respuestas de PokéAPI.

### Servicio

**pokeapi.ts:** contiene los métodos `getPokemon()`, `getMovimiento()` y `getTipo()`, además del procesamiento de respuestas HTTP y una caché temporal en memoria.

### Utilidades

**entrada.ts:** limpia y valida los datos introducidos en los buscadores.

**combate.ts:** implementa las funciones para calcular la efectividad de los tipos, el daño y los mensajes del resultado de un ataque.

## 8. Requisitos para ejecutar el proyecto

Se necesita:

- Git.
- Node.js compatible con Angular 22.
- npm.
- Un navegador web actualizado.
- Conexión a internet para instalar las dependencias y consultar PokéAPI.

La versión de Node.js debe cumplir los requisitos de compatibilidad del Angular CLI utilizado por el proyecto.

## 9. Instalación y ejecución local

### Paso 1. Clonar el repositorio

```bash
git clone https://github.com/andres-cajas-14/PROGRAWEB_ANGULAR_POKE_API.git
```

### Paso 2. Entrar a la carpeta del proyecto

```bash
cd PROGRAWEB_ANGULAR_POKE_API
```

### Paso 3. Instalar las dependencias

```bash
npm ci
```

### Paso 4. Ejecutar la aplicación

```bash
npm start
```

Abrir en el navegador:

http://localhost:4200/

Durante el desarrollo, Angular permite visualizar los cambios guardados mientras el servidor está funcionando.

Para detener el servidor local se utiliza `Ctrl + C` en la terminal.

### Paso 5. Generar la compilación de producción

```bash
npm run build
```

La compilación genera los archivos que se utilizan para publicar la aplicación.

## 10. Manejo de errores y estados de carga

La aplicación incluye mensajes para las siguientes situaciones:

- Nombre o identificador de Pokémon vacío.
- Pokémon no encontrado.
- Error de conexión con PokéAPI.
- Error al obtener información de un movimiento o tipo.
- Error durante el cálculo de un turno.

También utiliza estados de carga para informar cuando se están consultando datos.

Las consultas HTTP comprueban el resultado mediante `response.ok` y procesan las respuestas JSON.

## 11. Funcionamiento sin backend ni base de datos propios

La aplicación se ejecuta en el navegador mediante Angular.

Los datos externos se obtienen directamente desde PokéAPI a través de solicitudes HTTP con `fetch()`.

Los turnos, el daño, los puntos de vida y el ganador son procesados mediante funciones TypeScript dentro de la aplicación.

Se utiliza una caché temporal en memoria para reutilizar algunas respuestas de la API y evitar consultas repetidas.

No se requiere instalar MySQL, PHP ni desarrollar un servidor backend propio para ejecutar el simulador.

## 12. Publicación en Vercel

El proyecto se encuentra desplegado mediante Vercel, a partir del repositorio público de GitHub.

La publicación utiliza el sistema de compilación de Angular y permite acceder a la aplicación mediante un navegador.

**Aplicación publicada:**

https://prograweb-angular-poke-api.vercel.app/

**Código fuente:**

https://github.com/andres-cajas-14/PROGRAWEB_ANGULAR_POKE_API

## 13. Pruebas de funcionamiento

Para comprobar la aplicación se pueden realizar las siguientes pruebas:

| Prueba | Resultado esperado |
|---|---|
| Buscar Charmander por ID `4` | Se muestra su ficha |
| Buscar Charizard por ID `6` | Se muestra su ficha |
| Seleccionar un ataque | Se calcula y aplica el daño |
| Ejecutar varios turnos | Se actualiza la vida de ambos Pokémon |
| Llegar a cero puntos de vida | Se muestra el ganador |
| Reiniciar la batalla | Se restauran las vidas y el registro |
| Buscar un nombre inexistente | Se muestra un mensaje de error |
| Consultar sin conexión | Se informa que no es posible conectar con la API |

## 14. Referencias

- PokéAPI: https://pokeapi.co/
- Documentación de PokéAPI: https://pokeapi.co/docs/v2
- Documentación oficial de Angular: https://angular.dev/
- Documentación de Vercel: https://vercel.com/docs
- Repositorio de ejemplo del docente: https://github.com/gabusleon/angular-pokeapi

## 15. Conclusión

Duelo Pokémon es una aplicación web desarrollada con Angular que integra tres endpoints diferentes de PokéAPI para implementar una simulación interactiva de batallas por turnos.

La aplicación aprovecha los datos obtenidos de la API para calcular el daño y determinar los resultados mediante reglas propias programadas en TypeScript.

El proyecto permite aplicar conocimientos de componentes, servicios, modelos, eventos, promesas, solicitudes HTTP y actualización dinámica de la interfaz, sin necesidad de utilizar una base de datos ni un backend propios.
