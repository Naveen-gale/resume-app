import { useState, useCallback, useEffect } from 'react';
import * as api from '../services/api';

export const useCoverLetters = () => {
  const [coverLetters, setCoverLetters] = useState([]);
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
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
    setIsGenerating(true);
    setGeneratedCoverLetter(null);
    setError(null);

    try {
      const result = await api.generateCoverLetter(profileId, jobDescription);
      setGeneratedCoverLetter(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsGenerating(false);
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
      setCoverLetters((prev) => prev.filter((cl) => cl.id !== id));
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
    isGenerating,
    generateCoverLetter,
    saveCoverLetter,
    deleteCoverLetter,
    downloadCoverLetterPDF,
    setGeneratedCoverLetter,
    isLoading,
    error
  };
};
