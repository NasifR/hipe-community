'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '../../../lib/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

type FormData = {
    role: string;
    academicLevel?: string;
    academicYear?: string;
    residenceCountry?: string;
    interestCountry?: string;
    areaOfStudy?: string;
    interests?: string[];
    workExperiences?: string;
    department?: string;
    title?: string;
    supportAreas?: string[];
    facultyExperience?: string;
    currentProjects?: string;
    organizationType?: string;
    opportunitiesOffered?: string[];
    targetAudience?: string;
    regions?: string;
    mission?: string;
    website?: string;
  };
  
  const interestOptions = [
    'research',
    'study abroad',
    'internships',
    'scholarships',
    'exchange programs',
  ];
  
  const supportOptions = [
    'Mentorship',
    'Research',
    'Internships',
    'Study Abroad',
    'Scholarships',
    'Exchange Programs',
  ];
  
  const opportunityOptions = [
    'Internships',
    'Scholarships',
    'Research Projects',
    'Study Abroad Programs',
    'Exchange Opportunities',
  ];
  
  const audienceOptions = [
    'High School Students',
    'Undergraduates',
    'Graduates',
    'All',
  ];