const Application = require('../model/application');
const CustomError = require('../utilty/Error');
const {uploadImage} = require('../config/cloudinary');

// Create Application
const Create_Application = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const imageFile = req.file;

    if (!name || !email || !phone || !imageFile) {
      return next(new CustomError(400, "Name, email, phone, and image are required"));
    }

    const { url, public_id } = await uploadImage(imageFile.path);
    if (!url || !public_id) {
      return next(new CustomError(500, "Image upload failed in Cloudinary"));
    }

    const application = await Application.createApplication({
      name,
      image: url,
      email,
      phone
    });

    res.status(201).json({ message: "Application created successfully", data: application });
  } catch (error) {
    next(error);
  }
};

// Search Application
const Search_Application = async (req, res, next) => {
  try {
    const { name } = req.query;
    if (!name) {
      return next(new CustomError(400, "Name is required"));
    }

    const applications = await Application.searchWithName(name);
    res.status(200).json({ data: applications, message: "Applications found" });
  } catch (error) {
    next(error);
  }
};

// Delete Application
const Delete_Application = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id) {
      return next(new CustomError(400, "ID is required"));
    }

    const application = await Application.deleteApplication(id);
    res.status(200).json({ message: "Application deleted successfully", data: application });
  } catch (error) {
    next(error);
  }
};

// Paginated Applications
const Get_Paginated_Application = async (req, res, next) => {
  try {
    let { page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const result = await Application.paginateApplication(page, limit);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  Create_Application,
  Search_Application,
  Delete_Application,
  Get_Paginated_Application
};
