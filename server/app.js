const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const companyRoutes = require('./routes/companiesRoutes')

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/companies/', companyRoutes);

const PORT = process.env.PORT || 5000;

sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log('Error connecting to the database:', err));