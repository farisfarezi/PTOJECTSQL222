export default function StatsSection() {
  const stats = [
    { label: 'Mahasiswa & Dosen Aktif', value: '4,500+' },
    { label: 'Fasilitas Terpantau', value: '120+' },
    { label: 'Rata-rata Penanganan', value: '< 24 Jam' },
    { label: 'Tingkat Kepuasan', value: '98%' },
  ];

  return (
    <section id="statistik" className="py-16 bg-surface border-y border-border-subtle">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border-subtle">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center text-center px-4">
              <span className="text-display-sm lg:text-display-md font-montserrat font-bold text-primary mb-2">
                {stat.value}
              </span>
              <span className="text-body-md text-on-surface-variant font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
