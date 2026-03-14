Project Title: UMLogic

Theme: "Mastering UML for CS 2340: A Georgia Tech Learning Experience"
Context: CampusConnect (Management of Student Orgs & Events)

1. Project Goal

To create a high-fidelity, interactive web application that teaches future CS 2340 students how to build, interpret, and connect UML diagrams. We will move beyond static images by using live rendering and interactive logic checks to ensure internal consistency across the "CampusConnect" scenario.

2. The Tech Stack (Frontend-Only)

Framework: React (Next.js) for speed and easy deployment on Vercel.

Styling: Tailwind CSS + Shadcn/ui (Soft-minimal aesthetic, GT Gold/Navy accents).

Diagram Engine: Mermaid.js (Text-to-UML rendering for live updates).

Animations: Framer Motion (Smooth transitions between "Teaching steps").

Persistence: Browser localStorage (To track user progress and quiz scores locally).

3. Required Diagram Roadmap (CampusConnect)

Every diagram will include a "Purpose," "Process," and "Connection" section.

Use Case Diagram (UCD): * Scope: Scenarios 1, 2, and 3.

Key Focus: Actors (Student, President, Officer) and system boundaries.

Domain Model Diagram (DMD):

Scope: General Context.

Key Focus: Conceptual classes and relationships (no methods).

System Sequence Diagram (SSD):

Scope: Scenario 3 (Priya checking events).

Key Focus: External interactions between the Actor and the System.

Sequence Diagram (SD):

Scope: Scenario 2 (Daniel creating an event/RSVP logic).

Key Focus: Internal logic, object creation, and capacity validation.

Domain Class Diagram (DCD):

Scope: Scenario 2.

Key Focus: Attributes, methods, and multiplicities.

4. Feature List

MVP (The "UMLogic" Core)

Multi-Modal Learning Modules: For each of the 5 required diagrams, a dedicated page explaining its specific purpose and the theory behind it.

Animated Step-by-Step Scrubber: A visual timeline for each diagram. Users can slide through the "build process" to see components appear in logical order (e.g., seeing an Activation Box appear in an SD only when a message is received).

Detailed Step Explainer: Real-time text descriptions that update as the user scrubs through a diagram, explaining the "Why" behind each arrow or class.

Traceability & Logic Mapping: Interactive links that visually connect diagrams. For example, clicking an operation in the SSD highlights the corresponding method in the DCD.

Advanced Interactive Features

UML Sandbox: A playground where users can write their own Mermaid.js code to see live-rendered UML. Includes templates for 2340-standard formatting.

Comprehensive Interactive Quizzes: A quiz at the end of every module containing:

Content Questions: Testing theoretical knowledge of UML rules.

Diagram Identification: Choosing the correct notation for a given scenario.

Scenario Logic: New mini-scenarios where users must identify the correct relationship (e.g., "In this new scenario, is it an aggregation or composition?").

Local Progress Tracking: Since this is frontend-only, all quiz scores and completed modules are saved to localStorage so students can see their "Exam Readiness" score across sessions without a login.

5. Development Timeline

Friday Night: Foundations

Set up Next.js repo and Tailwind.

Draft all 5 Mermaid.js strings to ensure "Internal Consistency."

Create the content.json to store all scenario text and teaching blurbs.

Saturday: Core Build

Build the main Layout (Sidebar + Stage).

Implement the "Step-by-Step" scrubber logic using Framer Motion.

Populate the 5 diagram pages with content and quiz data.

Sunday: Polish & Pitch

Refine UI for Tablet (Samsung S9 Plus FE) and Mobile (Pixel 10).

Finalize the "Final Exam Simulation" (The cumulative quiz).

Deploy to Vercel/GitHub.

Record the walkthrough video.

6. How to Win the Vote

Clarity: Use bold, simple language. Avoid jargon where possible.

UI/UX: Focus on "The Feel." Smooth transitions and GT branding.

Consistency: Prove that the RSVP() method in the SD is the same RSVP() method in the DCD.