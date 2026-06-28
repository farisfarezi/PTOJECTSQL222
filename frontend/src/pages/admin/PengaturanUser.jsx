import { useState, useEffect } from 'react';
import { userService } from '../../services/userService';
import { Loader2, Shield } from 'lucide-react';
import SelectField from '../../components/common/SelectField';

export default function PengaturanUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const data = await userService.getAll();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (id, newRole) => {
    try {
      await userService.updateRole(id, newRole);
      fetchUsers();
    } catch (err) {
      alert('Gagal update role: ' + err.message);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-headline-md font-montserrat font-bold text-primary">Manajemen Pengguna</h1>
        <p className="text-body-md text-outline mt-1">Atur hak akses dan role pengguna sistem.</p>
      </div>

      <div className="bg-surface rounded-card border border-border-subtle shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 flex justify-center"><Loader2 size={32} className="animate-spin text-primary" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-background text-outline text-sm border-b border-border-subtle">
                <tr>
                  <th className="px-6 py-4 font-bold">Pengguna</th>
                  <th className="px-6 py-4 font-bold">Identitas (NIM/NIP)</th>
                  <th className="px-6 py-4 font-bold w-48">Role Sistem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-background transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-text-main">{u.nama}</p>
                      <p className="text-sm text-outline">{u.email}</p>
                    </td>
                    <td className="px-6 py-4 text-outline">{u.identitas || '-'}</td>
                    <td className="px-6 py-4">
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        className="w-full bg-transparent border border-outline rounded p-2 text-sm font-bold text-text-main focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                      >
                        <option value="mahasiswa">Mahasiswa</option>
                        <option value="dosen">Dosen</option>
                        <option value="teknisi">Teknisi</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
