const mongoose = require("mongoose");
const CustomError = require('../utilty/Error'); 

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Create Application
applicationSchema.statics.createApplication = async function (applicationData) {
  const Application = this;
  const existingApplication = await Application.findOne({ phone: applicationData.phone });
  if (existingApplication) {
    throw new CustomError(400, "Phone already in use");
  }
  const application = new Application(applicationData);
  return application.save();
};

applicationSchema.statics.searchWithName = async function (name) {
  const Application = this;
  const applications = await Application.find({ name: new RegExp(name, "i") });
  return applications;
};

applicationSchema.statics.getById = async function (id) {
  const Application = this;
  const app = await Application.findById(id);
  return app;
};

// Delete Application
applicationSchema.statics.deleteApplication = async function (id) {
  const Application = this;
  const app = await Application.findByIdAndDelete(id);
 
  return app;
};

// Paginate Applications
applicationSchema.statics.paginateApplication = async function (page = 1, limit = 10) {
  const Application = this;

  const skip = (page - 1) * limit;
  const applications = await Application.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const totalApplications = await Application.countDocuments();

  return {
    applications,
    totalPages: Math.ceil(totalApplications / limit),
    currentPage: page,
    totalApplications
  };
};

module.exports = mongoose.model("Application", applicationSchema);
