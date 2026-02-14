const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
    try {
        console.log('Attempting to connect to:', process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
        console.log('MongoDB Connection SUCCESS');
        process.exit(0);
    } catch (err) {
        console.error('MongoDB Connection FAILED:', err.message);
        process.exit(1);
    }
};

testConnection();
