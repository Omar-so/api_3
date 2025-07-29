const user = require('../models/User');


const course = require('../models/courses');

const user_2 = require('../models/user_2');
const cart = require('../models/cart'); 


const cloud =require('../cloudinary/cloudinary');
const path = require('path');
const getall = async (req, res) => {
  try {
    const { limit, page } = req.query;
    const skip = (page - 1) * limit;
    const dataa = await course.findAll({
      limit: parseInt(limit),
      offset: parseInt(skip)
    });
    res.status(200).json({ statuscode: 200, data: dataa });
  } catch (err) {
    console.error("Error in get all request:", err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getCourse = async (req, res) => {
  try {
    const course = await course.findByPk(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ status: 'SUCCESS', data: { course } });
  } catch (err) {
    next(err);
  }
};

const addcourse = async (req, res) => {
  try {
    const { course_name, price, username } = JSON.parse(req.body.body);


    console.log("##########################");
    console.log(course_name ," ", price," ",username);
    console.log("##########################");
    
    
    
    const use = await user.findOne({ where: { name: username } });
    console.log("##########################");
    console.log(use);
    console.log("##########################");
    
    if (!use) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log("##########################");
    console.log(req.file);
    console.log("##########################");
    
    const url = await cloud.uploadFile(path.join(__dirname, `../uploadsCourse/${req.file.filename}`))

    console.log("########################## here stop");
    console.log( url.secure_url );
    console.log("##########################");
      


    await course.create({
      name: course_name,
      price: price,
      userId: use.id,
      phote:url.secure_url
    });
    res.status(200).json({ message: 'Course added successfully' });
  } catch (error) {
    console.error("Error in addcourse:", error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deletecourses = async (req, res) => {
  try {
    await course.destroy({ where: { id: req.params.courseId } });
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error("Error in deletecourses:", error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const { Op } = require('sequelize');  // Import Sequelize operators

const SearchByName = async (req, res) => {
    try {
        const { name } = body.params.CourseName;  // Correct case for parsing input

        const products = await course.findAll({
            where: {
                name: {
                    [Op.like]: `%${name}%`  // Using LIKE operator for wildcard search
                }
            }
        });

        res.status(200).json({
            message: 'Success',
            products  
        });

    } catch (error) {
        console.error("Error in SearchByName:", error.message);
        res.status(500).json({ message: 'Internal Server Error in Search' });
    }
};

const AddToCart = async (req, res) => {
    try {
      const {  username , email } = req.currentUser;
      const { course_name } = req.body;  
      const user1 = await user_2.findOne({ where: { email: email } });
      console.log("###############################");
      console.log("username " , user1.username , " ", user1.email);
      console.log("###################################");
      
        const Course = await course.findOne({ where: { name: course_name } });
  
        
      if (!user1) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      await cart.create({
        quantity: 1,
        userId: user1.id,
        courseId: Course.id,
      });
  
      res.status(200).json({ message: 'Course added to cart successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to add course to cart' });
    }
  };

  const DisplayAllChart = async (req, res) => {
    try {
      const { username, email } = req.currentUser;
  
      const user1 = await user_2.findOne({ where: { email: email } });
  
      if (!user1) {
        return res.status(404).json({ Message: "User not found" });
      }
  
      const CarT = await cart.findAll({ where: { userId: user1.id } });
  
      const result = [];
      
      for (const CArt of CarT) {
        const coursess = await course.findOne({ where: { id: CArt.courseId } });
        if (coursess) {
          result.push(coursess);
        }
      }
  
      // Send the result in response
      res.status(200).json({ Message: "Success", Courses: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ Message: "An error occurred", Error: error.message });
    }
  };
  
  const DeleteChart =  async (req,res) => {
    try {
      const {  username , email } = req.currentUser;
      const { course_name } = req.body;  
      const user1 = await user_2.findOne({ where: { email: email } });
      console.log("###############################");
      console.log("username " , user1.username , " ", user1.email);
      console.log("###################################");
      
      const Course = await course.findOne({ where: { name: course_name } });
  
        
      if (!user1) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      await cart.destroy({where:{user1,course}});
      res.status(200).json({ message: 'Course Deleted to cart successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to deelte course to cart' });
    }



  }


  const paypal = require('../paypal/paypal');
  const { Json } = require('sequelize/lib/utils');  // Not necessary, remove if unused
  const CheckOut = async (req, res) => {
    try {
      const { username, email } = req.currentUser;
      const user1 = await user_2.findOne({ where: { email } });
  
      if (!user1) {
        return res.status(404).json({ Message: "User not found" });
      }
  
      const CarT = await cart.findAll({ where: { userId: user1.id } });
  
      if (CarT.length === 0) {
        return res.status(400).json({ Message: "Cart is empty" });
      }
  
      const items = [];
  
      // Loop through each cart and find the associated course
      for (const CArt of CarT) {
        const coursess = await course.findOne({ where: { id: CArt.courseId } });
        if (coursess) {
          items.push({
            name: coursess.name,  
            price: coursess.price.toString(),  
            quantity: '1', 
          });
        }
      }
  
      if (items.length === 0) {
        return res.status(400).json({ Message: "No valid courses found in cart" });
      }
  
      try {
        const orderData = {
          amount: items.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2),
          currency: 'USD',  // Example currency; update if needed
          items: items,
        };
        
        const order = await paypal.CreateRequest(orderData);
        const captureResult = await paypal.CaptureRequest(order.id);  // Use returned `order.id`
  
        res.status(200).json({
          Message: "Checkout Successful",
          OrderId: order.id,
          CaptureDetails: captureResult,
        });
      } catch (error) {
        console.error("Error in PayPal checkout:", error);
        res.status(500).json({ Message: "Checkout failed", Error: error.message });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ Message: "An error occurred", Error: error.message });
    }
  };
  
  module.exports = CheckOut;
  module.exports = { getall, getCourse, addcourse, deletecourses,SearchByName,AddToCart,DisplayAllChart,DeleteChart };
