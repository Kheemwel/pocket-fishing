# Pocket Fishing

A Vue 3 fishing game built with TypeScript, Vite, and Pinia. Cast your rod, reel in fish with dynamic catch mechanics, and build your aquarium through engaging gameplay.

## Features

- **Dynamic Fishing System**: Cast your rod and interact with fish as they bite, with difficulty-based minigames
- **World & Weather System**: In-game seasons, weather patterns, and day/night cycles that affect fish availability
- **Rich Inventory Management**: Collect baits, fishing rods, materials, consumables, and more with a comprehensive inventory system
- **Modifiers & Effects**: Buff system with status effects, passive abilities, and item modifiers to enhance your fishing
- **Multiple Locations**: Different fishing spots with varied fish pools and catch conditions
- **Event-Driven Architecture**: Dispatcher pattern for clean game action handling and state management
- **Type-Safe Development**: Full TypeScript support with strict typing throughout the codebase
- **State Management**: Pinia stores for fishing state, player state, world state, and minigame state

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Lightning-fast build tool
- **Pinia** - State management
- **Vue Router** - Routing and navigation
- **Vitest** - Unit testing framework
- **ESLint & Prettier** - Code quality and formatting

## Getting Started

### Prerequisites

- Node.js 20.19.0 or >=22.12.0

### Installation

```bash
npm install
```

### Development

Start the development server with hot module reload:

```bash
npm run dev
```

The game will be available at `http://localhost:5173` (default Vite port).

### Building for Production

Type-check, compile, and minify your application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

### Testing & Code Quality

Run unit tests:

```bash
npm run test:unit
```

Run linting and auto-fix issues:

```bash
npm run lint
```

Format code with Prettier:

```bash
npm run format
```

Type-check your code:

```bash
npm run type-check
```

## Project Structure

```
src/
├── core/                 # Game engine and initialization
│   ├── game.ts          # Game initialization
│   └── Dispatcher.ts    # Event dispatcher for game actions
├── systems/             # Core game systems
│   ├── FishingSystem.ts # Fishing mechanics
│   ├── PlayerSystem.ts  # Player management
│   ├── WorldSystem.ts   # World state (weather, season, time)
│   └── EffectSystem.ts  # Status effects and buffs
├── managers/            # Game managers
│   ├── LoopManager.ts   # Game loop
│   ├── InventoryManager.ts  # Inventory handling
│   └── MinigameManager.ts   # Minigame logic
├── stores/              # Pinia state stores
│   ├── fishingStateStore.ts
│   ├── playerStateStore.ts
│   ├── worldStateStore.ts
│   └── minigameStore.ts
├── data/                # Game databases and content
│   ├── item/           # Item definitions (baits, rods, materials)
│   └── weighted/       # Weighted tables (fish pools, loot tables)
├── services/            # Business logic services
│   ├── FishService.ts
│   ├── LocationService.ts
│   └── WeightedService.ts
├── types/              # TypeScript type definitions
├── ui/                 # Vue components and screens
│   ├── screens/        # Main game screens
│   └── components/     # Reusable UI components
└── utils/              # Utility functions
```

## Development Guide

### Architecture

The project uses an event-driven architecture with the following flow:

1. **Game Loop** - Runs on every frame and dispatches `tick` events
2. **Dispatcher** - Routes game actions to interested systems
3. **Systems** - Handle game logic (Fishing, Player, World, Effects)
4. **Stores** - Manage state through Pinia
5. **UI** - Vue components consume and update state

### Adding New Fish

Fish definitions are stored in [src/data/weighted/fishPool.ts](src/data/weighted/fishPool.ts). Extend the fish pool with new catch profiles and location associations.

### Creating Game Events

Define new game actions in [src/types/gameAction.ts](src/types/gameAction.ts) and subscribe to them using the Dispatcher:

```typescript
dispatcher.subscribe('fishCaught', (action) => {
  // Handle fish catch event
})
```

### Code Quality Standards

- **TypeScript**: Use strict typing, avoid `any`
- **Components**: Keep Vue components focused and use composition API
- **Naming**: Use clear, descriptive names for functions, variables, and components
- **Testing**: Write unit tests for complex logic and services

## IDE Setup

**Recommended**: [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

Disable Vetur if installed (conflicts with Volar).

### Browser DevTools

- **Chrome/Edge/Brave**: [Vue.js DevTools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- **Firefox**: [Vue.js DevTools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

## Contributing

Contributions are welcome! Please ensure your code:

- Passes all linting checks (`npm run lint`)
- Includes type safety (run `npm run type-check`)
- Includes tests for new functionality
- Follows the project's code style

## License

This project is provided as-is. See [LICENSE](LICENSE) for details (if applicable).

## Support

For questions or issues:

1. Check the [project structure](#project-structure) to understand the codebase
2. Review existing game systems and stores for patterns
3. Run tests to verify your changes: `npm run test:unit`
