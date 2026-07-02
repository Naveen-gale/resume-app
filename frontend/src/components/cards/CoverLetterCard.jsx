import { motion } from 'framer-motion';
import { Mail, Download, Eye, Trash2 } from 'lucide-react';
import { formatDate } from '../../utils/helpers';

const CoverLetterCard = ({ coverLetter, onView, onDownload, onDelete, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -3, boxShadow: '0 12px 40px -8px rgba(0,0,0,0.1)' }}
      className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 group"
    >
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 rounded-xl bg-accent-50 flex items-center justify-center flex-shrink-0">
          <Mail className="w-5 h-5 text-accent-500" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-slate-900 truncate">
            {coverLetter.jobTitle}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">{coverLetter.profileName}</p>
          {coverLetter.company && (
            <p className="text-xs text-slate-400 mt-0.5">at {coverLetter.company}</p>
          )}
          <p className="text-xs text-slate-400 mt-2">
            {formatDate(coverLetter.createdAt)}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
        {onView && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onView(coverLetter)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            View
          </motion.button>
        )}
        {onDownload && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDownload(coverLetter)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-accent-600 rounded-lg hover:bg-accent-50 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </motion.button>
        )}
        {onDelete && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete(coverLetter.id)}
            className="inline-flex items-center justify-center p-2 text-slate-400 rounded-lg hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default CoverLetterCard;
