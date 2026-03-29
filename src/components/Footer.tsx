import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link to="/" className="text-xl font-bold tracking-tight text-foreground">
              VAPOR<span className="text-primary">X</span>
            </Link>
            <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
              Premium vaping products for the discerning adult. Quality, innovation, and design.
            </p>
          </div>

          {[
            { title: 'Shop', links: [['All Products', '/shop'], ['Pods', '/shop?category=pods'], ['Kits', '/shop?category=kits']] },
            { title: 'Support', links: [['Contact', '#'], ['Shipping', '#'], ['Returns', '#']] },
            { title: 'Legal', links: [['Privacy Policy', '#'], ['Terms of Service', '#'], ['Age Policy', '#']] },
          ].map(section => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold text-foreground mb-4">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map(([label, href]) => (
                  <li key={label}>
                    <Link to={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Subscribe for exclusive drops</span>
          </div>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2.5 rounded-xl bg-secondary text-foreground text-sm placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-1 focus:ring-primary w-64"
            />
            <button className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold transition-all duration-200 hover:shadow-md hover:shadow-primary/25">
              Subscribe
            </button>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-muted-foreground/50">
          Must be 21+ to purchase. Products contain nicotine, an addictive chemical.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
