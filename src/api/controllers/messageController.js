const Message = require("../models/message.model");

const messageController = {
	createMessage: async (req, res) => {
		try {
			const newMessage = await new Message({
				conversationId: req.body.conversationId,
				sender: req.body.sender,
				text: req.body.text,
			});

			const message = await newMessage.save();
			res.status(200).json(message);
		} catch (error) {
			res.status(500).json(error);
		}
	},
};

module.exports = messageController;
