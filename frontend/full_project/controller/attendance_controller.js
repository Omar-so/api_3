const Attendance = require('../model/attendace');
const CustomError = require('../utilty/Error');

// Mark attendance for a student
const markAttendance = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id) return next(new CustomError(400, "ID required"));

    const attendance = await Attendance.Attend(id); 
    res.status(201).json({ message: "User attended successfully", data: attendance });
  } catch (error) {
    if (error.message.includes("already marked")) {
      return next(new CustomError(400, error.message));
    }
    next(error);
  }
};

// Display all attendance records for a student
const displayAttendance = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id) return next(new CustomError(400, "ID required"));

    const data = await Attendance.displayAttendance(id);
    res.status(200).json({ data, message: "Attendance found" });
  } catch (error) {
    next(error);
  }
};

// Display attendance data for the current month (for graph)
const displayAttendanceGraph = async (req, res, next) => {
  try {
    const data = await Attendance.displayAttendancePerMonth(); 
    res.status(200).json({ data, message: "Attendance found" });
  } catch (error) {
    next(error);
  }
};

// Get number of students attended today
const attendanceToday = async (req, res, next) => {
  try {
    const number = await Attendance.countStudentsToday(); 
    res.status(200).json({ number, message: "Attendance found" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  markAttendance,
  displayAttendance,
  displayAttendanceGraph,
  attendanceToday
};
