const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../data/tasks.json');

const readDataFromFile = () => {
  const data = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(data);
};

const writeDataToFile = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
};

const getTasks = (req, res) => {
  const data = readDataFromFile();
  res.json(data);
};

const createTask = (req, res) => {
  const data = readDataFromFile();
  const newTask = req.body;
  data.push(newTask);
  writeDataToFile(data);
  res.json(newTask);
};

const updateTask = (req, res) => {
  const data = readDataFromFile();
  const taskId = req.params.id;
  const taskIndex = data.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    data[taskIndex] = { ...data[taskIndex], ...req.body };
    writeDataToFile(data);
    res.json(data[taskIndex]);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};

const deleteTask = (req, res) => {
  const data = readDataFromFile();
  const taskId = req.params.id;
  const filteredData = data.filter((task) => task.id !== taskId);
  if (filteredData.length < data.length) {
    writeDataToFile(filteredData);
    res.json({ message: 'Task deleted successfully' });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
