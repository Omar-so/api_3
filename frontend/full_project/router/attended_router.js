const express = require('express');
const router = express.Router();
const {
  markAttendance,
  displayAttendance,
  displayAttendanceGraph,
  attendanceToday
} = require('../controller/attendance_controller');

// Mark attendance for a student
// POST /attendance/mark?id=STUDENT_ID
router.post('/mark', markAttendance);

// Display all attendance for a student
// GET /attendance/display?id=STUDENT_ID
router.get('/display', displayAttendance);

// Display attendance data for the current month (graph)
// GET /attendance/graph
router.get('/graph', displayAttendanceGraph);

// Get number of students attended today
// GET /attendance/today
router.get('/today', attendanceToday);

module.exports = router;
