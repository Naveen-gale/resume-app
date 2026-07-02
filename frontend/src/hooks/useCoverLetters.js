import { useState, useCallback, useEffect } from 'react';
import * as api from '../services/api';

export const useCoverLetters = () => {
  const [coverLetters, setCoverLetters] = useState([]);
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState(null);
  const [isGeneratingCoverLetter, setIsGeneratingCoverLetter] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCoverLetters = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await api.fetchCoverLetters();
      const formatted = data.map(c => ({...c, id: c._id, content: c.generatedCoverLetter}));
      setCoverLetters(formatted);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCoverLetters();
  }, [loadCoverLetters]);

  const generateCoverLetter = useCallback(async (profileId, jobDescription) => {
    setIsGeneratingCoverLetter(true);
    setGeneratedCoverLetter(null);
    setError(null);

    try {
      const result = await api.generateCoverLetter(profileId, jobDescription);
      // Auto-save the generated cover letter to the database
      const saved = await api.saveCoverLetter(result);
      const formatted = {...saved, id: saved._id, content: saved.generatedCoverLetter};
      
      setGeneratedCoverLetter(formatted);
      setCoverLetters((prev) => [formatted, ...prev]);
      
      return formatted;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsGeneratingCoverLetter(false);
    }
  }, []);

  const saveCoverLetter = useCallback(async (coverLetterData) => {
    try {
      const saved = await api.saveCoverLetter(coverLetterData);
      const formatted = {...saved, id: saved._id, content: saved.generatedCoverLetter};
      setCoverLetters((prev) => [formatted, ...prev]);
      return formatted;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const deleteCoverLetter = useCallback(async (id) => {
    try {
      await api.deleteCoverLetter(id);
      setCoverLetters((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const downloadCoverLetterPDF = useCallback(async (id) => {
    try {
      return await api.downloadCoverLetterPDF(id);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  return {
    coverLetters,
    generatedCoverLetter,
    isGeneratingCoverLetter,
    generateCoverLetter,
    saveCoverLetter,
    deleteCoverLetter,
    downloadCoverLetterPDF,
    setGeneratedCoverLetter,
    isLoading,
    error
  };
};
