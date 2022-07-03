const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authControllers = {
	//REGISTER
	register: async (req, res) => {
		try {
			//generate password
			const salt = await bcrypt.genSalt(10);
			const hashed = await bcrypt.hash(req.body.password, salt);

			//create new user
			const newUser = await new User({
				username: req.body.username,
				phonenumber: req.body.phonenumber,
				email: req.body.email,
				password: hashed,
			});

			//save new user to database
			await newUser.save();
			res.status(200).json({ status: "Successfully!" });
		} catch (error) {
			res.status(500).json(error);
		}
	},

	//Login
	login: async (req, res) => {
		try {
			const user = await User.findOne({ username: req.body.username });
			if (!user) {
				res.status(404).json("User not found!");
			}
			const validPassword = await bcrypt.compare(
				req.body.password,
				user.password
			);
			if (!validPassword) {
				res.status(404).json("Wrong password!");
			}
			if (user && validPassword) {
				const accessToken = jwt.sign(
					{
						id: user.id,
					},
					process.env.ACCESS_TOKEN_KEY,
					{ expiresIn: "2d" }
				);
				const refreshToken = jwt.sign(
					{
						id: user.id,
					},
					process.env.REFRESH_TOKEN_KEY,
					{ expiresIn: "365d" }
				);
				const { password, createdAt, updatedAt, ...others } = user._doc;
				res.status(200).json({ ...others, accessToken });
			}
		} catch (error) {
			res.status(500).json(error);
		}
	},
};

module.exports = authControllers;
