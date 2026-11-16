# Duelo Pokémon

Aplicación web hecha con **Angular** que simula un duelo por turnos entre dos Pokémon. Los datos (estadísticas, tipos y movimientos) se consultan en tiempo real a **PokéAPI**. Las reglas de la batalla las implementa la propia aplicación, porque PokéAPI solo entrega datos y no ejecuta combates.

Práctica 02 – Programación y Plataformas Web (Universidad Politécnica Salesiana).

**Sitio desplegado:** https://prograweb-angular-poke-api.vercel.app

## Funcionalidades

- Buscar el Pokémon del jugador y el del rival por nombre o por número (por ejemplo `pikachu` o `25`).
- Ver la imagen, los tipos, la vida, el ataque, la defensa y 4 movimientos de ataque de cada Pokémon.
- Combatir por turnos: el jugador elige un ataque y el rival responde con un ataque al azar.
- Cálculo del daño según el poder del movimiento, las estadísticas y la efectividad entre tipos.
- Registro de la batalla, anuncio del ganador y botón para reiniciar.
- Mensajes de carga, de error de conexión, de Pokémon inexistente y de entrada vacía.

## Endpoints de PokéAPI utilizados

Base: `https://pokeapi.co/api/v2`

| Endpoint | Para qué se usa en la aplicación |
|---|---|
| `GET /pokemon/{nombre o id}` | Imagen, tipos, vida (`hp`), ataque, defensa y lista de movimientos del Pokémon |
| `GET /move/{nombre}` | Poder y tipo de cada movimiento; se conservan solo los movimientos con poder mayor que 0 |
| `GET /type/{nombre}` | Relaciones de daño del tipo del ataque (`double_damage_to`, `half_damage_to`, `no_damage_to`) para calcular la efectividad |

Las respuestas se guardan en una caché en memoria para no repetir consultas, como pide la política de uso justo de PokéAPI. Además, el nombre escrito por el usuario se limpia antes de armar la URL, porque PokéAPI bloquea direcciones con ciertos caracteres.

## Reglas de la batalla

- La vida de cada Pokémon es su estadística base `hp`.
- Daño: `poder × (ataque ÷ defensa) ÷ 5 × efectividad`, redondeado y con un mínimo de 1.
- Efectividad: ×2 si el tipo del ataque es fuerte contra el tipo del rival, ×0,5 si es débil y ×0 si no le hace daño. Si el rival tiene dos tipos, los multiplicadores se combinan.
- Gana quien deje la vida del rival en 0.

## Estructura del proyecto

```
src/app/
├── models/        Interfaces: pokemon, movimiento, tipo, luchador y respuestas de la API
├── services/      pokeapi.ts: consultas a los 3 endpoints y caché
├── utils/         entrada.ts (limpiar el nombre) y combate.ts (efectividad y daño)
└── components/
    ├── buscador-pokemon/   Formulario de búsqueda con estados de carga y error
    ├── tarjeta-pokemon/    Muestra el Pokémon, su vida y sus ataques
    └── batalla/            Turnos, daño, registro y ganador
```

## Instalación y ejecución local

Requisitos: Git y Node.js (Angular 22 requiere Node 22.22.3 o superior, o Node 24.15 o superior).

```
git clone URL_DEL_REPOSITORIO
cd duelo-pokemon
npm install
npm start
```

Abre http://localhost:4200. Para generar la versión de producción:

```
npm run build
```

La compilación queda en `dist/duelo-pokemon/browser`.

## Despliegue en Vercel

1. Subir el repositorio a GitHub (público).
2. En Vercel, importar el repositorio. El framework se detecta como Angular.
3. Comando de compilación: `npm run build`. Carpeta de salida: `dist/duelo-pokemon/browser`.
4. Desplegar y comprobar que las consultas a PokéAPI funcionan desde la URL pública.

## Tecnologías

Angular 22 (componentes standalone, signals y plantillas con `@if` y `@for`), TypeScript, `fetch` y PokéAPI.
