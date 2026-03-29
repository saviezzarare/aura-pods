import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, CreditCard, ArrowLeft, Check, AlertCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const steps = ['Shipping', 'Payment', 'Review'];

const Checkout = () => {
  const { items, totalPrice } = useCart();
  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState({ firstName: '', lastName: '', email: '', address: '', city: '', state: '', zip: '' });
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvc: '' });

  const formatCardNumber = (val: string) => val.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
  const formatExpiry = (val: string) => {
    const clean = val.replace(/\D/g, '');
    if (clean.length >= 2) return clean.slice(0, 2) + '/' + clean.slice(2, 4);
    return clean;
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Your cart is empty</h1>
          <Link to="/shop" className="text-primary hover:underline text-sm">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>

        {/* Steps */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                i <= step ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
              }`}>
                {i < step ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-sm font-medium hidden sm:inline ${i <= step ? 'text-foreground' : 'text-muted-foreground'}`}>{s}</span>
              {i < steps.length - 1 && <div className={`w-12 h-px ${i < step ? 'bg-primary' : 'bg-border'}`} />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-3"
          >
            {step === 0 && (
              <div className="glass rounded-2xl p-6 space-y-4">
                <h2 className="text-lg font-semibold text-foreground">Shipping Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input value={shipping.firstName} onChange={e => setShipping({...shipping, firstName: e.target.value})} placeholder="First Name" className="col-span-1 px-4 py-3 rounded-xl bg-secondary text-foreground text-sm border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                  <input value={shipping.lastName} onChange={e => setShipping({...shipping, lastName: e.target.value})} placeholder="Last Name" className="col-span-1 px-4 py-3 rounded-xl bg-secondary text-foreground text-sm border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <input value={shipping.email} onChange={e => setShipping({...shipping, email: e.target.value})} placeholder="Email" className="w-full px-4 py-3 rounded-xl bg-secondary text-foreground text-sm border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                <input value={shipping.address} onChange={e => setShipping({...shipping, address: e.target.value})} placeholder="Address" className="w-full px-4 py-3 rounded-xl bg-secondary text-foreground text-sm border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                <div className="grid grid-cols-3 gap-4">
                  <input value={shipping.city} onChange={e => setShipping({...shipping, city: e.target.value})} placeholder="City" className="px-4 py-3 rounded-xl bg-secondary text-foreground text-sm border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                  <input value={shipping.state} onChange={e => setShipping({...shipping, state: e.target.value})} placeholder="State" className="px-4 py-3 rounded-xl bg-secondary text-foreground text-sm border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                  <input value={shipping.zip} onChange={e => setShipping({...shipping, zip: e.target.value})} placeholder="ZIP" className="px-4 py-3 rounded-xl bg-secondary text-foreground text-sm border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <button onClick={() => setStep(1)} className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/25">
                  Continue to Payment
                </button>
              </div>
            )}

            {step === 1 && (
              <div className="glass rounded-2xl p-6 space-y-6">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" /> Payment Details
                </h2>
                {/* Interactive card preview */}
                <div className="relative w-full aspect-[1.6/1] max-w-sm mx-auto rounded-2xl bg-gradient-to-br from-primary/30 to-primary/5 border border-border p-6 flex flex-col justify-between overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
                  <div className="flex justify-between items-start relative">
                    <div className="w-10 h-7 rounded bg-foreground/20" />
                    <CreditCard className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="relative">
                    <p className="text-foreground font-mono text-lg tracking-widest mb-4">{card.number || '•••• •••• •••• ••••'}</p>
                    <div className="flex justify-between">
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase">Card Holder</p>
                        <p className="text-foreground text-sm font-medium">{card.name || 'Your Name'}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase">Expires</p>
                        <p className="text-foreground text-sm font-medium">{card.expiry || 'MM/YY'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <input value={card.number} onChange={e => setCard({...card, number: formatCardNumber(e.target.value)})} placeholder="Card Number" maxLength={19} className="w-full px-4 py-3 rounded-xl bg-secondary text-foreground text-sm border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary font-mono" />
                  <input value={card.name} onChange={e => setCard({...card, name: e.target.value})} placeholder="Cardholder Name" className="w-full px-4 py-3 rounded-xl bg-secondary text-foreground text-sm border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                  <div className="grid grid-cols-2 gap-4">
                    <input value={card.expiry} onChange={e => setCard({...card, expiry: formatExpiry(e.target.value)})} placeholder="MM/YY" maxLength={5} className="px-4 py-3 rounded-xl bg-secondary text-foreground text-sm border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary font-mono" />
                    <input value={card.cvc} onChange={e => setCard({...card, cvc: e.target.value.replace(/\D/g, '').slice(0, 3)})} placeholder="CVC" maxLength={3} className="px-4 py-3 rounded-xl bg-secondary text-foreground text-sm border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary font-mono" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(0)} className="px-6 py-3.5 rounded-xl bg-secondary text-secondary-foreground font-medium text-sm">Back</button>
                  <button onClick={() => setStep(2)} className="flex-1 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/25">
                    Review Order
                  </button>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Lock className="w-3.5 h-3.5" />
                  Secured with 256-bit SSL encryption
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="glass rounded-2xl p-6 space-y-6">
                <h2 className="text-lg font-semibold text-foreground">Review Your Order</h2>
                <div className="space-y-3">
                  {items.map(item => (
                    <div key={item.product.id} className="flex items-center gap-4 p-3 rounded-xl bg-secondary/30">
                      <img src={item.product.image} alt={item.product.name} className="w-14 h-14 rounded-lg object-cover" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold text-foreground">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="px-6 py-3.5 rounded-xl bg-secondary text-secondary-foreground font-medium text-sm">Back</button>
                  <button className="flex-1 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25">
                    <Lock className="w-4 h-4" /> Place Order — ${totalPrice.toFixed(2)}
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl p-6 space-y-4 sticky top-24">
              <h3 className="text-sm font-semibold text-foreground">Order Summary</h3>
              {items.map(item => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.product.name} x{item.quantity}</span>
                  <span className="text-foreground">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t border-border/50 pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-foreground">{totalPrice >= 50 ? 'Free' : '$5.99'}</span>
                </div>
                <div className="flex justify-between font-semibold text-foreground pt-2 border-t border-border/50">
                  <span>Total</span>
                  <span>${(totalPrice >= 50 ? totalPrice : totalPrice + 5.99).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
