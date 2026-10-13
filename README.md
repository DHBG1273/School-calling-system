ENGLISH README
# School-calling-system
My first front-end project, built to practice the fundamentals of HTML, CSS, and JavaScript. Although it has design and code organization limitations, the project works as intended and represents an important milestone in my growth as a developer. Check the README

# School Attendance System

## Project History

This system was developed at the beginning of my second year of high school, based on an idea suggested by my teacher. The goal was to streamline the attendance-taking process performed by class monitors (or class leaders), replacing the traditional paper lists that often caused issues.

This was my first front-end development project and a significant milestone early in my journey as a developer. As it was my first time building a complete system, the code suffers from organizational issues and practices I would handle differently today. At the time, I lacked the knowledge to follow development best practices, making the project difficult to maintain and translate into English.

Later, I applied what I had learned to projects like TecAula and AgroCrovador, adopting a more organized and professional approach.

Despite its limitations, the system was completed and serves as a more practical alternative to the traditional attendance method. However, due to a lack of available digital resources at the school, the administration decided not to proceed with its implementation.

## Features

- **Attendance tracking:** Allows recording and monitoring student status during roll call.
- **Individual notes:** Enables adding comments to student records.
- **Local storage:** Uses the browser's `localStorage` to save information, such as student status, notes, and other attendance data.
- **Class management:** Organizes students according to their respective classes.
- **Class-based access control:** Each class has a password shared only with its monitors, restricting access to other classes' attendance records.
- **Monitor identification:** Uses a personal code to identify the monitor responsible for taking attendance. ## Technologies Used

- HTML5
- CSS3
- JavaScript
- LocalStorage

## Security and Limitations

Since the system was developed without a database, information is stored locally in the browser using `localStorage`. This means data is not synchronized across devices and may be lost if the browser's storage is cleared.

The access system was designed to minimize interference between classes and identify the monitors in charge. However, it is a simple implementation without server-side authentication; therefore, it does not offer robust safeguards against tampering or unauthorized access.

## Lessons Learned

This project marks the beginning of my journey in front-end development. While building it, I had the opportunity to apply HTML, CSS, and JavaScript to solve a real-world problem within the school environment.

Although I acknowledge the technical and code-organization limitations, I view this project as a valuable learning experience; it allowed me to better understand the challenges of developing a functional application and identify practices to improve in future projects.
