import { motion } from 'framer-motion';
import { Save, Download, Mail as MailIcon } from 'lucide-react';
import PageWrapper from '../../components/layout/PageWrapper';
import CoverLetterGenerateForm from '../../components/forms/CoverLetterGenerateForm';
import Loader from '../../components/ui/Loader';
import Button from '../../components/ui/Button';
import FadeIn from '../../components/animations/FadeIn';
import { useAppContext } from '../../layouts/MainLayout';
import { downloadPDF } from '../../utils/helpers';

const CoverLetterPage = () => {
  const {
    profiles,
    generatedCoverLetter,
    isGeneratingCoverLetter,
    generateCoverLetter,
    saveCoverLetter,
    downloadCoverLetterPDF,
  } = useAppContext();


  const handleSave = async () => {
    if (generatedCoverLetter) {
      try {
        const saved = await saveCoverLetter(generatedCoverLetter);
        return saved;
      } catch (err) {
        console.error(err);
      }
    }
    return null;
  };

  const handleDownload = async () => {
    if (!generatedCoverLetter) return;
    
    try {
      let idToDownload = generatedCoverLetter.id || generatedCoverLetter._id;
      if (!idToDownload) {
        const saved = await handleSave();
        if (saved) {
          idToDownload = saved.id || saved._id;
        }
      }
      
      if (idToDownload && downloadCoverLetterPDF) {
        const blob = await downloadCoverLetterPDF(idToDownload);
        downloadPDF(blob, `CoverLetter_${generatedCoverLetter.profileName.replace(/\s+/g, '_')}.pdf`);
      } else {
        downloadPDF();
      }
    } catch (error) {
      console.error("Download failed:", error);
      downloadPDF(); // Fallback
    }
  };

  return (
    <PageWrapper>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Panel - Form */}
        <FadeIn className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-1">
              Generate Cover Letter
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              Select a profile and paste the job description to craft a
              compelling cover letter.
            </p>
            <CoverLetterGenerateForm
              profiles={profiles}
              isGenerating={isGeneratingCoverLetter}
              onGenerate={generateCoverLetter}
            />
          </div>
        </FadeIn>

        {/* Right Panel - Preview */}
        <FadeIn delay={0.2} className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            {/* Preview header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between no-print">
              <div className="flex items-center gap-2">
                <MailIcon className="w-5 h-5 text-accent-500" />
                <h3 className="text-sm font-semibold text-slate-900">
                  Cover Letter Preview
                </h3>
              </div>
              {generatedCoverLetter && (
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={Save}
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                  <Button size="sm" icon={Download} onClick={handleDownload}>
                    Download PDF
                  </Button>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-8 min-h-[600px]">
              {isGeneratingCoverLetter ? (
                <Loader text="AI is crafting your perfect cover letter..." />
              ) : generatedCoverLetter ? (
                <CoverLetterPreview coverLetter={generatedCoverLetter} />
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-accent-50 flex items-center justify-center mb-4">
                    <MailIcon className="w-8 h-8 text-accent-300" />
                  </div>
                  <p className="text-sm text-slate-400">
                    Your generated cover letter will appear here
                  </p>
                </div>
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </PageWrapper>
  );
};

const CoverLetterPreview = ({ coverLetter }) => {
  const content = coverLetter.content;
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto"
    >
      {/* Date */}
      <p className="text-sm text-slate-500 mb-6">{today}</p>

      {/* Recipient */}
      <div className="mb-6">
        <p className="text-sm text-slate-700">Dear {content.recipientName},</p>
      </div>

      {/* Body Paragraphs */}
      <div className="space-y-4 mb-8">
        {content.paragraphs.map((paragraph, idx) => (
          <motion.p
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
            className="text-sm text-slate-700 leading-relaxed"
          >
            {paragraph}
          </motion.p>
        ))}
      </div>

      {/* Closing */}
      <div className="mt-8">
        <p className="text-sm text-slate-700">{content.closing},</p>
        <p className="text-sm font-semibold text-slate-900 mt-4">
          {coverLetter.profileName}
        </p>
      </div>
    </motion.div>
  );
};

export default CoverLetterPage;
