# School Managment System API

## Description
This is a simple API designed to managing school-related information, including attendance, students, subjects and teachers. The API is built using node.js and express.js, and uses a MongoDB database.

## Models

### 1. Attendance
Attendance is a model that represents the attendance of a student in a particular class. It has the following fields:
- `student`: The student that attended the class (reference to Student Model).
- `group`: The group of the class (reference to Group Model).
- `subject`: The subject of the class (reference to Subject Model).
- `status`: The status of the student in the class. It can be one of the following:
    - `attended`: The student attended the class.
    - `excused`: The student was excused from the class.
    - `late`: The student was late to the class.
    - `absent`: The student was absent from the class.
    - `unknown`: The status of the student is unknown.
- `comment`: A comment about the student's attendance.
- `dateData`: The date of the class. It has the following fields:
    - `day`: The day of the class.
    - `month`: The month of the class.
    - `year`: The year of the class.
    - `hour`: The hour of the class.
    - `minute`: The minute of the class.
    - `second`: The second of the class.

### 2. Student
Student is a model that represents a student. It has the following fields:
- `studentId`: The ID of the student.
- `name`: The name of the student.
- `lastName`: The last name of the student.
- `email`: The email of the student.
- `grade`: The grade of the student.
- `group`: The group of the student.
- `subject`: The subject of the class (reference to Subject Model).
- `teacher`: The teacher of the class (reference to Teacher Model).

### 3. Subject
Subject is a model that represents a subject. It has the following fields:
- `name`: The name of the subject.
- `teacher`: The teacher of the subject (reference to Teacher Model).
- `students`: The students of the subject (reference to Student Model).

### 4. Teacher
Teacher is a model that represents a teacher. It has the following fields:
- `name`: The name of the teacher.
- `lastName`: The last name of the teacher.
- `email`: The email of the teacher.
- `password`: The password of the teacher.
- `subjects`: The subjects of the teacher (reference to Subject Model).
- `groups`: The groups of the teacher (reference to Group Model).

### 5. Group
Group is a model that represents a group. It has the following fields:
- `number`: The number of the group.
- `teacher`: The teacher of the group (reference to Teacher Model).
- `students`: The students of the group (reference to Student Model).
- `subjects`: The subjects of the group (reference to Subject Model).
- `attendance`: The attendance records of the group (reference to Attendance Model).

### 6. Admin
Admin is a model that represents an admin. It has the following fields:
- `email`: The email of the admin.
- `password`: The password of the admin.
- `name`: The name of the admin.
- `userName`: The username of the admin.

## Routes
This API has the following routes (all routes are prefixed with `/api`):

### 1. Attendance
- `GET /attendance`: Gets all the attendance records.
- `POST /attendance`: Creates a new attendance record.
- `PUT /attendance/:id`: Updates the attendance record with the specified ID.
- `DELETE /attendance/:id`: Deletes the attendance record with the specified ID.
#### The main route for attendance is `/attendance`. It has the following sub-routes:
- `GET /:id`: Gets the attendance record with the specified ID.
- `GET /student/:studentID`: Gets all the attendance records of the student with the specified ID.
- `GET /student/:studentID/date/:year/:month/:day`: Gets all the attendance records of the student with the specified ID in the specified date.
- `GET /student/:studentID/group/:groupID`: Gets all the attendance records of the student with the specified ID in the specified group.
- `GET /student/:studentID/subject/:subjectID`: Gets all the attendance records of the student with the specified ID in the specified subject.
- `GET /student/:studentID/group/:groupID/subject/:subjectID`: Gets all the attendance records of the student with the specified ID in the specified group and subject.
- `GET /group/:groupID`: Gets all the attendance records of the group with the specified ID.
- `GET /group/:groupID/date/:year/:month/:day`: Gets all the attendance records of the group with the specified ID in the specified date.
- `GET /group/:groupID/subject/:subjectID`: Gets all the attendance records of the group with the specified ID in the specified subject.
- `GET /group/:groupID/subject/:subjectID/date/:year/:month/:day`: Gets all the attendance records of the group with the specified ID in the specified subject and date.
- `GET /subject/:subjectID`: Gets all the attendance records of the subject with the specified ID.
- `GET /subject/:subjectID/date/:year/:month/:day`: Gets all the attendance records of the subject with the specified ID in the specified date.
- `GET /subject/:subjectID/group/:groupID/student/:studentID/date/:year/:month/:day`: Gets all the attendance records of the subject with the specified ID in the specified group, student and date.
- `GET /student/:studentID/status/:status`: Gets all the attendance records of the student with the specified ID with the specified status.
- `GET /subject/:id`: Gets all the attendance records of the subject with the specified ID.
- `GET /student/:studentID/status/:status`: Gets all the attendance records of the student with the specified ID with the specified status.
- `GET /group/:groupID/status/:status`: Gets all the attendance records of the group with the specified ID with the specified status.
- `GET /subject/:subjectID/status/:status`: Gets all the attendance records of the subject with the specified ID with the specified status.
- `GET /group/:groupID/subject/:subjectID/status/:status`: Gets all the attendance records of the group with the specified ID in the specified subject with the specified status.

### 2. Student
- `GET /student`: Gets all the students.
- `GET /student/:id`: Gets the student with the specified ID.
- `POST /student`: Creates a new student.
- `PUT /student/:id`: Updates the student with the specified ID.
- `DELETE /student/:id`: Deletes the student with the specified ID.
- `POST /student/:id/attendance`: Creates a new attendance record for the student with the specified ID.

### 3. Subject
- `GET /subject`: Gets all the subjects.
- `GET /subject/:id`: Gets the subject with the specified ID.
- `POST /subject`: Creates a new subject.
- `PUT /subject/:id`: Updates the subject with the specified ID.
- `DELETE /subject/:id`: Deletes the subject with the specified ID.

### 4. Teacher
- `GET /teacher`: Gets all the teachers.
- `GET /teacher/:id`: Gets the teacher with the specified ID.
- `POST /teacher`: Creates a new teacher.
- `PUT /teacher/:id`: Updates the teacher with the specified ID.
- `DELETE /teacher/:id`: Deletes the teacher with the specified ID.
- `POST /teacher/login`: Logs in the teacher with the specified email and password.
- `POST /teacher/logout`: Logs out the teacher.
- `GET /teacher/attendance/group/:id`: Gets all the attendance records of the group with the specified ID.
- `GET /teacher/attendance/subject/:id`: Gets all the attendance records of the subject with the specified ID.

### 5. Admin
- `GET /admin/login`: Logs in the admin with the specified email and password.
- `POST /admin/logout`: Logs out the admin.
- `GET /admin/dashboard`: Gets the dashboard data.

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/LurchingDart/API-ControlAsistencia.git
```
### 2. Install dependencies
```bash
npm install
```
### 3. Setup the MongoDB database connection in `config.js`
```javascript
module.exports = {
    // ...
    database: {
        url: 'mongodb://localhost:27017/example/link'
    }
    // ...
}
```
### 4. Run the server
```bash
npm start
```

## Credits
- [LurchingDart](https://github.com/LurchingDart)