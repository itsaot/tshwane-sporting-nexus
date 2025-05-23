const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (!['.png', '.jpg', '.jpeg', '.mp4'].includes(ext.toLowerCase())) {
      return cb(new Error('Only images and mp4 videos are allowed'));
    }
    cb(null, true);
  }
});

module.exports = upload;
// This code sets up a file upload middleware using multer in a Node.js application. It configures multer to store uploaded files in the 'uploads/' directory and names them with a timestamp followed by the original filename. The fileFilter function restricts uploads to specific file types: PNG, JPG, JPEG images, and MP4 videos. If a file with an unsupported extension is uploaded, an error is returned. The configured multer instance is then exported for use in other parts of the application, such as in route handlers for handling file uploads.
// This middleware can be used in routes to handle file uploads, ensuring that only valid files are accepted and stored correctly. The uploaded files can then be processed or served as needed in the application. The use of a timestamp in the filename helps prevent naming conflicts when multiple files with the same name are uploaded.