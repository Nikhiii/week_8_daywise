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
  // res.render('blogs', { blogs: data });
  res.json(data)
};

const getBlogById = (req, res) => {
  const id = req.params.id;
  const data = readDataFromFile();
  const blog = data.find((blog) => id === blog.id);
  res.render('blog', { blog });
};

const createBlog = (req, res) => {
  const data = readDataFromFile();
  const { id, title, content } = req.body;
  const newBlog = { id, title, content };
  data.push(newBlog);
  writeDataToFile(data);
  res.redirect('/blog');
};

const updateBlog = (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  let data = readDataFromFile();
  const index = data.findIndex((blog) => blog.id === id);
  if (index !== -1) {
    data[index].title = title;
    data[index].content = content;
    writeDataToFile(data);
    res.redirect('/blog');
  } else {
    res.status(404).send('Blog not found');
  }
};

const deleteBlog = (req, res) => {
  const id = req.params.id;
  let data = readDataFromFile();
  data = data.filter((blog) => blog.id !== id);
  writeDataToFile(data);
  res.redirect('/blog');
};

module.exports = { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog };
