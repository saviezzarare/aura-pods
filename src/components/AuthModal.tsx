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
  const strengthLabel = ['', 'Fraca', 'Regular', 'Boa', 'Forte'][strength] || '';
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
      setError('A senha deve ter pelo menos 8 caracteres');
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

  const inputClasses = "w-full pl-11 pr-4 py-4 rounded-xl bg-secondary/50 text-foreground text-sm border border-border/50 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-200";

  return (
    <AnimatePresence>
      {showAuthModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-background/90 backdrop-blur-xl px-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-card/90 backdrop-blur-xl border border-border/50 rounded-3xl p-8 max-w-md w-full relative shadow-2xl shadow-black/30"
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={handleClose} 
              className="absolute top-5 right-5 p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-200 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Auth message */}
            {authModalMessage && view === 'login' && (
              <div className="mb-6 p-4 rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm flex items-center gap-3">
                <Lock className="w-5 h-5 flex-shrink-0" />
                <span>{authModalMessage}</span>
              </div>
            )}

            <AnimatePresence mode="wait">
              {/* Login View */}
              {view === 'login' && (
                <motion.form 
                  key="login" 
                  initial={{ opacity: 0, x: -20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: 20 }} 
                  onSubmit={handleLogin} 
                  className="space-y-5"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-foreground">Bem-vindo de volta</h2>
                    <p className="text-muted-foreground text-sm mt-2">Entre na sua conta</p>
                  </div>

                  {error && (
                    <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input 
                      type="email" 
                      value={email} 
                      onChange={e => setEmail(e.target.value)} 
                      placeholder="Seu e-mail" 
                      required 
                      className={inputClasses} 
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      value={password} 
                      onChange={e => setPassword(e.target.value)} 
                      placeholder="Sua senha" 
                      required 
                      className={`${inputClasses} pr-12`} 
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)} 
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="flex justify-end">
                    <button 
                      type="button" 
                      onClick={() => { setError(''); setView('forgot'); }} 
                      className="text-xs text-primary hover:underline"
                    >
                      Esqueceu a senha?
                    </button>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading} 
                    className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    ) : (
                      <>Entrar <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>

                  <p className="text-center text-sm text-muted-foreground pt-2">
                    Não tem uma conta?{' '}
                    <button 
                      type="button" 
                      onClick={() => { setError(''); setView('signup'); }} 
                      className="text-primary font-medium hover:underline"
                    >
                      Criar conta
                    </button>
                  </p>
                </motion.form>
              )}

              {/* Signup View */}
              {view === 'signup' && (
                <motion.form 
                  key="signup" 
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: -20 }} 
                  onSubmit={handleSignup} 
                  className="space-y-5"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-foreground">Criar Conta</h2>
                    <p className="text-muted-foreground text-sm mt-2">Junte-se à Storm Pods</p>
                  </div>

                  {error && (
                    <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input 
                      type="text" 
                      value={fullName} 
                      onChange={e => setFullName(e.target.value)} 
                      placeholder="Nome completo" 
                      required 
                      className={inputClasses} 
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input 
                      type="email" 
                      value={email} 
                      onChange={e => setEmail(e.target.value)} 
                      placeholder="Seu e-mail" 
                      required 
                      className={inputClasses} 
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input 
                        type={showPassword ? 'text' : 'password'} 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        placeholder="Senha (mín. 8 caracteres)" 
                        required 
                        minLength={8} 
                        className={`${inputClasses} pr-12`} 
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)} 
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    
                    {/* Password strength indicator */}
                    {password && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }} 
                        className="space-y-2"
                      >
                        <div className="flex gap-1.5">
                          {[1, 2, 3, 4].map(i => (
                            <div 
                              key={i} 
                              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColor : 'bg-border'}`} 
                            />
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground">Força: {strengthLabel}</p>
                      </motion.div>
                    )}
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading} 
                    className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    ) : (
                      <>Criar Conta <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>

                  <p className="text-center text-sm text-muted-foreground pt-2">
                    Já tem uma conta?{' '}
                    <button 
                      type="button" 
                      onClick={() => { setError(''); setView('login'); }} 
                      className="text-primary font-medium hover:underline"
                    >
                      Entrar
                    </button>
                  </p>
                </motion.form>
              )}

              {/* Forgot Password View */}
              {view === 'forgot' && (
                <motion.form 
                  key="forgot" 
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: -20 }} 
                  onSubmit={handleForgot} 
                  className="space-y-5"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-foreground">Recuperar Senha</h2>
                    <p className="text-muted-foreground text-sm mt-2">Enviaremos um link de recuperação</p>
                  </div>

                  {error && (
                    <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input 
                      type="email" 
                      value={email} 
                      onChange={e => setEmail(e.target.value)} 
                      placeholder="Seu e-mail" 
                      required 
                      className={inputClasses} 
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading} 
                    className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    ) : (
                      <>Enviar Link <Mail className="w-4 h-4" /></>
                    )}
                  </button>

                  <p className="text-center text-sm text-muted-foreground pt-2">
                    <button 
                      type="button" 
                      onClick={() => { setError(''); setView('login'); }} 
                      className="text-primary font-medium hover:underline"
                    >
                      Voltar ao login
                    </button>
                  </p>
                </motion.form>
              )}

              {/* Check Email View */}
              {view === 'check-email' && (
                <motion.div 
                  key="check" 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  className="text-center space-y-5 py-6"
                >
                  <div className="w-20 h-20 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto">
                    <Check className="w-10 h-10 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Verifique seu E-mail</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                    {signupSuccess
                      ? "Enviamos um link de verificação para seu e-mail. Por favor, confirme seu endereço antes de fazer login."
                      : "Enviamos um link de recuperação para seu e-mail. Verifique sua caixa de entrada."}
                  </p>
                  <button 
                    onClick={() => { resetForm(); setView('login'); }} 
                    className="text-primary text-sm font-medium hover:underline"
                  >
                    Voltar ao login
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
