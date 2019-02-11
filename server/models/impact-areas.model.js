const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const impactAreaSchema = new Schema(
	{
		title: { type: String, trim: true, required: true, index: {
			unique: true,
			partialFilterExpression: { active: { $eq: true } }
			}
		},
		copy: { type: String, trim: true },
		// route in App.js for this outcome area
		route: { type: String, trim: true, lowercase: true, required: true, index: {
				unique: true,
				partialFilterExpression: { active: { $eq: true } }
			}
		},
		image: String,
		active: { type: Boolean, default: false },
		order: { type: Number, default: 100 },
		notes: String,
	},
	{ 
		timestamps: true,
		strict: false
	}
);

outcomeAreaSchema.pre('remove', (next) => {
	// 'this' is the client being removed. Provide callbacks here if you want
	// to be notified of the calls' result.
	Card.remove({ outcome_id: this._id }).exec();
	Submission.remove({ outcome_id: this._id }).exec();
	next();
});

module.exports = mongoose.model('OutcomeArea', impactAreaSchema);