import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // If you need credentials (cookies) sent cross-origin:
  // withCredentials: true,
});

// Centralized error handling
const handleResponse = (response) => response.data;

const handleError = (error) => {
  if (error.response) {
    throw new Error(error.response.data.message || "An error occurred on the server");
  } else if (error.request) {
    throw new Error("No response received from the server");
  } else {
    throw new Error(error.message || "An error occurred");
  }
};

// Profiles API
export const fetchProfiles = async () => {
  try {
    const res = await apiClient.get("/profile");
    return handleResponse(res);
  } catch (error) {
    handleError(error);
  }
};

export const createProfile = async (profileData) => {
  try {
    const res = await apiClient.post("/profile", profileData);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
  }
};

export const updateProfile = async (id, profileData) => {
  try {
    const res = await apiClient.put(`/profile/${id}`, profileData);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
  }
};

export const deleteProfile = async (id) => {
  try {
    const res = await apiClient.delete(`/profile/${id}`);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
  }
};

// Resumes API
export const fetchResumes = async () => {
  try {
    const res = await apiClient.get("/resume");
    return handleResponse(res);
  } catch (error) {
    handleError(error);
  }
};

export const generateResume = async (profileId, jobDescription) => {
  try {
    const res = await apiClient.post("/resume/generate", {
      profileId,
      jobDescription,
    });
    return handleResponse(res);
  } catch (error) {
    handleError(error);
  }
};

export const saveResume = async (resumeData) => {
  try {
    const res = await apiClient.post("/resume", resumeData);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
  }
};

export const deleteResume = async (id) => {
  try {
    const res = await apiClient.delete(`/resume/${id}`);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
  }
};

export const downloadResumePDF = async (id) => {
  try {
    const res = await apiClient.get(`/resume/${id}/pdf`, { responseType: 'blob' });
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

// Cover Letters API
export const fetchCoverLetters = async () => {
  try {
    const res = await apiClient.get("/coverLetter");
    return handleResponse(res);
  } catch (error) {
    handleError(error);
  }
};

export const generateCoverLetter = async (profileId, jobDescription) => {
  try {
    const res = await apiClient.post("/coverLetter/generate", {
      profileId,
      jobDescription,
    });
    return handleResponse(res);
  } catch (error) {
    handleError(error);
  }
};

export const saveCoverLetter = async (coverLetterData) => {
  try {
    const res = await apiClient.post("/coverLetter", coverLetterData);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
  }
};

export const deleteCoverLetter = async (id) => {
  try {
    const res = await apiClient.delete(`/coverLetter/${id}`);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
  }
};

export const downloadCoverLetterPDF = async (id) => {
  try {
    const res = await apiClient.get(`/coverLetter/${id}/pdf`, { responseType: 'blob' });
    return res.data;
  } catch (error) {
    handleError(error);
  }
};
