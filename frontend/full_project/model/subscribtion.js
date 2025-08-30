const mongoose = require('mongoose');
const Student = require('./student');

const subscriptionSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  createdAt: {
    type: Date,
    default: () => new Date().setHours(0, 0, 0, 0)
  },
  Sub: {
    type: Boolean,
    default: true,
  }
});

// Compound index (unique per student per day)
subscriptionSchema.index({ studentId: 1, createdAt: 1 }, { unique: true });

subscriptionSchema.statics.Subscribe = async function (studentId) {
  try {
    const Subscription = this;
    const today = new Date().setHours(0, 0, 0, 0);

    const subscrip = new Subscription({ studentId, createdAt: today });
    await subscrip.save();
    return subscrip;
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("Attendance already marked for today");
    }
    throw new Error("Error marking attendance: " + error.message);
  }
};

// Display Attendance
subscriptionSchema.statics.displaySubscribtion = async function (studentId) {
  const Subscription = this;
  return await Subscription.find({ studentId })
    .sort({ createdAt: -1 })
    .select("createdAt Sub -_id");
};

// Display Attendance for the Current Month
subscriptionSchema.statics.displaySubscriptionMonth = async function () {
  const Subscription = this;

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const endOfMonth = new Date(startOfMonth);
  endOfMonth.setMonth(endOfMonth.getMonth() + 1);
  endOfMonth.setMilliseconds(-1);

  return await Subscription.countDocuments({
    createdAt: {
      $gte: startOfMonth,
      $lte: endOfMonth
    }
  });
};

subscriptionSchema.statics.GetAll = async function () {
  const Subscription = this;

  const data = await Subscription.find().populate({
    path: 'studentId',
    select: 'name email phone',
    match: { _id: { $ne: null } } 
  });
  
  return data;
};

subscriptionSchema.statics.displaySubscribtionPerYear = async function () {
  const Subscription = this;

  // Start and end of the current year
  const startOfYear = new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0);
  const endOfYear = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59, 999);

  return await Subscription.aggregate([
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




module.exports = mongoose.model('Subscription', subscriptionSchema); 