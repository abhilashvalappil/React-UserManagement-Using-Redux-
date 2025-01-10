const User = require('../models/User');
// const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// Get user profile
exports.profile = async (req, res) => {
    console.log("000000000",req.user);
    
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


exports.profileEdit = async (req, res) => {
    const { username, email } = req.body;
    let imageUrl = '';
    

    console.log(username, email, req.file,"wwwwwwwwwwwwwwwwwwwwwwwwwwwww");
    
    try {
      // If an image was uploaded
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        imageUrl = result.secure_url;
      }
  
      const user = await User.findById(req.user.id); // assuming user is authenticated
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      // Update the user data with the new details
      user.username = username || user.username;
      user.email = email || user.email;
      user.image = imageUrl || user.image;
  
      await user.save();
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  