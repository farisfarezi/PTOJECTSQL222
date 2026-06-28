import { Outlet } from 'react-router-dom';
import UserSidebar from '../components/user/UserSidebar';
import UserTopbar from '../components/user/UserTopbar';

export default function UserLayout() {
  return (
    <div className="flex h-screen bg-background">
      <UserSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <UserTopbar />
        <main className="flex-1 overflow-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
