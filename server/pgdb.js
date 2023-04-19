const { Pool } = require('pg');
const sqlString = require('sqlstring');
const { errorLogger } = require('./utils/error');

const pgQuery = (query, values) => {
	const valRegex = /\$\w+/;
	let queryString = '';

	try {
		queryString = query.replace(/\s+/g, ' ');
		let index = 0;
		let regexMatch = queryString.match(valRegex);

		while (regexMatch && values?.[index]) {
			const findText = `${regexMatch[0]}`;
			queryString = queryString.replace(findText, JSON.stringify(values[index]))
			regexMatch = queryString.match(valRegex);
			index++;
		}
	} catch (error) {
		errorLogger(error);

	} finally {
		return queryString;
	}
};

const pgParams = (params) => {
	let sanitizedParams = [];

	const verifyArray = (arrayParam) => {
		const newArray = [];
		try {
			arrayParam.map((item) => {
				newArray.push(sqlString.escape(item));
			});

		} catch (error) {
			errorLogger(error);

		} finally {
			return newArray;
		}
	};

	const verifyObject = (objectParam) => {
		const newArray = [];
		try {
			for (const [_, value] of Object.entries(objectParam)) {
				newArray.push(sqlString.escape(value));
			}

		} catch (error) {
			errorLogger(error);

		} finally {
			return newArray;
		}
	};

	try {
		if (Array.isArray(params)) {
			sanitizedParams = verifyArray(params);
		} else if (typeof params === 'object') {
			sanitizedParams = verifyObject(params);
		} else {
			sanitizedParams.push(sqlString.escape(params));
		}

	} catch (error) {
		errorLogger(error);

	} finally {
		return sanitizedParams;
	}

};

const pgPool = new Pool({
	user: 'pgadmin',
	host: '0.0.0.0',
	database: 'db',
	password: 'secretpassword',
	port: 5432,
});

module.exports = { pgPool, pgQuery, pgParams };