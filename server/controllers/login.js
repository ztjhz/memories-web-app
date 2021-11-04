import bcrypt from 'bcrypt';

import User from '../models/loginDetails.js';

export const login = async (req, res) => {
  const data = req.body;
  if (!data.username || !data.password) {
    return res.status(400).send({ error: 'Data not formatted properly' });
  }
  try {
    const user = (await User.find({ username: data.username }))[0];
    if (!user) {
      return res.status(200).json(false);
    }

    // check password
    // hash password
    const validPassword = await bcrypt.compare(data.password, user.password);
    if (validPassword) {
      res.status(200).json(true);
    } else {
      res.status(200).json(false);
    }
  } catch (error) {
    console.log(error);
  }
};
