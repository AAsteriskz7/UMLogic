# API Simulation Documentation

## Purpose
This document outlines the design for the simulated backend services found in `lib/hooks/`.

## Diagram Processor Service
Simulates the translation of structural models into AST nodes for validation.

## Persistence Bridge
Simulates a cloud-syncing service to ensure local progress is backed up to a central repository.

## Analytics Orchestrator
Simulates high-fidelity telemetry tracking for student engagement metrics.

## Hook Interfaces

### Diagram Processor Service (`useDiagramProcessor`)
- **Input:** Mermaid diagram text (string)
- **Output:** AST node structure (object), validation results (object)
- **Interface:**
  - `processDiagram(diagramText: string): { ast: object, validation: object }`
  - Validates diagram syntax and returns structured nodes for further analysis.

### Persistence Bridge (`usePersistenceBridge`)
- **Input:** User progress data (object), diagram states (object)
- **Output:** Sync status (boolean), error messages (string)
- **Interface:**
  - `syncProgress(progressData: object): Promise<boolean>`
  - `loadProgress(): Promise<object>`
  - Simulates saving/loading progress to/from a central repository.

### Analytics Orchestrator (`useAnalyticsOrchestrator`)
- **Input:** User actions/events (object), session info (object)
- **Output:** Engagement metrics (object), event logs (array)
- **Interface:**
  - `trackEvent(event: object): void`
  - `getMetrics(): object`
  - Simulates tracking and reporting student engagement for learning analytics.

## Additional Project Simulation Services

### Content Library Service (`lib/content.json`)
- **Input:** Diagram type (string), scenario ID (string)
- **Output:** Diagram descriptions (object), scenario narratives (object)
- **Interface:**
  - `getScenario(id: string): object`
  - `getDiagramContent(type: string): object`
  - Simulates a read-only content API for module text and case-study context.

### Quiz Repository Service (`lib/quiz-data.ts`)
- **Input:** Diagram module key (string)
- **Output:** Question bank (array), answer metadata (object)
- **Interface:**
  - `getQuizQuestions(module: string): Question[]`
  - `getAllQuestions(): Question[]`
  - Simulates backend question retrieval for module quizzes and cumulative exam generation.

### Local Progress Service (`localStorage`)
- **Input:** Module progress state (object), exam score state (object)
- **Output:** Persisted progress payload (object)
- **Interface:**
  - `saveProgress(progress: object): void`
  - `loadProgress(): object`
  - `saveLastLocation(location: object): void`
  - Simulates persistent user progress storage without a remote database.

### Progress Event Bus (`window` custom event)
- **Input:** Progress update events (object)
- **Output:** Cross-page UI refresh triggers (void)
- **Interface:**
  - `dispatchEvent('umlogic_progress_updated'): void`
  - `subscribe('umlogic_progress_updated', listener): void`
  - Simulates real-time sync notifications between learning modules and dashboard views.

### Cumulative Quiz Service (`app/cumulative-quiz/page.tsx`)
- **Input:** Full project question bank (array)
- **Output:** Randomized exam set (array), final score result (number)
- **Interface:**
  - `generateExam(questionPool: Question[]): Question[]`
  - `gradeExam(responses: object): number`
  - Simulates comprehensive proficiency assessment across all UML modules.

### Diagram Sandbox Service (`app/sandbox/page.tsx`)
- **Input:** Mermaid source text (string), selected template (string)
- **Output:** Rendered preview state (object), downloadable diagram asset (PNG)
- **Interface:**
  - `loadTemplate(type: string): string`
  - `renderPreview(code: string): object`
  - `exportDiagram(format: 'png'): Promise<void>`
  - Simulates interactive authoring and export APIs for independent practice diagrams.
