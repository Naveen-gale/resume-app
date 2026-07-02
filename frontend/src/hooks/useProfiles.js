import { useState, useCallback, useEffect } from 'react';
import * as api from '../services/api';

export const useProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProfiles = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await api.fetchProfiles();
      // Ensure backend returns data in the expected shape (e.g., _id mapped to id if needed)
      // For simplicity, we just use the data as is, but we might want to map _id to id
      const formattedProfiles = data.map(p => ({...p, id: p._id}));
      setProfiles(formattedProfiles);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfiles();
  }, [loadProfiles]);

  const addProfile = useCallback(async (profileData) => {
    try {
      const newProfile = await api.createProfile(profileData);
      setProfiles((prev) => [{...newProfile, id: newProfile._id}, ...prev]);
      return newProfile;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const updateProfile = useCallback(async (id, profileData) => {
    try {
      const updatedProfile = await api.updateProfile(id, profileData);
      setProfiles((prev) =>
        prev.map((p) => (p.id === id ? {...updatedProfile, id: updatedProfile._id} : p))
      );
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const deleteProfile = useCallback(async (id) => {
    try {
      await api.deleteProfile(id);
      setProfiles((prev) => prev.filter((p) => p.id !== id));
      if (selectedProfile?.id === id) {
        setSelectedProfile(null);
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [selectedProfile]);

  const getProfileById = useCallback(
    (id) => profiles.find((p) => p.id === id),
    [profiles]
  );

  return {
    profiles,
    selectedProfile,
    setSelectedProfile,
    addProfile,
    updateProfile,
    deleteProfile,
    getProfileById,
    isLoading,
    error
  };
};
