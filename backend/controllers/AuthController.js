import { generateToken } from "../helpers/Authentication.js";
import cloudinary from "../lib/cloudinary.js";
import User from "../model/UserModel.js";

export const SignUp = async  (req, res) => {
  try {

    const  {  username, password, email, profilePicture } = req.body;
    if ( !username || !password || !email ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
    }

    let  cloudinaryResponse = null

    if (profilePicture) {
      const uploadResponse = await cloudinary.uploader.upload(profilePicture)
      cloudinaryResponse = uploadResponse.secure_url;
    }

    const newUser = new User({
      username,
      password,
      email,
      profilePicture : cloudinaryResponse.secure_url || "",
    });



    const accessToken = generateToken(newUser._id);
    setCookies(res, accessToken);

    await newUser.save();

    res.status(201).json({ message: "User created successfully" , newUser});    
  } catch (error) {
    
  }
}



export const SignIn = async (req, res) => {
  try {
  
    const { email , password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ message: "INVALID CREDENTIALS - BOTH EMAIL AND PASSWORD IS INCORRECT" });
    }


    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(400).json({ message: "INVALID CREDENTIALS - BOTH EMAIL AND PASSWORD IS INCORRECT" });
    }
    
  } catch (error) {
     console.error("message happening in sign in function " , error)
     res.status(500).json({ message: error.message });
  }
}


