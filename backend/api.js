const express = require("express");
const carRoutes = require("./routes/carRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const partRoutes = require("./routes/partRoutes");
const { sendMail } = require("./routes/mailService");
const multer = require('multer');
const path = require('path');
const i18n = require('./config/i18');

// Config Backend
const app = express();
const PORT = 2999;
app.use(express.json());
app.use(i18n.init);


app.use('/car', carRoutes);
app.use('/category', categoryRoutes);
app.use('/part', partRoutes);

// Sedning Mail
app.post('/send_email', async (req, res) => {
  console.log(req.body);
  const { to, subject, text } = req.body;

  try {
    const result = await sendMail(to, subject, text);
    res.json({ message: i18n.__('Email sent successfully'), info: result });
  } catch (error) {
    res.status(500).json({ error: i18n.__('Failed to send email') });
  }
});


// Upload Files
// Setting storage location
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'files/'); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Set unique filename (timestamp + file extension)
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  try {
    const uploadedFile = req.file;
    if (!uploadedFile) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    res.json({ message: i18n.__('File uploaded successfully'), file: uploadedFile });
  } catch (error) {
    console.error('Error uploading file:', error.message);
    res.status(500).json({ error: i18n.__('Internal Server Error') });
  }
});

// // Serve static files from the 'uploads' directory
// app.use('/uploads', express.static('uploads'));



// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
