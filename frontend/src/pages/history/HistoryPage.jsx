import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Mail, Download, Clock, ChevronRight } from 'lucide-react';
import PageWrapper from '../../components/layout/PageWrapper';
import FadeIn from '../../components/animations/FadeIn';
import Button from '../../components/ui/Button';
import Loader from '../../components/ui/Loader';
import { useAppContext } from '../../layouts/MainLayout';
import * as api from '../../services/api';
import { downloadPDF } from '../../utils/helpers';

const HistoryPage = () => {
  const { profiles, selectedProfile, setSelectedProfile } = useAppContext();
  const [historyData, setHistoryData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!selectedProfile) {
        setHistoryData(null);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const data = await api.getHistoryByProfileId(selectedProfile.id || selectedProfile._id);
        setHistoryData(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch history');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [selectedProfile]);

  const handleDownloadResume = async (resume) => {
    try {
      const blob = await api.downloadResumePDF(resume._id || resume.id);
      downloadPDF(blob, `Resume_${resume.profileName.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error("Failed to download resume:", error);
    }
  };

  const handleDownloadCoverLetter = async (coverLetter) => {
    try {
      const blob = await api.downloadCoverLetterPDF(coverLetter._id || coverLetter.id);
      downloadPDF(blob, `CoverLetter_${coverLetter.profileName.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error("Failed to download cover letter:", error);
    }
  };

  return (
    <PageWrapper>
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header & Profile Selector */}
        <FadeIn>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
                <Clock className="w-6 h-6 text-primary-500" />
                Document History
              </h1>
              <p className="text-sm text-slate-500">
                View previously generated resumes and cover letters.
              </p>
            </div>
            
            <div className="w-full md:w-64">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Select Profile
              </label>
              <select
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition-all"
                value={selectedProfile?.id || ''}
                onChange={(e) => {
                  const profile = profiles.find((p) => p.id === e.target.value);
                  setSelectedProfile(profile);
                }}
              >
                <option value="" disabled>
                  -- Select a profile --
                </option>
                {profiles.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.fullName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </FadeIn>

        {/* Content */}
        {!selectedProfile ? (
          <FadeIn delay={0.1}>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-1">No Profile Selected</h3>
              <p className="text-slate-500 text-sm">Please select a profile above to view its history.</p>
            </div>
          </FadeIn>
        ) : isLoading ? (
          <div className="py-20">
            <Loader text="Loading history..." />
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100">
            {error}
          </div>
        ) : historyData ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Resumes List */}
            <FadeIn delay={0.1}>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
                  <FileText className="w-5 h-5 text-primary-500" />
                  <h2 className="font-semibold text-slate-900">Resumes</h2>
                  <span className="ml-auto bg-primary-100 text-primary-700 text-xs font-bold px-2 py-0.5 rounded-full">
                    {historyData.resumes.length}
                  </span>
                </div>
                
                <div className="p-4 flex-1">
                  {historyData.resumes.length === 0 ? (
                    <div className="text-center py-12 text-slate-500 text-sm">
                      No resumes generated yet.
                    </div>
                  ) : (
                    <ul className="space-y-3">
                      {historyData.resumes.map((resume) => (
                        <li key={resume._id} className="group p-4 rounded-xl border border-slate-100 hover:border-primary-200 hover:bg-primary-50/50 transition-all">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-slate-900 text-sm">{resume.jobTitle}</h3>
                              <p className="text-xs text-slate-500">{resume.company || 'Target Company'}</p>
                            </div>
                            <Button
                              variant="secondary"
                              size="sm"
                              icon={Download}
                              onClick={() => handleDownloadResume(resume)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              PDF
                            </Button>
                          </div>
                          <div className="text-xs text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(resume.createdAt).toLocaleDateString()}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </FadeIn>

            {/* Cover Letters List */}
            <FadeIn delay={0.2}>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
                  <Mail className="w-5 h-5 text-accent-500" />
                  <h2 className="font-semibold text-slate-900">Cover Letters</h2>
                  <span className="ml-auto bg-accent-100 text-accent-700 text-xs font-bold px-2 py-0.5 rounded-full">
                    {historyData.coverLetters.length}
                  </span>
                </div>
                
                <div className="p-4 flex-1">
                  {historyData.coverLetters.length === 0 ? (
                    <div className="text-center py-12 text-slate-500 text-sm">
                      No cover letters generated yet.
                    </div>
                  ) : (
                    <ul className="space-y-3">
                      {historyData.coverLetters.map((cl) => (
                        <li key={cl._id} className="group p-4 rounded-xl border border-slate-100 hover:border-accent-200 hover:bg-accent-50/50 transition-all">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-slate-900 text-sm">{cl.jobTitle}</h3>
                              <p className="text-xs text-slate-500">{cl.company || 'Target Company'}</p>
                            </div>
                            <Button
                              variant="secondary"
                              size="sm"
                              icon={Download}
                              onClick={() => handleDownloadCoverLetter(cl)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              PDF
                            </Button>
                          </div>
                          <div className="text-xs text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(cl.createdAt).toLocaleDateString()}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </FadeIn>

          </div>
        ) : null}

      </div>
    </PageWrapper>
  );
};

export default HistoryPage;
