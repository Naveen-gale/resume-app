import { motion } from 'framer-motion';
import { Mail, Phone, ExternalLink, Briefcase, Pencil, Trash2 } from 'lucide-react';
import { getInitials } from '../../utils/helpers';

const ProfileCard = ({ profile, onEdit, onDelete, index = 0 }) => {
  const { fullName, email, phone, linkedin, yearsOfExperience, companyExperience } = profile;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -3, boxShadow: '0 12px 40px -8px rgba(0,0,0,0.1)' }}
      className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 relative overflow-hidden group"
    >
      {/* Top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-accent-500" />

      {/* Actions */}
      <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onEdit(profile)}
          className="p-2 rounded-lg text-slate-400 hover:text-primary-500 hover:bg-primary-50 transition-colors cursor-pointer"
        >
          <Pencil className="w-4 h-4" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onDelete(profile.id)}
          className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Avatar & Name */}
      <div className="flex items-center gap-4 mb-5">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm">
          {getInitials(fullName)}
        </div>
        <div>
          <h3 className="text-base font-semibold text-slate-900">{fullName}</h3>
          <div className="flex items-center gap-1.5 text-slate-500">
            <Briefcase className="w-3.5 h-3.5" />
            <span className="text-xs">{yearsOfExperience} yrs experience</span>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2.5 text-sm">
        <div className="flex items-center gap-2.5 text-slate-600">
          <Mail className="w-4 h-4 text-slate-400" />
          <span className="truncate">{email}</span>
        </div>
        <div className="flex items-center gap-2.5 text-slate-600">
          <Phone className="w-4 h-4 text-slate-400" />
          <span>{phone}</span>
        </div>
        <div className="flex items-center gap-2.5 text-slate-600">
          <ExternalLink className="w-4 h-4 text-slate-400" />
          <span className="truncate">{linkedin}</span>
        </div>
      </div>

      {/* Companies */}
      {companyExperience && companyExperience.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-100">
          <p className="text-xs font-medium text-slate-500 mb-2">Companies</p>
          <div className="flex flex-wrap gap-1.5">
            {companyExperience.map((exp) => (
              <span
                key={exp.id}
                className="px-2.5 py-1 text-xs font-medium rounded-full bg-slate-50 text-slate-600 border border-slate-100"
              >
                {exp.company}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProfileCard;
