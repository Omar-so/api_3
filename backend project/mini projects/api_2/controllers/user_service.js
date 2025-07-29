const user_repo = require('../repositories/user_repo');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// SignUp (register)
const signup = async (req, res, next) => {
  try {
    const { name, email, password, age } = req.body;
    if (!name || !email || !password || !age) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await user_repo.GetByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const hashed_pass = await bcrypt.hash(password, 10);
    await user_repo.Build_User({ name, email, hashed_pass, age });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

// SignIn (login)
const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const user = await user_repo.GetByEmail(email);
    if (!user)
      return res.status(401).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.hashed_pass);
    if (!isMatch)
      return res.status(401).json({ error: "Invalid email or password" });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY, {
      expiresIn: '1h'
    });

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 3600000 // 1 hour
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    next(error);
  }
};

const Like = async (req, res, next) => {
  try {
    const { quotes_id } = req.body;
    const user_id = req.currentUser.id ;

    if (!quotes_id || !user_id) {
      return res.status(400).json({ error: "quotes_id and user_id are required" });
    }

    const alreadyLiked = await user_repo.CheckIfLiked(quotes_id, user_id);
    if (alreadyLiked) {
      return res.status(409).json({ message: "You already liked this quote" });
    }

    await user_repo.Like_quotes(quotes_id, user_id);

    res.status(200).json({ message: "Quote liked successfully" });
  } catch (error) {
    next(error);
  }
};




module.exports = { signup, signin , Like};
