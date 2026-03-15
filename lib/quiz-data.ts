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
    },
    {
      id: 'ucd-4',
      module: 'Actors',
      text: 'What is the role of an "Offstage Actor" in a use case?',
      options: [
        { label: 'A', text: 'Initiates the use case to reach a goal', isCorrect: false },
        { label: 'B', text: 'Provides a service (like a database) to the system', isCorrect: false },
        { label: 'C', text: 'Has an interest in the behavior but does not directly interact', isCorrect: true },
        { label: 'D', text: 'Is a hidden part of the internal system code', isCorrect: false }
      ],
      explanation: 'Offstage Actors have an interest in the behavior of the use case (stakeholders) but are not primary or supporting actors.'
    },
    {
      id: 'ucd-5',
      module: 'Relationships',
      text: 'Which relationship is used to model optional or conditional behavior in a use case?',
      options: [
        { label: 'A', text: '<<include>>', isCorrect: false },
        { label: 'B', text: '<<extend>>', isCorrect: true },
        { label: 'C', text: 'Generalization', isCorrect: false },
        { label: 'D', text: 'Association', isCorrect: false }
      ],
      explanation: 'The <<extend>> relationship is used when a use case optionally or conditionally "extends" the behavior of a base use case.'
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
    },
    {
      id: 'dmd-3',
      module: 'Notation',
      text: 'How are Conceptual Classes typically represented in a Domain Model?',
      options: [
        { label: 'A', text: 'A box with three compartments (Name, Attributes, Methods)', isCorrect: false },
        { label: 'B', text: 'A box with two compartments (Name, Attributes)', isCorrect: true },
        { label: 'C', text: 'An ellipse with a name inside', isCorrect: false },
        { label: 'D', text: 'A dashed line with a label', isCorrect: false }
      ],
      explanation: 'Domain models focus on conceptual classes, which are usually boxes with just Name and Attributes, as Methods belong in Design Class Diagrams.'
    },
    {
      id: 'dmd-4',
      module: 'Concept Mapping',
      text: 'Which of the following would MOST likely be a conceptual class in CampusConnect?',
      options: [
        { label: 'A', text: 'StudentController', isCorrect: false },
        { label: 'B', text: 'MySQL_Database', isCorrect: false },
        { label: 'C', text: 'Organization', isCorrect: true },
        { label: 'D', text: 'onJoinButtonClicked()', isCorrect: false }
      ],
      explanation: 'Organizations are real-world concepts in the CampusConnect domain, whereas controllers and methods are software implementation details.'
    },
    {
      id: 'dmd-5',
      module: 'Associations',
      text: 'In a UML association, what does a multiplicity of (0..1) mean?',
      options: [
        { label: 'A', text: 'Mandatory relationship', isCorrect: false },
        { label: 'B', text: 'Zero or one (Optional relationship)', isCorrect: true },
        { label: 'C', text: 'Many relationships', isCorrect: false },
        { label: 'D', text: 'Exactly one relationship', isCorrect: false }
      ],
      explanation: '0..1 indicates that an instance may be associated with zero or one instance of the other class.'
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
    },
    {
      id: 'ssd-3',
      module: 'Boundary',
      text: 'True or False: SSDs show the internal logic and object calls inside the system.',
      options: [
        { label: 'A', text: 'True', isCorrect: false },
        { label: 'B', text: 'False', isCorrect: true }
      ],
      explanation: 'False. SSDs only show messages between external actors and the system boundary; internal interactions are shown in regular Sequence Diagrams.'
    },
    {
      id: 'ssd-4',
      module: 'Notation',
      text: 'What does the "System" lifeline in an SSD represent?',
      options: [
        { label: 'A', text: 'The browser or front-end client', isCorrect: false },
        { label: 'B', text: 'The database engine', isCorrect: false },
        { label: 'C', text: 'The system as a whole (the SuD)', isCorrect: true },
        { label: 'D', text: 'A specific Java class', isCorrect: false }
      ],
      explanation: 'In an SSD, the single system lifeline represents the entire system under discussion.'
    },
    {
      id: 'ssd-5',
      module: 'CampusConnect context',
      text: 'In the SSD for Priya viewing her profile and upcoming events, which system event best matches the scenario?',
      options: [
        { label: 'A', text: 'renderProfileCard()', isCorrect: false },
        { label: 'B', text: 'viewProfilePage()', isCorrect: true },
        { label: 'C', text: 'queryUpcomingEventsFromDatabase()', isCorrect: false },
        { label: 'D', text: 'drawOrganizationList()', isCorrect: false }
      ],
      explanation: 'In Scenario 3, Priya interacts with CampusConnect by requesting to view her profile page. SSD messages should describe actor-to-system intentions, not internal rendering or database steps.'
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
    },
    {
      id: 'sd-3',
      module: 'Messages',
      text: 'Which notation is used for a synchronous message (procedure call)?',
      options: [
        { label: 'A', text: 'Solid line with an open arrowhead', isCorrect: false },
        { label: 'B', text: 'Solid line with a filled arrowhead', isCorrect: true },
        { label: 'C', text: 'Dashed line with a cross (X)', isCorrect: false },
        { label: 'D', text: 'Half-arrow line', isCorrect: false }
      ],
      explanation: 'A solid line with a filled arrowhead typically represents a synchronous procedure call in a sequence diagram.'
    },
    {
      id: 'sd-4',
      module: 'Lifetime',
      text: 'How is the destruction/end of an object’s lifecycle shown in an SD?',
      options: [
        { label: 'A', text: 'A dashed line fades out', isCorrect: false },
        { label: 'B', text: 'A large letter "E"', isCorrect: false },
        { label: 'C', text: 'A large "X" at the bottom of the lifeline', isCorrect: true },
        { label: 'D', text: 'The lifeline stops abruptly with no mark', isCorrect: false }
      ],
      explanation: 'A large "X" symbol is used at the end of a lifeline to indicate that the object has been destroyed or its execution has terminated.'
    },
    {
      id: 'sd-5',
      module: 'Logic',
      text: 'What is the "Self-Message" notation used for?',
      options: [
        { label: 'A', text: 'An object calling its own method', isCorrect: true },
        { label: 'B', text: 'Calling a static class method', isCorrect: false },
        { label: 'C', text: 'A recursive loop in the code', isCorrect: false },
        { label: 'D', text: 'A system crash', isCorrect: false }
      ],
      explanation: 'A self-message (looping arrow) represents one method in an object calling another method within the same object instance.'
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
    },
    {
      id: 'dcd-3',
      module: 'Visibility',
      text: 'What does the pound sign (#) represent as a visibility prefix?',
      options: [
        { label: 'A', text: 'Public', isCorrect: false },
        { label: 'B', text: 'Protected', isCorrect: true },
        { label: 'C', text: 'Private', isCorrect: false },
        { label: 'D', text: 'Package', isCorrect: false }
      ],
      explanation: 'The pound sign (#) denotes protected visibility in UML.'
    },
    {
      id: 'dcd-4',
      module: 'Notation',
      text: 'A "Dependency" relationship is drawn as:',
      options: [
        { label: 'A', text: 'A solid line with a hollow triangle', isCorrect: false },
        { label: 'B', text: 'A dashed line with an open arrowhead', isCorrect: true },
        { label: 'C', text: 'A solid line with a filled diamond', isCorrect: false },
        { label: 'D', text: 'A thick, double line', isCorrect: false }
      ],
      explanation: 'Dependency is a weaker relationship drawn as a dashed line with an open arrowhead.'
    },
    {
      id: 'dcd-5',
      module: 'Notation',
      text: 'Composition (strong ownership) is represented by which symbol at the end of an association?',
      options: [
        { label: 'A', text: 'A hollow diamond', isCorrect: false },
        { label: 'B', text: 'A filled (solid) diamond', isCorrect: true },
        { label: 'C', text: 'A hollow triangle', isCorrect: false },
        { label: 'D', text: 'An open arrowhead', isCorrect: false }
      ],
      explanation: 'Composition is shown with a filled black diamond on the side of the container (whole).'
    }
  ]
};
