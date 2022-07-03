const Conversation = require("../models/conversation.model");

const conversationController = {
	createConversation: async (req, res) => {
		try {
			const newConversation = await new Conversation({
				member: [req.body.senderId, req.body.receiverId],
			});

			const conversation = await newConversation.save();
			res.status(200).json(conversation);
		} catch (error) {
			res.status(500).json(error);
		}
	},
};

module.exports = conversationController;
