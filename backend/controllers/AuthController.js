

export const SignUp = async  (req, res) => {
  try {

    const  {  username, password, email, profilePicture } = req.body;
    if ( !username || !password || !email ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let cloudinary = null;

    if (profilePicture) {
      cloudinary = await cloudinary.uploader.upload(profilePicture, { folder: "fitness-app" });
    }

    
  } catch (error) {
    
  }
}