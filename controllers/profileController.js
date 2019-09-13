const User = require('../models/User')
const Profile = require('../models/Profile')

exports.showProfile = async (req, res) => {
  const user = await User.findById(req.user.id).populate('profile')

  res.render('profile', user)
}

exports.updateProfile = async (req, res) => {
  const {name} = req.body
  const {url: img} = req.file
  const {profile: profileId} = await User.findById(req.user.id)
  await Profile.findByIdAndUpdate(profileId, {name, img})
  res.redirect('/profile')
}
