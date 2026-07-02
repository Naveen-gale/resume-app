import CoverLetter from "../models/coverLetter.js";
import Profile from "../models/profile.js";
import { generateCoverLetterAI } from "../services/aiService.js";
import { buildCoverLetterPDF } from "../services/pdfService.js";

export const getAllCoverLetters = async (req, res) => {
  try {
    const coverLetters = await CoverLetter.find().sort({ createdAt: -1 });
    res.json(coverLetters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const generateCoverLetter = async (req, res) => {
  try {
    const { profileId, jobDescription } = req.body;
    
    if (!profileId || !jobDescription) {
      return res.status(400).json({ message: "Profile ID and Job Description are required" });
    }

    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const generatedContent = await generateCoverLetterAI(profile, jobDescription);
    
    const jobTitle = jobDescription.split('\n')[0]?.trim() || 'Target Role';
    const companyMatch = jobDescription.match(/(?:at|for|@)\s+([A-Z][a-zA-Z\s]+)/);
    const company = companyMatch ? companyMatch[1].trim() : 'Target Company';

    res.json({
      profileId: profile._id,
      profileName: profile.fullName,
      jobTitle,
      company,
      content: generatedContent
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const saveCoverLetter = async (req, res) => {
  try {
    const { profileId, profileName, jobTitle, company, content } = req.body;
    const coverLetter = new CoverLetter({
      profileId,
      profileName,
      jobTitle,
      company,
      generatedCoverLetter: content
    });
    const savedCoverLetter = await coverLetter.save();
    res.status(201).json(savedCoverLetter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCoverLetter = async (req, res) => {
  try {
    const coverLetter = await CoverLetter.findByIdAndDelete(req.params.id);
    if (!coverLetter) {
      return res.status(404).json({ message: "Cover letter not found" });
    }
    res.json({ message: "Cover letter deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const downloadCoverLetterPDF = async (req, res) => {
  try {
    const coverLetter = await CoverLetter.findById(req.params.id);
    if (!coverLetter) {
      return res.status(404).json({ message: "Cover letter not found" });
    }
    
    // Set headers are handled inside pdfService
    buildCoverLetterPDF(coverLetter, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
