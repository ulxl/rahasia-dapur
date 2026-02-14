import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Mock login
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="bg-surface p-8 md:p-12 rounded-3xl shadow-lg w-full max-w-md border border-orange-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-primary mb-2">Selamat Datang!</h1>
                    <p className="text-gray-500">Masuk untuk mulai belajar memasak.</p>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col gap-6">
                    <Input label="Email" type="email" placeholder="contoh@email.com" />
                    <Input label="Kata Sandi" type="password" placeholder="********" />

                    <div className="flex justify-end">
                        <Link to="/forgot-password" className="text-sm text-primary font-semibold hover:underline">Lupa kata sandi?</Link>
                    </div>

                    <Button type="submit" className="w-full shadow-orange-200 shadow-lg">Masuk</Button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-500">
                    Belum punya akun? <Link to="/register" className="text-primary font-bold hover:underline">Daftar sekarang</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
