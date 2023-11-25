const express = require("express");
const carRoutes = require("./routes/carRoutes");
const partRoutes = require("./routes/partRoutes");
const { sendMail } = require("./routes/mailService");
const multer = require('multer');
const path = require('path');
const i18n = require('./config/i18');
const cors = require('cors');

// Config Backend
const app = express();
const PORT = 2999;
app.use(express.json());
app.use(i18n.init);
app.use(cors());


app.use('/car', carRoutes);
app.use('/part', partRoutes);

// Sedning Mail
app.post('/send_email', async (req, res) => {
  console.log(req.body);
  const { to, subject, text } = req.body;

  try {
    // CONFIG EMAIL
    // const result = await sendMail(email, name, mesage);
    // res.json({ message: i18n.__('Email sent successfully'), info: result });
    res.status(200).json({
      status: "success",
      resault: i18n.__('Email sent successfully')
    });
  } catch (error) {
    res.status(500).json({ error: i18n.__('Failed to send email') });
  }
});


// Upload Files
// Setting storage location
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'files/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  try {
    const uploadedFile = req.file;
    if (!uploadedFile) {
      return res.status(400).json({ status: 'error', error: 'No file uploaded' });
    }
    res.json({ status: 'succes', message: i18n.__('File uploaded successfully'), file: uploadedFile });
  } catch (error) {
    console.error('Error uploading file:', error.message);
    res.status(500).json({ status: 'error', error: i18n.__('Internal Server Error') });
  }
});

app.get('/getImage/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, 'files', imageName);
  console.log(imagePath);
  if (fileExists(imagePath)) {
    res.sendFile(imagePath);
  } else {
    res.sendFile('./files/placeholder.png');
  }
});

app.get('/getImage/', (req, res) => {
  const imageName = 'placeholder.png';
  const imagePath = path.join(__dirname, 'files', imageName);
  console.log(imagePath);
  if (fileExists(imagePath)) {
    res.sendFile(imagePath);
  } else {
    res.sendFile('./files/placeholder.png');
  }
});

function fileExists(filePath) {
  const fs = require('fs');
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
}

app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
