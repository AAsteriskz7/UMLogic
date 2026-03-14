Georgia Institute of Technology
College of Computing
School of Computing Instruction
Course: CS 2340 – Objects and Design
Instructor: Dr. Pedro Guillermo Feijóo-García, Ph.D.
Project Coordination: Mr. Elias Lind (Head TA)

Team-based Project
[AI encouraged]

CS 2340 Hackathon

Overview
Welcome to the first ever 2340 hackathon! Teams who perform well in this hackathon (are
among the top 3 teams by voting) qualify for an exemption from the final exam.
In addition to this incentive, this is also a hackathon! What this means is that you should
think of this as you would any hackathon: as an opportunity to build an impressive project
to show off to recruiters, to learn things, and to grow
Start: Friday, March 13th @ 5:00pm
End: Sunday, March 15th @ 11:59pm
Goal
Each team must create a website with the purpose of helping students learn diagramming.
In the past, the instructional team has had a website that students used to help them
complete their assignments by giving them example diagrams based on a description,
walking through the development process of the diagrams, and explaining key features of
diagrams such as relationship types (e.g. many-to-many, inherits from).
We are looking to reinvent this website as a tool that students in future semesters of 2340
can use.

Submission
1. Link to your live website
2. Link to your GitHub repo
3. Link to a video walking through your application

Requirements
1. The website must be publicly accessible
2. The website must have at least 5 diagrams built around the given context and
scenarios (see below):
a. A sequence diagram (SD) on the context and scenario 2
b. A system sequence diagram (SSD) on the context and scenario 3
c. A domain model diagram (DMD) based on the context
d. A domain class diagram (DCD) based on the context and scenario 2
e. A use case diagram (UCD) based on the context and scenarios 1, 2, and 3
3. The website must clearly teach:
a. The purpose of each diagram
b. The process used to build each diagram
c. How the diagrams connect to one another
4. Your website may not be built using a website builder like Wix

Please be creative and enjoy this! Think of this as something future 2340 students would
genuinely use the nights before a submission deadline or to help them learn from the
beginning. We encourage you to think about how you learn best and use that as inspiration:
do you like gamified learning, video explanations, simplistic design, etc.? This is a very
unique opportunity to make something that can benefit your fellow students. Moreover,
this project can benefit yourself as an impressive personal project
Your diagrams must be internally consistent (e.g., SSD operations should align with your
SD and DCD). Teams are welcome to create another context and more diagrams if they
believe it helps students learn.

Judging & Final Exam Exemption
After submission, teams will review and vote on the top projects.

Voting criteria:
• Clarity & quality of teaching
• User experience & user interface
• Diagram correctness
• Website usability and polish
The top three teams, as determined by peer voting (with instructor moderation), will
receive a final exam exemption.

Context
Georgia Tech has hired you to help design a new centralized platform called
CampusConnect, a system intended to manage student organizations, memberships,
and events across campus.
The university supports many student organizations. Each organization has a name, a
unique ID, and a description. Every organization has exactly one president at any given
time, though it may also have multiple officers assisting with operations. Organizations
consist of student members, and a student may belong to multiple organizations
simultaneously. However, a student cannot hold the role of president for more than one
organization at the same time.
All students in the system have a name, GT ID, email address, and major. Students may
request to join organizations. When a membership request is submitted, it must be
reviewed by the organization’s president, who may either approve or reject it. If approved,
the student becomes a member of that organization. If rejected, the request is archived
but remains recorded in the system.
Organizations may host events. Each event has a title, description, date, location, and
maximum capacity. Every event belongs to one or more organizations, and an organization
may host many events over time. Students may RSVP to events. An event cannot exceed its
capacity, and once the maximum number of students has RSVP’d, the system prevents
additional registrations. If a student cancels their RSVP, the system updates the available
capacity accordingly.
The system also tracks participation history. Students may view the organizations they
belong to and see upcoming events hosted by those organizations. Organization leaders

may view membership rosters and event attendance lists. The university administration
may later wish to extend the system to generate participation reports, though that
functionality is not yet fully defined.

Scenario 1
Jordan, a second-year computer science student, is looking to become more involved on
campus. After hearing about the Artificial Intelligence Club, Jordan logs into
CampusConnect using the university’s external authentication system. Once
authenticated, Jordan searches for the club and submits a membership request. Later that
day, Maya, the president of the AI Club, logs into the system, reviews pending membership
requests, and approves Jordan’s request. The system updates Jordan’s membership
status and sends a confirmation notification. Jordan logs off, now officially a member of
the organization.

Scenario 2
Daniel, an officer of the Robotics Club, wants to create a new workshop event for next
Friday evening. He logs into CampusConnect and navigates to the Robotics Club
management page. He creates a new event by entering the title, description, date,
location, and maximum capacity. Over the next few days, multiple students log in and
RSVP for the workshop. Once the event reaches capacity, additional students attempting
to RSVP are notified that the event is full. After one student cancels their RSVP, the system
automatically allows another student to register.

Scenario 3
Priya, a business major who belongs to three different organizations, logs into
CampusConnect to check what events are happening this week. After logging in, she views
her profile page, which displays all organizations she belongs to along with upcoming
events hosted by those organizations. She selects one event to view its details, including
the number of students currently registered. Satisfied with her plans for the week, Priya
logs off.