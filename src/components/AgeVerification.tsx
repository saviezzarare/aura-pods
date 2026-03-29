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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/98 backdrop-blur-2xl"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-12 max-w-md w-full mx-6 text-center shadow-2xl shadow-black/30"
          >
            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 rounded-2xl bg-primary/15 flex items-center justify-center">
                <ShieldCheck className="w-10 h-10 text-primary" />
              </div>
            </div>
            
            {/* Content */}
            <h2 className="text-2xl font-bold text-foreground mb-3 tracking-tight">
              Verificação de Idade
            </h2>
            <p className="text-muted-foreground mb-10 text-sm leading-relaxed max-w-xs mx-auto">
              Você deve ter 18 anos ou mais para acessar este site. Ao clicar em "Tenho 18+", você confirma que atende ao requisito legal de idade.
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleVerify}
                className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]"
              >
                Tenho 18 anos ou mais
              </button>
              <button
                onClick={handleDecline}
                className="w-full py-4 rounded-xl bg-secondary/60 text-foreground font-medium text-sm transition-all duration-200 hover:bg-secondary border border-border/30"
              >
                Tenho menos de 18 anos
              </button>
            </div>
            
            {/* Footer note */}
            <p className="text-muted-foreground/50 text-xs mt-8 leading-relaxed">
              Este site é destinado apenas a adultos com idade legal para fumar.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AgeVerification;
