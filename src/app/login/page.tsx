import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
    const router = useRouter();

    type FormData = {
        email: string;
        password: string;
    };

    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, formData.email, formData.password);
            router.push("/");
        } catch (error) {
            console.log(error);
            alert("Login failed. Error: " + error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 ">
            <div className='bg-white p-8 rounded-2xl shadow-lg w-full max-w-md'>
                <h1 className='text-2xl font-semibold mb-6 text-gray-900 text-center'>Log in to your account</h1>

                
            </div>
        </div>
    )
    
    }

    
