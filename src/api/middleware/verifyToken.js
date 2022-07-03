const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
	//ACCESS TOKEN FROM HEADER
	const token = req.headers["Authorization"];
	if (token) {
		const accessToken = token.split(" ")[1];
		jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY, (err, user) => {
			if (err) {
				res.status(403).json("Token is not valid!");
			}
			req.user = user;
			next();
		});
	} else {
		res.status(401).json("You're not authenticated");
	}
};

module.exports = verifyToken;
