import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_APIKEY || ""
});

const RESUME_SYSTEM_PROMPT = `
You are an expert AI Resume Writer. You will be provided with a user's profile and a target job description. 
Your task is to generate a highly professional, tailored resume that highlights the user's relevant experience and skills for the job.

Return the response as a RAW JSON object with the following structure (do not wrap in markdown tags like \`\`\`json):
{
  "summary": "Professional summary paragraph tailored to the job.",
  "skills": ["Skill 1", "Skill 2"],
  "experience": [
    {
      "company": "Company Name",
      "role": "Job Title",
      "duration": "Duration (e.g., 2020 - Present)",
      "bullets": ["Achievement 1", "Achievement 2"]
    }
  ],
  "education": [
    {
      "degree": "Degree",
      "institution": "University Name",
      "year": "Graduation Year"
    }
  ],
  "certifications": ["Certification 1"]
}

Ensure the experience bullets are action-oriented and quantify achievements where possible based on the provided profile.
If the profile lacks certain details, make reasonable professional assumptions to create a complete resume structure.
`;

const COVER_LETTER_SYSTEM_PROMPT = `
You are an expert AI Cover Letter Writer. You will be provided with a user's profile and a target job description.
Your task is to write a compelling, professional cover letter tailored to the target job.

Return the response as a RAW JSON object with the following structure (do not wrap in markdown tags like \`\`\`json):
{
  "recipientName": "Hiring Manager",
  "paragraphs": [
    "Opening paragraph stating the position applied for and a strong hook.",
    "Body paragraph detailing relevant experience and why it makes the candidate a great fit.",
    "Closing paragraph expressing enthusiasm and a call to action."
  ],
  "closing": "Sincerely"
}
`;

export const generateResumeAI = async (profile, jobDescription) => {
  if (!process.env.GEMINI_APIKEY) {
    throw new Error("GEMINI_APIKEY is not configured.");
  }
  
  const prompt = `
Profile:
${JSON.stringify(profile, null, 2)}

Job Description:
${jobDescription}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: RESUME_SYSTEM_PROMPT,
        responseMimeType: "application/json",
      }
    });

    let responseText = response.text;
    responseText = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
    return JSON.parse(responseText);
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw new Error("Failed to generate resume with AI");
  }
};

export const generateCoverLetterAI = async (profile, jobDescription) => {
  if (!process.env.GEMINI_APIKEY) {
    throw new Error("GEMINI_APIKEY is not configured.");
  }
  
  const prompt = `
Profile:
${JSON.stringify(profile, null, 2)}

Job Description:
${jobDescription}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: COVER_LETTER_SYSTEM_PROMPT,
        responseMimeType: "application/json",
      }
    });

    let responseText = response.text;
    responseText = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
    return JSON.parse(responseText);
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw new Error("Failed to generate cover letter with AI");
  }
};