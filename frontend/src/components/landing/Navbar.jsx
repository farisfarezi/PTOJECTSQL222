import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-surface shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-montserrat font-bold text-xl">
            S
          </div>
          <span className={`font-montserrat font-bold text-xl tracking-tight ${isScrolled ? 'text-primary' : 'text-primary'}`}>
            SIPFAS
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#beranda" className={`font-medium hover:text-secondary transition-colors ${isScrolled ? 'text-text-main' : 'text-text-main'}`}>Beranda</a>
          <a href="#layanan" className={`font-medium hover:text-secondary transition-colors ${isScrolled ? 'text-text-main' : 'text-text-main'}`}>Layanan</a>
          <a href="#statistik" className={`font-medium hover:text-secondary transition-colors ${isScrolled ? 'text-text-main' : 'text-text-main'}`}>Statistik</a>
          
          <div className="flex gap-4 items-center border-l pl-8 border-border-subtle">
            <Link to="/login" className="font-bold text-primary hover:text-secondary transition-colors">
              Masuk
            </Link>
            <Link to="/register" className="bg-primary text-white px-5 py-2 rounded-soft font-bold shadow-md hover:shadow-lg hover:bg-primary-container transition-all transform hover:-translate-y-0.5">
              Daftar
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-primary" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-surface shadow-lg border-t border-border-subtle flex flex-col p-6 gap-4">
          <a href="#beranda" className="font-medium text-text-main hover:text-primary">Beranda</a>
          <a href="#layanan" className="font-medium text-text-main hover:text-primary">Layanan</a>
          <a href="#statistik" className="font-medium text-text-main hover:text-primary">Statistik</a>
          <hr className="border-border-subtle" />
          <Link to="/login" className="font-bold text-primary">Masuk</Link>
          <Link to="/register" className="bg-primary text-white text-center py-3 rounded-soft font-bold">Daftar Akun Baru</Link>
        </div>
      )}
    </nav>
  );
}
