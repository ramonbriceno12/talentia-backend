const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/database');
const http = require("http"); // ✅ Import HTTP to attach socket.io

const { setupSocketServer } = require("./config/socketServer"); // ✅ Import the WebSocket setup

//Routes
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const companyRoutes = require('./routes/companiesRoutes')
const talentsRoutes = require('./routes/talentsRoutes')
const skillsRoutes = require('./routes/skillsRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const actionsRoutes = require('./routes/actionsRoutes');
const jobTitlesRoutes = require('./routes/jobTitlesRoutes');
const linksRoutes = require('./routes/linksRoutes');
const profileViewsRoutes = require('./routes/profileViewsRoutes');
const applicationsRoutes = require('./routes/applicationsRoutes')
const proposalsRoutes = require('./routes/proposalsRoutes')
const billingRoutes = require('./routes/billingRoutes.js')
const connectionsRoutes = require('./routes/connectionsRoutes.js');
const followsRoutes = require('./routes/followsRoutes.js');
const notificationsRoutes = require('./routes/notificationsRoutes.js');
require("./models/associations"); // Ensure associations are set up before syncing



dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
// app.use(cors({
//   origin: 'https://talentiave.com', // Only allow your frontend
//   methods: 'GET,POST,PUT,DELETE',
//   allowedHeaders: 'Content-Type,Authorization',
//   credentials: true
// }));

const server = http.createServer(app); // ✅ Create HTTP server
setupSocketServer(server);

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/companies/', companyRoutes);
app.use('/api/talents/', talentsRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/actions', actionsRoutes);
app.use('/api/job-titles', jobTitlesRoutes);
app.use('/api/links/', linksRoutes);
app.use('/api/profile-views', profileViewsRoutes);
app.use('/api/applications', applicationsRoutes);
app.use('/api/proposals', proposalsRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/connections', connectionsRoutes);
app.use('/api/follows', followsRoutes);
app.use('/api/notifications', notificationsRoutes);

const PORT = process.env.PORT || 5000;

sequelize.authenticate()
  .then(() => {
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log('Error connecting to the database:', err));