import multer from "multer";

const storge = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/public/tmp");
  },
  filename: function (req, file, cb) {
    cb(null, file.orignalName);
  },
});

export const upload = multer({ storge });
