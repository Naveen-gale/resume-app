import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import { generateId } from '../../utils/helpers';

const emptyExperience = () => ({
  id: generateId('exp'),
  company: '',
  role: '',
  duration: '',
  description: '',
});

const emptyEducation = () => ({
  id: generateId('edu'),
  degree: '',
  institution: '',
  year: '',
});

const ProfileForm = ({ initialData, onSubmit, onCancel }) => {
  const [form, setForm] = useState(
    initialData || {
      fullName: '',
      email: '',
      phone: '',
      linkedin: '',
      yearsOfExperience: '',
      companyExperience: [emptyExperience()],
      education: [emptyEducation()],
    }
  );

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const addExperience = () => {
    setForm((prev) => ({
      ...prev,
      companyExperience: [...prev.companyExperience, emptyExperience()],
    }));
  };

  const removeExperience = (id) => {
    setForm((prev) => ({
      ...prev,
      companyExperience: prev.companyExperience.filter((e) => e.id !== id),
    }));
  };

  const updateExperience = (id, field, value) => {
    setForm((prev) => ({
      ...prev,
      companyExperience: prev.companyExperience.map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      ),
    }));
  };

  const addEducation = () => {
    setForm((prev) => ({
      ...prev,
      education: [...prev.education, emptyEducation()],
    }));
  };

  const removeEducation = (id) => {
    setForm((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id),
    }));
  };

  const updateEducation = (id, field, value) => {
    setForm((prev) => ({
      ...prev,
      education: prev.education.map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      ),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      yearsOfExperience: Number(form.yearsOfExperience) || 0,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Info */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            id="fullName"
            label="Full Name"
            placeholder="John Doe"
            value={form.fullName}
            onChange={(e) => updateField('fullName', e.target.value)}
            required
          />
          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={(e) => updateField('email', e.target.value)}
            required
          />
          <Input
            id="phone"
            label="Phone Number"
            placeholder="+91 98765 43210"
            value={form.phone}
            onChange={(e) => updateField('phone', e.target.value)}
          />
          <Input
            id="linkedin"
            label="LinkedIn"
            placeholder="linkedin.com/in/username"
            value={form.linkedin}
            onChange={(e) => updateField('linkedin', e.target.value)}
          />
          <Input
            id="experience"
            label="Years of Experience"
            type="number"
            placeholder="5"
            min="0"
            value={form.yearsOfExperience}
            onChange={(e) => updateField('yearsOfExperience', e.target.value)}
          />
        </div>
      </div>

      {/* Company Experience */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">
            Work Experience
          </h3>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            icon={Plus}
            onClick={addExperience}
          >
            Add
          </Button>
        </div>

        {form.companyExperience.map((exp, idx) => (
          <div
            key={exp.id}
            className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                Experience #{idx + 1}
              </span>
              {form.companyExperience.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeExperience(exp.id)}
                  className="p-1 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                id={`company-${exp.id}`}
                placeholder="Company"
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
              />
              <Input
                id={`role-${exp.id}`}
                placeholder="Role"
                value={exp.role}
                onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
              />
              <Input
                id={`duration-${exp.id}`}
                placeholder="2020 – Present"
                value={exp.duration}
                onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
              />
            </div>
            <Textarea
              id={`desc-${exp.id}`}
              placeholder="Describe your responsibilities and achievements..."
              value={exp.description}
              onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
              rows={3}
            />
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">
            Education
          </h3>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            icon={Plus}
            onClick={addEducation}
          >
            Add
          </Button>
        </div>

        {form.education.map((edu, idx) => (
          <div
            key={edu.id}
            className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                Education #{idx + 1}
              </span>
              {form.education.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEducation(edu.id)}
                  className="p-1 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Input
                id={`degree-${edu.id}`}
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
              />
              <Input
                id={`institution-${edu.id}`}
                placeholder="Institution"
                value={edu.institution}
                onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
              />
              <Input
                id={`year-${edu.id}`}
                placeholder="Year"
                value={edu.year}
                onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">
          {initialData ? 'Update Profile' : 'Create Profile'}
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
