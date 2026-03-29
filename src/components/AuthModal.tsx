import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Eye, EyeOff, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

type AuthView = 'login' | 'signup' | 'forgot' | 'check-email';

const AuthModal = () => {
  const { showAuthModal, setShowAuthModal, signIn, signUp, resetPassword, authModalMessage } = useAuth();
  const [view, setView] = useState<AuthView>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const passwordStrength = (pw: string) => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  };

  const strength = passwordStrength(password);
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength] || '';
  const strengthColor = ['', 'bg-destructive', 'bg-yellow-500', 'bg-primary', 'bg-green-500'][strength] || '';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      setError(error);
    } else {
      setShowAuthModal(false);
      resetForm();
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    setLoading(true);
    const { error } = await signUp(email, password, fullName);
    setLoading(false);
    if (error) {
      setError(error);
    } else {
      setSignupSuccess(true);
      setView('check-email');
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await resetPassword(email);
    setLoading(false);
    if (error) {
      setError(error);
    } else {
      setView('check-email');
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFullName('');
    setError('');
    setSignupSuccess(false);
    setView('login');
  };

  const handleClose = () => {
    setShowAuthModal(false);
    resetForm();
  };

  return (
    <AnimatePresence>
      {showAuthModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-background/80 backdrop-blur-xl px-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="glass-strong rounded-2xl p-8 max-w-md w-full relative"
            onClick={e => e.stopPropagation()}
          >
            <button onClick={handleClose} className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg">
              <X className="w-5 h-5" />
            </button>

            {authModalMessage && view === 'login' && (
              <div className="mb-4 p-3 rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm flex items-center gap-2">
                <Lock className="w-4 h-4 flex-shrink-0" />
                {authModalMessage}
              </div>
            )}

            <AnimatePresence mode="wait">
              {view === 'login' && (
                <motion.form key="login" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} onSubmit={handleLogin} className="space-y-5">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>
                    <p className="text-muted-foreground text-sm mt-1">Sign in to your account</p>
                  </div>

                  {error && (
                    <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {error}
                    </div>
                  )}

                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" required className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-secondary text-foreground text-sm border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all" />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required className="w-full pl-10 pr-12 py-3.5 rounded-xl bg-secondary text-foreground text-sm border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="flex justify-end">
                    <button type="button" onClick={() => { setError(''); setView('forgot'); }} className="text-xs text-primary hover:underline">Forgot password?</button>
                  </div>

                  <button type="submit" disabled={loading} className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50">
                    {loading ? <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> : <>Sign In <ArrowRight className="w-4 h-4" /></>}
                  </button>

                  <p className="text-center text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <button type="button" onClick={() => { setError(''); setView('signup'); }} className="text-primary font-medium hover:underline">Create one</button>
                  </p>
                </motion.form>
              )}

              {view === 'signup' && (
                <motion.form key="signup" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleSignup} className="space-y-5">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-foreground">Create Account</h2>
                    <p className="text-muted-foreground text-sm mt-1">Join VaporX today</p>
                  </div>

                  {error && (
                    <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {error}
                    </div>
                  )}

                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Full name" required className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-secondary text-foreground text-sm border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all" />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" required className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-secondary text-foreground text-sm border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all" />
                  </div>

                  <div className="space-y-2">
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Password (min 8 chars)" required minLength={8} className="w-full pl-10 pr-12 py-3.5 rounded-xl bg-secondary text-foreground text-sm border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {password && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-1.5">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4].map(i => (
                            <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= strength ? strengthColor : 'bg-border'}`} />
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground">{strengthLabel}</p>
                      </motion.div>
                    )}
                  </div>

                  <button type="submit" disabled={loading} className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50">
                    {loading ? <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> : <>Create Account <ArrowRight className="w-4 h-4" /></>}
                  </button>

                  <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <button type="button" onClick={() => { setError(''); setView('login'); }} className="text-primary font-medium hover:underline">Sign in</button>
                  </p>
                </motion.form>
              )}

              {view === 'forgot' && (
                <motion.form key="forgot" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleForgot} className="space-y-5">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-foreground">Reset Password</h2>
                    <p className="text-muted-foreground text-sm mt-1">We'll send you a reset link</p>
                  </div>

                  {error && (
                    <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {error}
                    </div>
                  )}

                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" required className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-secondary text-foreground text-sm border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all" />
                  </div>

                  <button type="submit" disabled={loading} className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50">
                    {loading ? <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> : <>Send Reset Link <Mail className="w-4 h-4" /></>}
                  </button>

                  <p className="text-center text-sm text-muted-foreground">
                    <button type="button" onClick={() => { setError(''); setView('login'); }} className="text-primary font-medium hover:underline">Back to login</button>
                  </p>
                </motion.form>
              )}

              {view === 'check-email' && (
                <motion.div key="check" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-4 py-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Check Your Email</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {signupSuccess
                      ? "We've sent a verification link to your email. Please confirm your email address before signing in."
                      : "We've sent a password reset link to your email. Check your inbox and follow the instructions."}
                  </p>
                  <button onClick={() => { resetForm(); setView('login'); }} className="text-primary text-sm font-medium hover:underline">
                    Back to login
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
