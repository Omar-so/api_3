const Student = require('../model/student');
const CustomError = require('../utilty/Error');
const {uploadImage} = require('../config/cloudinary');
const fs = require('fs');
const path = require('path');
const fastCsv = require('fast-csv');
const { getCache, setCache } = require('../utilty/cache'); 
const { subscribe } = require('diagnostics_channel');

// Create a new student
const Create_Student = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const imageFile = req.file; 

    if (!name || !email || !phone || !imageFile) {
      return next(new CustomError(400, "Name, email, phone, and image are required"));
    }


    console.log(req.file.path)

    const { url } = await uploadImage(imageFile.path);
    if (!url) {
      return next(new CustomError(500, "Image upload failed in Cloudinary"));
    }

    const student = await Student.createStudent({ name, image: url, email, phone });
    res.status(201).json({ message: "Student created successfully", data: student });
  } catch (error) {
    next(error);
  }
};

// Search student(s) by name
const Search_Student = async (req, res, next) => {
  try {
    const { name } = req.query;
    if (!name) return next(new CustomError(400, "Name is required"));

    const students = await Student.searchWithName(name);
    res.status(200).json({ data: students, message: "Students found" });
  } catch (error) {
    next(error);
  }
};

// Update student by ID
const Updated_Student = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, image, email, phone } = req.body;

    if (!id) return next(new CustomError(400, "ID is required"));

    const updatedStudent = await Student.updateStudent(id, { name, image, email, phone });
    res.status(200).json({ message: "Student updated successfully", data: updatedStudent });
  } catch (error) {
    next(error);
  }
};

// Delete student by ID
const Delete_Student = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return next(new CustomError(400, "ID is required"));

    const deletedStudent = await Student.deleteStudent(id);
    res.status(200).json({ message: "Student deleted successfully", data: deletedStudent });
  } catch (error) {
    next(error);
  }
};

// Get paginated students
const Get_Paginated_Students = async (req, res, next) => {
  try {
    let { page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const result = await Student.paginateStudents(page, limit);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// Export all students as CSV
const Get_All_Students_CSV = async (req, res, next) => {
  try {
    let students = [];

    const data = await getCache("getAllStudents");
    if (data) {
      students = JSON.parse(data);  
    } else {
      students = await Student.Get_All();
      
      await setCache("getAllStudents", JSON.stringify(students), 300);
    }
    
    const filtered = students.map((object) => ({
      name: object.name,
      phone: object.phone,
      email: object.email
    }));
    
    const filePath = path.join(__dirname, '../students.csv');
    const ws = fs.createWriteStream(filePath);

    fastCsv.write(filtered, { headers: true }).pipe(ws).on('finish', () => {
      res.download(filePath, 'students.csv', (err) => {
        if (err) return next(err);
        fs.unlinkSync(filePath);
      });
    });
  } catch (error) {
    next(error);
  }
};

// this should be in Subscriber controller but here also fine
const Subscribtion = require('../model/subscribtion')
const count_graph = async (req , res , next) => {
 try {
  const data = await Subscribtion.displaySubscribtionPerYear();

  res.status(200).json({data})

 } catch (error) {
  next(error)
 }

}

module.exports = {
  Create_Student,
  Search_Student,
  Updated_Student,
  Delete_Student,
  Get_Paginated_Students,
  Get_All_Students_CSV,
  count_graph
};
