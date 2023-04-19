const bcrypt = require('bcrypt');

const { errorLogger } = require('./error');

const hashPassword = (password) => {
	const saltRounds = 7;
	
	try {
		bcrypt.hash(password, saltRounds, (err, hash) => {
			if (err) {
				throw new Error('Hashing password failed');
			} else {
				return hash;
			}
		});

	} catch (error) {
		errorLogger(error);
		throw new Error('Hashing password failed');
	}
};

const comparePassword = (password, storedHash) => {
	const validation = null;
	try {
		bcrypt.compare(password, storedHash, (err, result) => {
			if (err) {
				throw new Error('Invalid user password');
			} else if (result) {
				validation = result;
			}
		});

	} catch (error) {
		errorLogger(error);

	} finally {
		return validation;
	}
};

const getToken = () => {

};

const verifyToken = () => {

};

module.exports = {
	hashPassword,
	comparePassword,
	getToken,
	verifyToken
};