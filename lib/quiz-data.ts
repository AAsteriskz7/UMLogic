export interface Question {
  id: string;
  text: string;
  options: { label: string; text: string; isCorrect: boolean }[];
  explanation: string;
  module: string;
  referenceImage?: string; 
  codeSnippet?: string;
}

export const QUIZ_DATA: Record<string, Question[]> = {
  ucd: [
    {
      id: 'ucd-1',
      module: 'Use Case Fundamentals',
      text: 'Which type of actor has user goals fulfilled through using the services of the System under Development (SuD)?',
      options: [
        { label: 'A', text: 'Supporting Actor', isCorrect: false },
        { label: 'B', text: 'Offstage Actor', isCorrect: false },
        { label: 'C', text: 'Primary Actor', isCorrect: true },
        { label: 'D', text: 'Offstage System', isCorrect: false }
      ],
      explanation: 'Primary Actors have user goals fulfilled through using services of the SuD. They are typically drawn on the left side of the diagram.'
    },
    {
      id: 'ucd-2',
      module: 'Relationships',
      text: 'In an <<include>> relationship, where does the arrowhead point?',
      options: [
        { label: 'A', text: 'To the base use case', isCorrect: false },
        { label: 'B', text: 'To the child use case', isCorrect: true },
        { label: 'C', text: 'To the primary actor', isCorrect: false },
        { label: 'D', text: 'To the system boundary', isCorrect: false }
      ],
      explanation: 'For <<include>>, the directed arrow points to the child use case, indicating that the base use case always includes the behavior of the child.'
    },
    {
      id: 'ucd-3',
      module: 'Notation',
      text: 'How are use cases represented in a Use-Case Diagram?',
      options: [
        { label: 'A', text: 'Rectangles labeled with nouns', isCorrect: false },
        { label: 'B', text: 'Stick figures labeled with verbs', isCorrect: false },
        { label: 'C', text: 'Ellipses labeled with verb phrases', isCorrect: true },
        { label: 'D', text: 'Dotted lines labeled with stereotyped tags', isCorrect: false }
      ],
      explanation: 'Use cases are depicted as ellipses with their names, which should be verb phrases (e.g., "Join Organization").'
    }
  ],
  dmd: [
    {
      id: 'dmd-1',
      module: 'Domain Modeling',
      text: 'What should a Domain Model Diagram PRIMARILY focus on?',
      options: [
        { label: 'A', text: 'Software classes and their methods', isCorrect: false },
        { label: 'B', text: 'Conceptual classes and real-world relationships', isCorrect: true },
        { label: 'C', text: 'Database table schemas and primary keys', isCorrect: false },
        { label: 'D', text: 'User interface components', isCorrect: false }
      ],
      explanation: 'DMDs focus on conceptual classes (things in the real world) and their relationships, without detailing methods or software-specific implementation.'
    },
    {
      id: 'dmd-2',
      module: 'Associations',
      text: 'In a domain model, what does an association with a (1..*) multiplicity indicate?',
      options: [
        { label: 'A', text: 'One instance of the first class is related to exactly one of the second.', isCorrect: false },
        { label: 'B', text: 'One instance is related to zero or more instances.', isCorrect: false },
        { label: 'C', text: 'One instance is related to at least one (one or more) instances.', isCorrect: true },
        { label: 'D', text: 'The relationship is optional and can have zero instances.', isCorrect: false }
      ],
      explanation: 'The asterisk (*) represents "many", and (1..*) specifically means "one or more".'
    }
  ],
  ssd: [
    {
      id: 'ssd-1',
      module: 'System Interactions',
      text: 'What does a System Sequence Diagram (SSD) treat the entire system as?',
      options: [
        { label: 'A', text: 'A collection of individual classes', isCorrect: false },
        { label: 'B', text: 'A "Black Box" that receives events', isCorrect: true },
        { label: 'C', text: 'A user interface mock-up', isCorrect: false },
        { label: 'D', text: 'A database server', isCorrect: false }
      ],
      explanation: 'SSDs treat the system as a black box, focusing only on events that cross the system boundary from actors.'
    },
    {
      id: 'ssd-2',
      module: 'Notation',
      text: 'Which type of arrow is used for a return message in an SSD?',
      options: [
        { label: 'A', text: 'Solid line with a solid arrowhead', isCorrect: false },
        { label: 'B', text: 'Dashed line with an open arrowhead', isCorrect: true },
        { label: 'C', text: 'Solid line with an open arrowhead', isCorrect: false },
        { label: 'D', text: 'Dotted line with no arrowhead', isCorrect: false }
      ],
      explanation: 'In UML sequence diagrams (including SSDs), return messages are shown as dashed lines with open arrowheads.'
    }
  ],
  sd: [
    {
      id: 'sd-1',
      module: 'Interaction Logic',
      text: 'What do dashed arrows represent in a Sequence Diagram?',
      options: [
        { label: 'A', text: 'Asynchronous function calls', isCorrect: false },
        { label: 'B', text: 'Return messages / control return', isCorrect: true },
        { label: 'C', text: 'Optional interactions', isCorrect: false },
        { label: 'D', text: 'Deleted objects', isCorrect: false }
      ],
      explanation: 'Dashed arrows are used to represent return messages, showing that control is returning to the caller.'
    },
    {
      id: 'sd-2',
      module: 'Lifelines',
      text: 'What does a tall, thin rectangle on a lifeline represent?',
      options: [
        { label: 'A', text: 'An object instance', isCorrect: false },
        { label: 'B', text: 'An activation bar (execution of a method)', isCorrect: true },
        { label: 'C', text: 'A database transaction', isCorrect: false },
        { label: 'D', text: 'A loop fragment', isCorrect: false }
      ],
      explanation: 'An activation bar (or execution specification) indicates that a process or method is currently executing on that object.'
    }
  ],
  dcd: [
    {
      id: 'dcd-1',
      module: 'Design Class Diagrams',
      text: 'In a DCD, what does a minus sign (-) before an attribute indicate?',
      options: [
        { label: 'A', text: 'Public visibility', isCorrect: false },
        { label: 'B', text: 'Static member', isCorrect: false },
        { label: 'C', text: 'Private visibility', isCorrect: true },
        { label: 'D', text: 'Deleted attribute', isCorrect: false }
      ],
      explanation: 'A minus sign (-) denotes private visibility, while a plus sign (+) denotes public.'
    },
    {
      id: 'dcd-2',
      module: 'Relationships',
      text: 'Which arrow notation represents inheritance (generalization) in a DCD?',
      options: [
        { label: 'A', text: 'A dashed line with an open arrowhead', isCorrect: false },
        { label: 'B', text: 'A solid line with a hollow triangle arrowhead', isCorrect: true },
        { label: 'C', text: 'A solid line with a diamond at the end', isCorrect: false },
        { label: 'D', text: 'A double-headed arrow', isCorrect: false }
      ],
      explanation: 'Generalization (inheritance) is shown with a hollow triangle pointing to the superclass.'
    }
  ]
};
