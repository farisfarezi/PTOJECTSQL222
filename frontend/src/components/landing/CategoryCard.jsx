import { Monitor, Lightbulb, PenTool, Droplets } from 'lucide-react';

export default function CategoryCard() {
  const categories = [
    { id: 1, name: 'Elektronik & IT', icon: <Monitor size={32} />, desc: 'Komputer lab, proyektor, jaringan internet' },
    { id: 2, name: 'Kelistrikan', icon: <Lightbulb size={32} />, desc: 'Lampu mati, stop kontak rusak, AC bocor' },
    { id: 3, name: 'Infrastruktur', icon: <PenTool size={32} />, desc: 'Meja patah, pintu rusak, atap bocor' },
    { id: 4, name: 'Air & Sanitasi', icon: <Droplets size={32} />, desc: 'Keran rusak, toilet mampet, saluran air' },
  ];

  return (
    <section id="layanan" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <h2 className="text-headline-md font-montserrat font-bold text-primary mb-4">Kategori Pelaporan</h2>
        <p className="text-body-lg text-outline max-w-2xl mx-auto mb-16">
          Pilih kategori yang sesuai dengan kerusakan yang Anda temui agar laporan dapat ditangani oleh teknisi yang tepat.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map(cat => (
            <div key={cat.id} className="bg-surface p-8 rounded-card shadow-sm border border-border-subtle hover:shadow-lg hover:border-primary transition-all duration-300 transform hover:-translate-y-2 group cursor-default">
              <div className="w-16 h-16 bg-primary-container text-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:scale-110 transition-all">
                {cat.icon}
              </div>
              <h3 className="text-title-lg font-bold text-text-main mb-3">{cat.name}</h3>
              <p className="text-body-md text-on-surface-variant">{cat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
