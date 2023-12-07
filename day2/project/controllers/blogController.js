const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../data/data.json');

const readDataFromFile = () => {
  const rawData = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(rawData);
};

const writeDataToFile = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
};

const getBlogs = (req, res) => {
  const data = readDataFromFile();
  res.json(data);
};

const getBlogById = (req, res) => {
  const id = req.params.id;
  const data = readDataFromFile();
  const blog = data.find((blog) => id === blog.id);
  res.render('blog', { blog });
};

const createBlog = (req, res) => {
  const data = readDataFromFile();
  const newBlog = req.body;
  data.push(newBlog);
  writeDataToFile(data);
  res.json(newBlog);
};

const updateBlog = (req, res) => {
  const data = readDataFromFile();
  const blogId = req.params.id;
  const blogIndex = data.findIndex((task) => task.id === blogId);
  if (blogIndex !== -1) {
    data[blogIndex] = { ...data[blogIndex], ...req.body };
    writeDataToFile(data);
    res.json(data[blogIndex]);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};

const deleteBlog = (req, res) => {
  const data = readDataFromFile();
  const blogId = req.params.id;
  const filteredData = data.filter((blog) => blog.id !== blogId);
  if (filteredData.length < data.length) {
    writeDataToFile(filteredData);
    res.json({ message: 'Blog deleted successfully' });
  } else {
    res.status(404).json({ message: 'Blog not found' });
  }
};

module.exports = { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog };
