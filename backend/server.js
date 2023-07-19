const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const port = 5000;

app.use(cors());
app.use(express.json());
dotenv.config();

mongoose.connect(process.env.MONGODB_URL)
.then(() => {
  console.log('Database connected');
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

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});
