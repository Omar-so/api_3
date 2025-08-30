const mongoose = require("mongoose");
const CustomError = require('../utilty/Error'); 

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone : { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Create Student
studentSchema.statics.createStudent = async function (studentData) {
  const Student = this;
  const existingStudent = await Student.findOne({ phone: studentData.phone });
  if (existingStudent) {
    throw new CustomError(400, "Phone already in use");
  }
  const student = new Student(studentData);
  return student.save();
};

// Search Student(s) by name
studentSchema.statics.searchWithName = async function (name) {
  const Student = this;
  const students = await Student.find({ name: new RegExp(name, "i") }); 
 
  return students;
};

// Get Student by ID
studentSchema.statics.getById = async function (id) {
  const Student = this;
  const student = await Student.findById(id);
  if (!student) {
    throw new CustomError(404, "Student not found");
  }
  return student;
};

studentSchema.statics.Get_All = async function () {
  const Student = this;
  const student = await Student.find();

  return student;
};

// Update Student
studentSchema.statics.updateStudent = async function (id, updateData) {
  const Student = this;
  const student = await Student.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  if (!student) {
    throw new CustomError(404, "Student not found");
  }
  return student;
};

// Delete Student
studentSchema.statics.deleteStudent = async function (id) {
  const Student = this;
  const student = await Student.findByIdAndDelete(id);
  if (!student) {
    throw new CustomError(404, "Student not found");
  }
  return student;
};

studentSchema.statics.paginateStudents = async function (page = 1, limit = 10) {
  const Student = this;

  const skip = (page - 1) * limit;
  const students = await Student.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const totalStudents = await Student.countDocuments();

  return {
    students,
    totalPages: Math.ceil(totalStudents / limit),
    currentPage: page,
    totalStudents
  };
};

studentSchema.statics.displayRegistrationPerYear = async function () {
  const Student = this;

  // Start and end of the current year
  const startOfYear = new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0);
  const endOfYear = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59, 999);

  return await Student.aggregate([
    {
      $match: {
        createdAt: { $gte: startOfYear, $lte: endOfYear }
      }
    },
    {
      $group: {
        _id: { $dateToString: { format: "%m", date: "$createdAt" } }, // Month number
        totalRegistrations: { $sum: 1 }
      }
    },
    {
      $sort: { "_id": 1 } 
    },
    {
      $project: {
        _id: 0,
        Month: "$_id",
        totalRegistrations: 1
      }
    }
  ]);
};


module.exports = mongoose.model("Student", studentSchema);
