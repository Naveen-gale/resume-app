import Profile from "../models/profile.js";
import Resume from "../models/resume.js";
import CoverLetter from "../models/coverLetter.js";

export const getHistoryByProfileId = async (req, res) => {
  try {
    const { profileId } = req.params;

    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const resumes = await Resume.find({ profileId }).sort({ createdAt: -1 });
    const coverLetters = await CoverLetter.find({ profileId }).sort({ createdAt: -1 });

    res.json({
      profile,
      resumes,
      coverLetters
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
