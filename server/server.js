const express = require('express');
const router = require('./routes');
const helmet = require('helmet');
const limiter = require('./api_limiter');

const { pgPool } = require('./pgdb');

const app = express();
try {
	pgPool.connect((err) => {
		if (err) {
			throw new Error(err);
		} else {
			console.log('Connected to the PostgreSQL database pool');
		}
	});
} catch (error) {
	console.log('Error:', error.message, error.stack);
}

app.use(helmet());
app.use(limiter);
app.use('/api', router);

app.listen(3000, () => {
	console.log('Server started on port 3000');
});