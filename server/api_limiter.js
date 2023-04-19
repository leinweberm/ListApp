const rateLimit = require('express-rate-limit');

const mainLimiter = {

	limiter: rateLimit({
		windowMs: 1 * 60 * 1000,
		max: 20,
		standardHeaders: true,
		legacyHeaders: false,
		message: () => {
			return 'Api is limited 20 requests per minute for IP each address';
		},
	}),

	accountLimiter: rateLimit({
		windowMs: 60 * 60 * 1000,
		max: 5,
		standardHeaders: true,
		legacyHeaders: false,
		message: () => {
			return 'Account creation is limited 5 users per hour for each IP address';
		},
	}),
};

module.exports = mainLimiter;