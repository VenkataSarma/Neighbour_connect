import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[var(--accent)] flex items-center justify-center">
              <span className="text-white font-bold text-xl">NC</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-[var(--text)]">Neighbourhood Connect</h1>
          <p className="text-[var(--text-secondary)] mt-2">Find people. Share interests. Experience more.</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
