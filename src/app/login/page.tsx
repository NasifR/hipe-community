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

    
    }

    
