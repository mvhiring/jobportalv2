const db = require("../models");

// Calculate profile completion %
function calculateCompletion(profile) {
  let totalFields = 5;
  let filled = 0;

  if (profile.personal_info && Object.keys(profile.personal_info).length)
    filled++;
  if (profile.work_experience && profile.work_experience.length) filled++;
  if (profile.education && profile.education.length) filled++;
  if (profile.skills && profile.skills.length) filled++;
  if (profile.projects && profile.projects.length) filled++;

  return Math.round((filled / totalFields) * 100);
}

// Update Profile
exports.updateProfile = async (userId, data) => {
  try {
    let profile = await db.UserProfile.findOne({ where: { user_id: userId } });

    if (!profile) {
      profile = await db.UserProfile.create({ user_id: userId, ...data });
    } else {
      await profile.update(data);
    }

    return {
      ...profile.toJSON(),
      profile_completion: calculateCompletion(profile),
    };
  } catch (error) {
    throw new Error(error);
  }
};

// Get Profile by UserId
exports.getProfileById = async (userId) => {
  try {
    const profile = await db.UserProfile.findOne({
      where: { user_id: userId },
      include: [
        {
          model: db.User,
          as: "user",
          attributes: ["id", "first_name", "last_name", "email"],
        },
      ],
    });

    if (!profile) throw new Error("Profile not found");

    return {
      ...profile.toJSON(),
      profile_completion: calculateCompletion(profile),
    };
  } catch (error) {
    throw new Error(error);
  }
};
