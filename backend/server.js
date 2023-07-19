const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const port = 5000;

app.use(cors({
  origin: ['http://192.168.0.167:3000', 'https://edemprojects.rf.gd', 'https://edemprojects.netlify.app']
}));
app.use(express.json());
dotenv.config();

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log('Database connected');

  app.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
  });
});

const projectSchema = new mongoose.Schema({
  name: String,
});

const Project = mongoose.model('project', projectSchema);

app.get('/', (req, res) => {
  res.send('EdemProjects API');
});

app.get('/api/projects', async (req, res) => {
  const projects = await Project.find();
  res.send(projects);
});
