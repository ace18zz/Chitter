import Peep from "../models/Peep.js";
import User from "../models/User.js";


export const createPeep = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPeep = new Peep({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPeep.save();

    const peep = await Peep.find();
    res.status(201).json(peep);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const getFeedPeeps = async (req, res) => {
  try {
    const peep = await Peep.find();
    res.status(200).json(peep);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPeeps = async (req, res) => {
  try {
    const { userId } = req.params;
    const peep = await Peep.find({ userId });
    res.status(200).json(peep);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


export const likePeep = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const peep = await Peep.findById(id);
    const isLiked = peep.likes.get(userId);

    if (isLiked) {
      peep.likes.delete(userId);
    } else {
      peep.likes.set(userId, true);
    }

    const updatedPeep = await Peep.findByIdAndUpdate(
      id,
      { likes: peep.likes },
      { new: true }
    );

    res.status(200).json(updatedPeep);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};