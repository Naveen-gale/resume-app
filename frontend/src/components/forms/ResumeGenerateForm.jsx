import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import Select from '../ui/Select';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';

const ResumeGenerateForm = ({ profiles, isGenerating, onGenerate }) => {
  const [selectedProfileId, setSelectedProfileId] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  const profileOptions = profiles.map((p) => ({
    value: p.id,
    label: p.fullName,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedProfileId || !jobDescription.trim()) return;

    const profile = profiles.find((p) => p.id === selectedProfileId);
    onGenerate(profile.id, jobDescription);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Select
        id="resume-profile"
        label="Select Profile"
        placeholder="Choose a profile..."
        options={profileOptions}
        value={selectedProfileId}
        onChange={(e) => setSelectedProfileId(e.target.value)}
      />

      <Textarea
        id="resume-jd"
        label="Job Description"
        placeholder="Paste the job description here... Include the job title, company name, requirements, and responsibilities."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        rows={8}
        maxLength={3000}
      />

      <Button
        type="submit"
        size="lg"
        icon={Sparkles}
        isLoading={isGenerating}
        disabled={!selectedProfileId || !jobDescription.trim()}
        className="w-full"
      >
        {isGenerating ? 'Generating Resume...' : 'Generate Resume with AI'}
      </Button>
    </form>
  );
};

export default ResumeGenerateForm;
