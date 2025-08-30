const mongoose = require('mongoose');
const Student = require('./student');

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  createdAt: {
    type: Date,
    default: () => {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      return d;
    }
  },
  attended: {
    type: Boolean,
    default: true,
  }
});

// Compound index (unique per student per day)
attendanceSchema.index({ studentId: 1, createdAt: 1 }, { unique: true });

// Add Attendance
attendanceSchema.statics.Attend = async function (studentId) {
  try {
    const Attendance = this;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = new Attendance({ studentId, createdAt: today });
    await attendance.save();
    return attendance;
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("Attendance already marked for today");
    }
    throw new Error("Error marking attendance: " + error.message);
  }
};

// Display Attendance by Student
attendanceSchema.statics.displayAttendance = async function (studentId) {
  const Attendance = this;
  return await Attendance.find({ studentId })
    .sort({ createdAt: -1 })
    .select("createdAt attended -_id");
};

// Count Attendance for Current Day
attendanceSchema.statics.countStudentsToday = async function () {
  const Attendance = this;

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0); // start of today

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999); // end of today

  return await Attendance.countDocuments({
    createdAt: {
      $gte: startOfDay,
      $lte: endOfDay
    }
  });
};

// Aggregate Attendance per Day for Current Month
attendanceSchema.statics.displayAttendancePerMonth = async function () {
  const Attendance = this;

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const endOfMonth = new Date(startOfMonth);
  endOfMonth.setMonth(endOfMonth.getMonth() + 1);
  endOfMonth.setMilliseconds(-1);

  return await Attendance.aggregate([
    {
      $match: {
        createdAt: { $gte: startOfMonth, $lte: endOfMonth }
      }
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        totalAttendance: { $sum: 1 }
      }
    },
    {
      $sort: { "_id": 1 } 
    },
    {
      $project: {
        _id: 0,
        date: "$_id",
        totalAttendance: 1
      }
    }
  ]);
};

module.exports = mongoose.model('Attendance', attendanceSchema);
