const katy = require('katy-query');

const { pgPool, pgParams } = require('../pgdb');
const { errorLogger } = require('../utils/error');
const { hashPassword, comparePassword } = require('../utils/password');

// SELECT
// const query = katy.select('customers', ['name', 'email', 'age'])
// 	.where('age', '>', 18)
// 	.orderBy('name', 'ASC')
// 	.limit(10)
// 	.offset(20)
// 	.build();

// INSERT
// const query = katy.insert('customers', { name: 'John Doe', email: 'john@example.com', age: 30 }).build();

// UPDATE
// const query = katy.update('customers', { age: 35 })
// 	.where('name', '=', 'John Doe')
// 	.build();

// DELETE
// const query = katy.delete('customers')
// 	.where('ae', '<', 18)
// 	.build();

const user = {

	create: async (params) => {
		try {
			if (!params || !params.username || !params.password) {
				throw new Error('Missing paramaters. Can not create user without valid parameters');
			}

			const query = katy.insert(
				'users',
				{
					username: pgParams(params.username),
					password: hashPassword(pgParams(params.password)),
					email: pgParams(params.password),
					created: new Date().toISOString,
				}
			).build();

			console.log('[user.js] (create) query: ', query);
			const result = await pgPool.query(query);
			return result;

		} catch (error) {
			errorLogger(error);
		}
	},

	login: async (params) => {
		let token = null;
		try {
			if (!params || !params.username || !params.password) {
				throw new Error('Missing paramaters. Can not create user without valid parameters');
			}

			const storedPassword = katy.select('users', ['password'])
				.where('deleted', '=', null)
				.where('username', '=', pgParams(params.username))
				.limit(1)
				.build();

			console.log('[user.js] (login) query: ', storedPassword);
			const validatePassword = comparePassword(storedPassword[0].password);

			if (validatePassword) {
				token = 'token';
			}

		} catch (error) {
			errorLogger(error);

		} finally {
			return token;
		}
	},

	delete: async (params) => {
		return params;
	}
};

module.exports = user;