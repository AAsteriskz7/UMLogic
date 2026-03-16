# System Architecture

## Overview
UMLogic is built on a modern Next.js 15 stack, leveraging React Server Components for performance and Client Components for interactive diagramming.

## Technical Stack
- **Frontend**: Next.js, Tailwind CSS 4, Framer Motion
- **Diagramming**: Mermaid.js, Monaco Editor
- **State Management**: LocalStorage for persistent tracking
- **Styling**: Shadcn/UI for consistent component design

## Component Hierarchy

UMLogic’s component structure is organized for modularity and clarity:

- **app/**: Contains page-level components for each diagram type, dashboard, quiz, and sandbox.
- **components/**:
  - `app-sidebar`: Handles navigation and links to modules.
  - `dcd-interactive-build`, `dmd-interactive-build`, `sd-interactive-build`, `ssd-interactive-build`, `ucd-interactive-build`: Interactive builders for each diagram type, providing step-by-step construction and explanations.
  - `mermaid-diagram`: Renders live Mermaid diagrams based on user input.
  - `ui/`: Shared UI elements (buttons, dialogs, etc.) for consistent design.
- **lib/**: Utility functions and quiz data for diagram logic and scoring.

## Data Flow

Diagram data flows as follows:

1. **Content Library**: Diagram definitions, scenarios, and quiz data are stored in `lib/content.json` and `lib/quiz-data.ts`.
2. **Page Components**: Each diagram module loads relevant content and passes it to interactive builder components.
3. **Interactive Builders**: Builders manage user input, step navigation, and diagram construction. They update state and trigger live rendering via the `mermaid-diagram` component.
4. **State Management**: User progress and quiz scores are tracked in browser localStorage, allowing persistence across sessions.
5. **Live Rendering**: As users build or edit diagrams, Mermaid.js generates real-time previews, and Monaco Editor provides syntax highlighting in the sandbox.

## Runtime Boundaries

UMLogic currently uses a frontend-first runtime model with clear boundaries:

- **UI Layer (`app/`, `components/`)**: Handles rendering, interaction, and navigation.
- **Content Layer (`lib/content.json`, `lib/quiz-data.ts`)**: Provides static instructional and quiz data.
- **Simulation Layer (`lib/hooks/`)**: Defines backend-like service contracts for persistence, diagram processing, and analytics.
- **Persistence Layer (`localStorage`)**: Stores progress and resume state locally in the browser.

## Route Responsibilities

- **`app/diagrams/[type]/page.tsx`**: Delivers learning content, interactive build steps, and module-level quiz tracking.
- **`app/dashboard/page.tsx`**: Aggregates progress, shows module completion, and supports resume navigation.
- **`app/cumulative-quiz/page.tsx`**: Runs cross-module final assessment and records best exam score.
- **`app/sandbox/page.tsx`**: Supports open-ended Mermaid authoring, live preview, and diagram export.

## Extension Notes

- The current architecture is modular enough to swap static data sources with API-backed repositories.
- Simulation hooks in `lib/hooks/` can become adapters for real backend endpoints with minimal page-level changes.
- A shared progress repository abstraction is the next recommended step to reduce duplicated storage logic across routes.
