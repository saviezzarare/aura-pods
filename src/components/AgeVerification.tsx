import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

const AgeVerification = () => {
  const [verified, setVerified] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const isVerified = sessionStorage.getItem('age-verified');
    if (isVerified) {
      setVerified(true);
    } else {
      setShow(true);
    }
  }, []);

  const handleVerify = () => {
    sessionStorage.setItem('age-verified', 'true');
    setVerified(true);
    setShow(false);
  };

  const handleDecline = () => {
    window.location.href = 'https://www.google.com';
  };

  if (verified) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 30 }}
            className="glass-strong rounded-2xl p-10 max-w-md w-full mx-4 text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Age Verification</h2>
            <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
              You must be 21 years of age or older to enter this website. By clicking "I am 21+", you confirm that you meet the legal age requirement.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleVerify}
                className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98]"
              >
                I am 21 or older
              </button>
              <button
                onClick={handleDecline}
                className="w-full py-3.5 rounded-xl bg-secondary text-secondary-foreground font-medium text-sm transition-all duration-200 hover:bg-secondary/80"
              >
                I am under 21
              </button>
            </div>
            <p className="text-muted-foreground/60 text-xs mt-6">
              This website is intended for adults of legal smoking age only.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AgeVerification;
