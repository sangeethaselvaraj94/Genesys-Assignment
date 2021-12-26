const mongoose = require('mongoose');

export const mongoDBConnection = () => {
	mongoose.connect('mongodb://localhost:27017/genesys', { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
		console.log('MongoDB Connected!!!');
		return Promise.resolve({});
	});
	mongoose.connection.on('error', err => {
		console.log('Error:::', err);
		process.exit(-1);
	});
};
