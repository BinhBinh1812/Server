const mongoose = require("mongoose");

const consversationSchema = mongoose.Schema(
	{
		member: {
			type: Array,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Conversation", consversationSchema);
