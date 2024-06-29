const FilestorageForUser = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "images/users"); // determine the photos place after user upload it
    },
    filename: function (req, file, cb) {
      cb(null, user-${req.user.id}-${Date.now()}.jpeg); //determine unique photo name
    },
  });
  
  const fileFilterForUser = (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  const uploadForUser = multer({
    storage: FilestorageForUser,
    fileFilter: fileFilterForUser,
  }).single("photo");
  exports.uploadUserPhoto = uploadForUser;