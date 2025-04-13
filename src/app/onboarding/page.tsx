'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '../../../lib/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';


export default function Onboarding() {
    const [role, setRole] = useState('');
    const [formData, setFormData] = useState<any>({});
    const router = useRouter();

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    