const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const companyRoutes = require('./routes/companiesRoutes')
const talentsRoutes = require('./routes/talentsRoutes')
const skillsRoutes = require('./routes/skillsRoutes');
const jobCategoriesRoutes = require('./routes/jobCategoriesRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const actionsRoutes = require('./routes/actionsRoutes');
require("./models/associations"); // Ensure associations are set up before syncing



dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
  origin: 'https://talentiave.com', // Only allow your frontend
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/companies/', companyRoutes);
app.use('/api/talents/', talentsRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/job-categories', jobCategoriesRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/actions', actionsRoutes);


const PORT = process.env.PORT || 5000;

sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log('Error connecting to the database:', err));