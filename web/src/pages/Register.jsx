import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

const Register = () => {
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        // Mock register
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="bg-surface p-8 md:p-12 rounded-3xl shadow-lg w-full max-w-md border border-orange-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-primary mb-2">Buat Akun</h1>
                    <p className="text-gray-500">Gabung komunitas Rahasia Dapur sekarang.</p>
                </div>

                <form onSubmit={handleRegister} className="flex flex-col gap-6">
                    <Input label="Nama Lengkap" type="text" placeholder="Ibu Budi" />
                    <Input label="Email" type="email" placeholder="contoh@email.com" />
                    <Input label="Kata Sandi" type="password" placeholder="********" />
                    <Input label="Konfirmasi Kata Sandi" type="password" placeholder="********" />

                    <Button type="submit" className="w-full shadow-orange-200 shadow-lg mt-2">Daftar</Button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-500">
                    Sudah punya akun? <Link to="/login" className="text-primary font-bold hover:underline">Masuk disini</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
