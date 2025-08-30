const Subscription = require('../model/subscribtion');
const CustomError = require('../utilty/Error');
const fs = require('fs');
const path = require('path');
const fastCsv = require('fast-csv');

// Pay subscription for a student
const subscribePay = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id) return next(new CustomError(400, "ID required"));

    const result = await Subscription.Subscribe(id); // Assuming Attend marks subscription
    res.status(201).json({ message: "User subscribed successfully", data: result });
  } catch (error) {
    next(error);
  }
};

// Display all subscription records for a student
const displaySubscription = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id) return next(new CustomError(400, "ID required"));

    const data = await Subscription.displaySubscribtion(id);
    res.status(200).json({ data, message: "Subscriptions found" });
  } catch (error) {
    next(error);
  }
};

// Get number of subscriptions this month
const subscribedThisMonth = async (req, res, next) => {
  try {
    const number = await Subscription.displaySubscriptionMonth(); // Make sure model method exists
    res.status(200).json({ number, message: "Subscriptions this month" });
  } catch (error) {
    next(error);
  }
};

// Download all subscriptions as CSV
const getAllSubscriptionsCSV = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.GetAll(); 

    const filter = subscriptions.filter(obj => obj.studentId != null);

    const filter2 = filter.map(obj => ({
      name: obj.studentId.name,
      email: obj.studentId.email,
      phone: obj.studentId.phone
    }));

    const filePath = path.join(__dirname, `../subscriptions_${Date.now()}.csv`);
    const ws = fs.createWriteStream(filePath);

    fastCsv
      .write(filter2, { headers: true })
      .pipe(ws)
      .on('finish', () => {
        res.download(filePath, 'subscriptions.csv', (err) => {
          if (err) return next(err);
          fs.unlinkSync(filePath);
        });
      });

  } catch (error) {
    next(error);
  }
};


module.exports = {
  subscribePay,
  displaySubscription,
  subscribedThisMonth,
  getAllSubscriptionsCSV
};
