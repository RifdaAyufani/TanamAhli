import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-5 h-5 text-primary" />
              <span className="text-lg font-bold text-foreground">Tanamahli</span>
            </div>
            <p className="text-sm text-foreground/60">
              Membantu kamu merawat tanaman dengan cinta dan perhatian.
            </p>
          </div>

          {/* Links Column 1 */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Perusahaan</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/tentang-kami"
                  className="text-sm text-foreground/60 hover:text-primary transition-colors"
                >
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  to="/kontak"
                  className="text-sm text-foreground/60 hover:text-primary transition-colors"
                >
                  Kontak
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-sm text-foreground/60 hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Layanan</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/klinik"
                  className="text-sm text-foreground/60 hover:text-primary transition-colors"
                >
                  Klinik Tanaman
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="text-sm text-foreground/60 hover:text-primary transition-colors"
                >
                  Shop
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-foreground/60 hover:text-primary transition-colors"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-foreground/60 hover:text-primary transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-foreground/60 hover:text-primary transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-foreground/60">
            © {currentYear} Tanamahli. Semua hak dilindungi.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
              Instagram
            </a>
            <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
              Twitter
            </a>
            <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
