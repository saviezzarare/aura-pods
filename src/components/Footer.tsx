import { Link } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-1">
              <span className="text-lg font-semibold tracking-tight text-foreground">STORM</span>
              <span className="text-lg font-semibold tracking-tight text-muted-foreground">PODS</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Produtos premium de vaping para o adulto exigente.
            </p>
          </div>

          {/* Links */}
          {[
            { title: 'Loja', links: [['Todos os Produtos', '/shop'], ['Pods', '/shop?category=pods'], ['Kits', '/shop?category=kits']] },
            { title: 'Suporte', links: [['Contato', '#'], ['Envio', '#'], ['Devolucoes', '#']] },
            { title: 'Legal', links: [['Privacidade', '#'], ['Termos de Uso', '#'], ['Politica de Idade', '#']] },
          ].map(section => (
            <div key={section.title}>
              <h4 className="text-xs font-semibold text-foreground mb-4 uppercase tracking-widest">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map(([label, href]) => (
                  <li key={label}>
                    <Link 
                      to={href} 
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary border border-border flex items-center justify-center">
              <Mail className="w-4 h-4 text-foreground" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Newsletter</p>
              <p className="text-xs text-muted-foreground">Receba ofertas exclusivas</p>
            </div>
          </div>
          
          <div className="flex gap-2 w-full lg:w-auto">
            <input
              type="email"
              placeholder="Seu e-mail"
              className="flex-1 lg:w-64 px-4 py-2.5 rounded-lg bg-secondary text-foreground text-sm placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-all duration-200"
            />
            <button className="px-4 py-2.5 rounded-lg bg-foreground text-background text-sm font-medium flex items-center gap-2 transition-all duration-200 hover:opacity-90 active:scale-[0.98]">
              <span className="hidden sm:inline">Inscrever</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            Deve ter 18+ anos para comprar. Produtos contem nicotina, uma substancia viciante.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
