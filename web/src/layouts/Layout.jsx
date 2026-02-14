import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Home, User, Search, LogOut } from 'lucide-react';
import Button from '../components/Button';
import logo from '../assets/logo.png';

const Layout = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background pb-20 md:pb-0">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center justify-between px-8 py-4 bg-surface shadow-sm sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <img src={logo} alt="Rahasia Dapur" className="w-10 h-10 object-contain" />
                    <h1 className="text-xl font-bold text-primary">Rahasia Dapur</h1>
                </div>
                <div className="flex items-center gap-8 font-medium">
                    <NavLink to="/" className={({ isActive }) => isActive ? "text-primary" : "text-text hover:text-primary transition-colors"}>Beranda</NavLink>
                    <NavLink to="/recipes" className={({ isActive }) => isActive ? "text-primary" : "text-text hover:text-primary transition-colors"}>Resep</NavLink>
                    <NavLink to="/saved" className={({ isActive }) => isActive ? "text-primary" : "text-text hover:text-primary transition-colors"}>Disimpan</NavLink>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input type="text" placeholder="Cari resep..." className="pl-10 pr-4 py-2 rounded-full bg-background border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm w-64" />
                    </div>
                    {/* Temporary Logout for demo */}
                    <Button variant="ghost" className="!p-2 text-red-500 hover:bg-red-50" onClick={() => navigate('/login')}>
                        <LogOut size={20} />
                    </Button>
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-primary font-bold cursor-pointer">
                        <User size={20} />
                    </div>
                </div>
            </nav>

            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between px-4 py-3 bg-surface shadow-sm sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <img src={logo} alt="Rahasia Dapur" className="w-8 h-8 object-contain" />
                    <h1 className="text-lg font-bold text-primary">Rahasia Dapur</h1>
                </div>
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-primary font-bold">
                    <User size={18} />
                </div>
            </div>

            <main className="max-w-7xl mx-auto p-4 md:p-8">
                <Outlet />
            </main>

            {/* Mobile Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-gray-100 px-6 py-3 md:hidden flex justify-between items-center z-50 rounded-t-2xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <NavLink to="/" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? "text-primary" : "text-gray-400"}`}>
                    <Home size={24} />
                    <span className="text-[10px] font-medium">Beranda</span>
                </NavLink>
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white -mt-8 shadow-lg shadow-orange-200 ring-4 ring-white">
                    <Search size={24} />
                </div>
                <NavLink to="/profile" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? "text-primary" : "text-gray-400"}`}>
                    <User size={24} />
                    <span className="text-[10px] font-medium">Akun</span>
                </NavLink>
            </div>
        </div>
    );
};

export default Layout;
