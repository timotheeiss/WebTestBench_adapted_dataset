import { useAppStore } from '@/store/appStore';
import { AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Toast() {
  const { toast, hideToast } = useAppStore();

  const icons = {
    info: <Info size={18} className="text-primary" />,
    warning: <AlertTriangle size={18} className="text-yellow-400" />,
    error: <AlertCircle size={18} className="text-destructive" />
  };

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-4 right-4 bg-popover border border-border px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-3 max-w-sm"
        >
          {icons[toast.type]}
          <span
            data-semtag-id="app.toast"
            data-semtag-role="observable"
            data-semtag-state="toast.message"
            className="text-sm text-foreground"
          >
            {toast.message}
          </span>
          <button
            data-semtag-id="app.toast.dismiss"
            data-semtag-role="action"
            data-semtag-action="dismiss-toast"
            onClick={hideToast}
            className="ml-2 p-1 rounded hover:bg-secondary transition-colors"
          >
            <X size={14} className="text-muted-foreground" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
