const imagePath = path.join(
    __dirname,
    ../images/categories/${req.file.filename}
  );
  const uploadedImage = await cloudinaryUploadSingleImage(imagePath);

  const category = await categoryService.createCategory({
    name: req.body.name,
    photo: uploadedImage.secure_url,
  });