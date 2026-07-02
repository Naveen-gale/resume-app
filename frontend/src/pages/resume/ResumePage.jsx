import { motion } from 'framer-motion';
import { Save, Download, FileText, Briefcase, GraduationCap, Award, Wrench } from 'lucide-react';
import PageWrapper from '../../components/layout/PageWrapper';
import ResumeGenerateForm from '../../components/forms/ResumeGenerateForm';
import Loader from '../../components/ui/Loader';
import Button from '../../components/ui/Button';
import FadeIn from '../../components/animations/FadeIn';
import { useAppContext } from '../../layouts/MainLayout';
import { downloadPDF } from '../../utils/helpers';

const ResumePage = () => {
  const {
    profiles,
    generatedResume,
    isGenerating,
    generateResume,
    saveResume,
    downloadResumePDF,
  } = useAppContext();

  const handleSave = async () => {
    if (generatedResume) {
      try {
        const saved = await saveResume(generatedResume);
        return saved;
      } catch (err) {
        console.error(err);
      }
    }
    return null;
  };

  const handleDownload = async () => {
    if (!generatedResume) return;
    
    try {
      let idToDownload = generatedResume.id || generatedResume._id;
      if (!idToDownload) {
        const saved = await handleSave();
        if (saved) {
          idToDownload = saved.id || saved._id;
        }
      }
      
      if (idToDownload && downloadResumePDF) {
        const blob = await downloadResumePDF(idToDownload);
        downloadPDF(blob, `Resume_${generatedResume.profileName.replace(/\s+/g, '_')}.pdf`);
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
              Generate Resume
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              Select a profile and paste the job description to generate a
              tailored resume.
            </p>
            <ResumeGenerateForm
              profiles={profiles}
              isGenerating={isGenerating}
              onGenerate={generateResume}
            />
          </div>
        </FadeIn>

        {/* Right Panel - Preview */}
        <FadeIn delay={0.2} className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            {/* Preview header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between no-print">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary-500" />
                <h3 className="text-sm font-semibold text-slate-900">
                  Resume Preview
                </h3>
              </div>
              {generatedResume && (
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
              {isGenerating ? (
                <Loader text="AI is crafting your perfect resume..." />
              ) : generatedResume ? (
                <ResumePreview resume={generatedResume} />
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mb-4">
                    <FileText className="w-8 h-8 text-primary-300" />
                  </div>
                  <p className="text-sm text-slate-400">
                    Your generated resume will appear here
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

const ResumePreview = ({ resume }) => {
  const content = resume.content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-8 pb-6 border-b-2 border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">
          {resume.profileName}
        </h1>
        <p className="text-primary-600 font-medium">{resume.jobTitle}</p>
        <div className="flex items-center justify-center gap-4 mt-3 text-xs text-slate-500">
          <span>arjun.mehta@email.com</span>
          <span>•</span>
          <span>+91 98765 43210</span>
          <span>•</span>
          <span>linkedin.com/in/arjunmehta</span>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Briefcase className="w-4 h-4 text-primary-500" />
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Professional Summary
          </h2>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">
          {content.summary}
        </p>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Wrench className="w-4 h-4 text-primary-500" />
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Technical Skills
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {content.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 text-xs font-medium rounded-full bg-primary-50 text-primary-700 border border-primary-100"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Briefcase className="w-4 h-4 text-primary-500" />
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Work Experience
          </h2>
        </div>
        <div className="space-y-5">
          {content.experience.map((exp, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-semibold text-slate-900">
                  {exp.role}
                </h3>
                <span className="text-xs text-slate-500">{exp.duration}</span>
              </div>
              <p className="text-sm font-medium text-primary-600 mb-2">
                {exp.company}
              </p>
              <ul className="space-y-1.5">
                {exp.bullets.map((bullet, bIdx) => (
                  <li
                    key={bIdx}
                    className="text-sm text-slate-700 leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0 mt-1.5" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <GraduationCap className="w-4 h-4 text-primary-500" />
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Education
          </h2>
        </div>
        <div className="space-y-2">
          {content.education.map((edu, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {edu.degree}
                </p>
                <p className="text-xs text-slate-500">{edu.institution}</p>
              </div>
              <span className="text-xs text-slate-500">{edu.year}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Award className="w-4 h-4 text-primary-500" />
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Certifications
          </h2>
        </div>
        <ul className="space-y-1.5">
          {content.certifications.map((cert, idx) => (
            <li
              key={idx}
              className="text-sm text-slate-700 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-400 flex-shrink-0" />
              {cert}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default ResumePage;
