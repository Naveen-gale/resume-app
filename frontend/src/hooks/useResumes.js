import { useState, useCallback, useEffect } from 'react';
import * as api from '../services/api';

export const useResumes = () => {
  const [resumes, setResumes] = useState([]);
  const [generatedResume, setGeneratedResume] = useState(null);
  const [isGeneratingResume, setIsGeneratingResume] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadResumes = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await api.fetchResumes();
      const formatted = data.map(r => ({...r, id: r._id, content: r.generatedResume}));
      setResumes(formatted);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadResumes();
  }, [loadResumes]);

  const generateResume = useCallback(async (profileId, jobDescription) => {
    setIsGeneratingResume(true);
    setGeneratedResume(null);
    setError(null);

    try {
      const result = await api.generateResume(profileId, jobDescription);
      // Auto-save the generated resume to the database
      const saved = await api.saveResume(result);
      const formatted = {...saved, id: saved._id, content: saved.generatedResume};
      
      setGeneratedResume(formatted);
      setResumes((prev) => [formatted, ...prev]);
      
      return formatted;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsGeneratingResume(false);
    }
  }, []);

  const saveResume = useCallback(async (resumeData) => {
    try {
      // resumeData from generateResume already has the correct structure mostly, but we might need to map it
      const saved = await api.saveResume(resumeData);
      const formatted = {...saved, id: saved._id, content: saved.generatedResume};
      setResumes((prev) => [formatted, ...prev]);
      return formatted;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const deleteResume = useCallback(async (id) => {
    try {
      await api.deleteResume(id);
      setResumes((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const downloadResumePDF = useCallback(async (id) => {
    try {
      return await api.downloadResumePDF(id);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  return {
    resumes,
    generatedResume,
    isGeneratingResume,
    generateResume,
    saveResume,
    deleteResume,
    downloadResumePDF,
    setGeneratedResume,
    isLoading,
    error
  };
};
