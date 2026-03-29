import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, CreditCard, ArrowLeft, Check, AlertCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const steps = ['Envio', 'Pagamento', 'Revisao'];

const Checkout = () => {
  const { items, totalPrice } = useCart();
  const { user, isEmailVerified, setShowAuthModal, setAuthModalMessage } = useAuth();
  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState({ firstName: '', lastName: '', email: '', address: '', city: '', state: '', zip: '' });
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvc: '' });

  const formatCardNumber = (val: string) => val.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
  const formatExpiry = (val: string) => {
    const clean = val.replace(/\D/g, '');
    if (clean.length >= 2) return clean.slice(0, 2) + '/' + clean.slice(2, 4);
    return clean;
  };

  // Not signed in state
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 bg-black px-4">
        <div className="bg-neutral-950 border border-neutral-900 rounded-lg p-8 max-w-md w-full text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6 text-white" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-xl font-medium text-white mb-2">Login Necessario</h2>
            <p className="text-neutral-500 text-sm">Voce precisa estar logado para finalizar a compra.</p>
          </div>
          <button 
            onClick={() => { setAuthModalMessage('Entre para finalizar sua compra'); setShowAuthModal(true); }} 
            className="px-8 py-3 bg-white text-black font-medium text-sm rounded transition-all hover:bg-neutral-200"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  // Email not verified state
  if (!isEmailVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 bg-black px-4">
        <div className="bg-neutral-950 border border-neutral-900 rounded-lg p-8 max-w-md w-full text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center mx-auto">
            <Mail className="w-6 h-6 text-white" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-xl font-medium text-white mb-2">Verifique seu Email</h2>
            <p className="text-neutral-500 text-sm">Confirme seu email antes de realizar uma compra. Verifique sua caixa de entrada.</p>
          </div>
          <Link 
            to="/shop" 
            className="inline-block px-8 py-3 bg-neutral-900 text-white font-medium text-sm rounded transition-all hover:bg-neutral-800"
          >
            Continuar Navegando
          </Link>
        </div>
      </div>
    );
  }

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 bg-black">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-white mb-4">Seu carrinho esta vazio</h1>
          <Link to="/shop" className="text-neutral-500 hover:text-white transition-colors text-sm">
            Continuar Comprando
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-24 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link 
          to="/shop" 
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" strokeWidth={1.5} />
          Voltar para a Loja
        </Link>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                i <= step 
                  ? 'bg-white text-black' 
                  : 'bg-neutral-900 text-neutral-500 border border-neutral-800'
              }`}>
                {i < step ? <Check className="w-4 h-4" strokeWidth={2} /> : i + 1}
              </div>
              <span className={`text-sm font-medium hidden sm:inline transition-colors ${
                i <= step ? 'text-white' : 'text-neutral-600'
              }`}>
                {s}
              </span>
              {i < steps.length - 1 && (
                <div className={`w-12 h-px transition-colors ${i < step ? 'bg-white' : 'bg-neutral-800'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form Section */}
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-3"
          >
            {/* Step 0: Shipping */}
            {step === 0 && (
              <div className="bg-neutral-950 border border-neutral-900 rounded-lg p-6 space-y-5">
                <h2 className="text-lg font-medium text-white">Informacoes de Envio</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    value={shipping.firstName} 
                    onChange={e => setShipping({...shipping, firstName: e.target.value})} 
                    placeholder="Nome" 
                    className="px-4 py-3.5 bg-black border border-neutral-800 rounded-lg text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-neutral-700 transition-colors" 
                  />
                  <input 
                    value={shipping.lastName} 
                    onChange={e => setShipping({...shipping, lastName: e.target.value})} 
                    placeholder="Sobrenome" 
                    className="px-4 py-3.5 bg-black border border-neutral-800 rounded-lg text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-neutral-700 transition-colors" 
                  />
                </div>
                
                <input 
                  value={shipping.email} 
                  onChange={e => setShipping({...shipping, email: e.target.value})} 
                  placeholder="Email" 
                  className="w-full px-4 py-3.5 bg-black border border-neutral-800 rounded-lg text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-neutral-700 transition-colors" 
                />
                
                <input 
                  value={shipping.address} 
                  onChange={e => setShipping({...shipping, address: e.target.value})} 
                  placeholder="Endereco" 
                  className="w-full px-4 py-3.5 bg-black border border-neutral-800 rounded-lg text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-neutral-700 transition-colors" 
                />
                
                <div className="grid grid-cols-3 gap-4">
                  <input 
                    value={shipping.city} 
                    onChange={e => setShipping({...shipping, city: e.target.value})} 
                    placeholder="Cidade" 
                    className="px-4 py-3.5 bg-black border border-neutral-800 rounded-lg text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-neutral-700 transition-colors" 
                  />
                  <input 
                    value={shipping.state} 
                    onChange={e => setShipping({...shipping, state: e.target.value})} 
                    placeholder="Estado" 
                    className="px-4 py-3.5 bg-black border border-neutral-800 rounded-lg text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-neutral-700 transition-colors" 
                  />
                  <input 
                    value={shipping.zip} 
                    onChange={e => setShipping({...shipping, zip: e.target.value})} 
                    placeholder="CEP" 
                    className="px-4 py-3.5 bg-black border border-neutral-800 rounded-lg text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-neutral-700 transition-colors" 
                  />
                </div>
                
                <button 
                  onClick={() => setStep(1)} 
                  className="w-full py-3.5 bg-white text-black font-medium text-sm rounded-lg transition-all duration-200 hover:bg-neutral-200"
                >
                  Continuar para Pagamento
                </button>
              </div>
            )}

            {/* Step 1: Payment */}
            {step === 1 && (
              <div className="bg-neutral-950 border border-neutral-900 rounded-lg p-6 space-y-6">
                <h2 className="text-lg font-medium text-white flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-neutral-400" strokeWidth={1.5} />
                  Dados do Cartao
                </h2>
                
                {/* Card Preview */}
                <div className="relative w-full aspect-[1.6/1] max-w-sm mx-auto bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-xl p-6 flex flex-col justify-between overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
                  <div className="flex justify-between items-start relative">
                    <div className="w-10 h-7 rounded bg-neutral-700" />
                    <CreditCard className="w-5 h-5 text-neutral-500" strokeWidth={1.5} />
                  </div>
                  <div className="relative">
                    <p className="text-white font-mono text-lg tracking-widest mb-4">
                      {card.number || '•••• •••• •••• ••••'}
                    </p>
                    <div className="flex justify-between">
                      <div>
                        <p className="text-[10px] text-neutral-600 uppercase tracking-wider">Titular</p>
                        <p className="text-white text-sm font-medium">{card.name || 'Seu Nome'}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-neutral-600 uppercase tracking-wider">Validade</p>
                        <p className="text-white text-sm font-medium">{card.expiry || 'MM/AA'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Inputs */}
                <div className="space-y-4">
                  <input 
                    value={card.number} 
                    onChange={e => setCard({...card, number: formatCardNumber(e.target.value)})} 
                    placeholder="Numero do Cartao" 
                    maxLength={19} 
                    className="w-full px-4 py-3.5 bg-black border border-neutral-800 rounded-lg text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-neutral-700 font-mono transition-colors" 
                  />
                  <input 
                    value={card.name} 
                    onChange={e => setCard({...card, name: e.target.value})} 
                    placeholder="Nome no Cartao" 
                    className="w-full px-4 py-3.5 bg-black border border-neutral-800 rounded-lg text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-neutral-700 transition-colors" 
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      value={card.expiry} 
                      onChange={e => setCard({...card, expiry: formatExpiry(e.target.value)})} 
                      placeholder="MM/AA" 
                      maxLength={5} 
                      className="px-4 py-3.5 bg-black border border-neutral-800 rounded-lg text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-neutral-700 font-mono transition-colors" 
                    />
                    <input 
                      value={card.cvc} 
                      onChange={e => setCard({...card, cvc: e.target.value.replace(/\D/g, '').slice(0, 3)})} 
                      placeholder="CVC" 
                      maxLength={3} 
                      className="px-4 py-3.5 bg-black border border-neutral-800 rounded-lg text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-neutral-700 font-mono transition-colors" 
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button 
                    onClick={() => setStep(0)} 
                    className="px-6 py-3.5 bg-neutral-900 text-white font-medium text-sm rounded-lg transition-colors hover:bg-neutral-800"
                  >
                    Voltar
                  </button>
                  <button 
                    onClick={() => setStep(2)} 
                    className="flex-1 py-3.5 bg-white text-black font-medium text-sm rounded-lg transition-all duration-200 hover:bg-neutral-200"
                  >
                    Revisar Pedido
                  </button>
                </div>

                {/* Security Note */}
                <div className="flex items-center justify-center gap-2 text-xs text-neutral-600">
                  <Lock className="w-3.5 h-3.5" strokeWidth={1.5} />
                  Protegido com criptografia SSL de 256 bits
                </div>
              </div>
            )}

            {/* Step 2: Review */}
            {step === 2 && (
              <div className="bg-neutral-950 border border-neutral-900 rounded-lg p-6 space-y-6">
                <h2 className="text-lg font-medium text-white">Revisar Pedido</h2>
                
                <div className="space-y-3">
                  {items.map(item => (
                    <div key={item.product.id} className="flex items-center gap-4 p-4 bg-black rounded-lg border border-neutral-900">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-16 h-16 rounded-lg object-cover" 
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">{item.product.name}</p>
                        <p className="text-xs text-neutral-500">Qtd: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium text-white">
                        R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button 
                    onClick={() => setStep(1)} 
                    className="px-6 py-3.5 bg-neutral-900 text-white font-medium text-sm rounded-lg transition-colors hover:bg-neutral-800"
                  >
                    Voltar
                  </button>
                  <button 
                    className="flex-1 py-3.5 bg-white text-black font-medium text-sm flex items-center justify-center gap-2 rounded-lg transition-all duration-200 hover:bg-neutral-200"
                  >
                    <Lock className="w-4 h-4" strokeWidth={1.5} />
                    Finalizar Pedido — R$ {totalPrice.toFixed(2).replace('.', ',')}
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-2">
            <div className="bg-neutral-950 border border-neutral-900 rounded-lg p-6 space-y-4 sticky top-24">
              <h3 className="text-sm font-medium text-white uppercase tracking-wider">
                Resumo do Pedido
              </h3>
              
              <div className="space-y-3 pb-4 border-b border-neutral-800">
                {items.map(item => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-neutral-500">{item.product.name} x{item.quantity}</span>
                    <span className="text-white">R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Subtotal</span>
                  <span className="text-white">R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Frete</span>
                  <span className="text-white">{totalPrice >= 150 ? 'Gratis' : 'R$ 19,90'}</span>
                </div>
              </div>
              
              <div className="flex justify-between font-medium text-white pt-4 border-t border-neutral-800">
                <span>Total</span>
                <span>R$ {(totalPrice >= 150 ? totalPrice : totalPrice + 19.90).toFixed(2).replace('.', ',')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
