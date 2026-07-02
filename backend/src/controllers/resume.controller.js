import Resume from "../models/resume.js";
import Profile from "../models/profile.js";
import { generateResumeAI } from "../services/aiService.js";
import { buildResumePDF } from "../services/pdfService.js";

export const getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const generateResume = async (req, res) => {
  try {
    const { profileId, jobDescription } = req.body;
    
    if (!profileId || !jobDescription) {
      return res.status(400).json({ message: "Profile ID and Job Description are required" });
    }

    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const generatedContent = await generateResumeAI(profile, jobDescription);
    
    // Extract job title and company from JD if possible
    const jobTitle = jobDescription.split('\n')[0]?.trim() || 'Target Role';
    const companyMatch = jobDescription.match(/(?:at|for|@)\s+([A-Z][a-zA-Z\s]+)/);
    const company = companyMatch ? companyMatch[1].trim() : 'Target Company';

    res.json({
      profileId: profile._id,
      profileName: profile.fullName,
      jobTitle,
      company,
      jobDescription,
      content: generatedContent
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const saveResume = async (req, res) => {
  try {
    const { profileId, profileName, jobTitle, company, jobDescription, content } = req.body;
    const savedResume = await Resume.create({
      profileId,
      profileName,
      jobTitle,
      company,
      jobDescription,
      generatedResume: content
    });
    res.status(201).json(savedResume);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findByIdAndDelete(req.params.id);
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    res.json({ message: "Resume deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const downloadResumePDF = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    
    // Set headers are handled inside pdfService
    buildResumePDF(resume, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
