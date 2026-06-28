import { CheckCircle2 } from 'lucide-react';

export default function MissionSection() {
  const steps = [
    { num: '01', title: 'Foto & Laporkan', desc: 'Mahasiswa, dosen, atau staf mengisi form pengaduan beserta foto bukti kerusakan fasilitas.' },
    { num: '02', title: 'Verifikasi Admin', desc: 'Admin menerima, mengecek validitas, dan meneruskan laporan ke teknisi yang sesuai.' },
    { num: '03', title: 'Pengerjaan Teknisi', desc: 'Teknisi menangani kerusakan di lapangan dan mengunggah foto bukti perbaikan setelah selesai.' },
    { num: '04', title: 'Laporan Selesai', desc: 'Pelapor mendapat notifikasi dan dapat melihat status laporan berubah menjadi "Selesai".' },
  ];

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Kiri: Teks Visi */}
          <div>
            <span className="inline-block text-sm font-bold text-secondary bg-secondary bg-opacity-10 px-4 py-1 rounded-full mb-4">Cara Kerja Sistem</span>
            <h2 className="text-headline-md font-montserrat font-bold text-primary mb-6 leading-tight">
              Transparan, Responsif, <br/> dan Terstruktur
            </h2>
            <p className="text-body-lg text-on-surface-variant mb-8">
              Setiap laporan yang masuk melalui SIPFAS akan ditangani melalui alur yang jelas dan terverifikasi, sehingga tidak ada laporan yang terabaikan.
            </p>
            <div className="flex flex-col gap-3">
              {['Tidak perlu antre lapor ke TU', 'Status dapat dipantau kapan saja', 'Bukti perbaikan terdokumentasi'].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-status-completed flex-shrink-0" />
                  <span className="text-body-md font-medium text-text-main">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Kanan: Timeline Steps */}
          <div className="relative flex flex-col gap-0">
            <div className="absolute left-7 top-10 bottom-10 w-0.5 bg-border-subtle"></div>
            {steps.map((step, idx) => (
              <div key={idx} className="flex gap-6 items-start pb-10 last:pb-0 relative">
                <div className="relative z-10 flex-shrink-0 w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white font-montserrat font-bold text-sm shadow-lg">
                  {step.num}
                </div>
                <div className="pt-2">
                  <h4 className="text-title-lg font-bold text-text-main mb-1">{step.title}</h4>
                  <p className="text-body-md text-on-surface-variant">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
