'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '../../../lib/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import SelectableButtons from '@/components/SelectableButtons';



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

export default function Onboarding() {
  const [formData, setFormData] = useState<FormData>({
    role: '',
    interests: [],
    supportAreas: [],
    opportunitiesOffered: [],
  });

  const [userId, setUserId] = useState('');
  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/signup');
      } else {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists() && userDoc.data().role) {
          router.push('/'); // already onboarded
        }
      }
    });

    return () => unsubscribe();
  }, [router]);

  const updateField = (key: keyof FormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!user) return;

    try {
      await updateDoc(doc(db, 'users', user.uid), {
        ...formData,
        role: formData.role,
        updatedAt: new Date(),
      });

      router.push('/');
    } catch (error) {
      console.error(error);
      alert('Failed to save onboarding data.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div className="max-w-2xl mx-auto p-6 space-y-6 bg-white rounded-lg shadow-lg mt-5 mb-5">
      <h1 className="text-2xl font-semibold text-gray-900">Let’s get to know you!</h1>

      {/* Role selection */}
      <div>
        <div className='mb-2'>
        <label className="font-medium text-gray-900">What best describes you?</label>
        </div>
        <SelectableButtons
          options={['Student', 'Faculty/Staff', 'Organization']}
          selected={formData.role}
          onSelect={(val) => updateField('role', val)}
        />
      </div>

      {/* Student Fields */}
      {formData.role === 'Student' && (
        <>
          <div>
            <div className='mb-2'>
            <label className="font-medium text-gray-900">Academic Level</label>
            </div>
            <SelectableButtons
              options={['Undergraduate', 'Graduate', 'High School']}
              selected={formData.academicLevel || ''}
              onSelect={(val) => updateField('academicLevel', val)}
            />
          </div>

          <input
            placeholder="Academic Year"
            value={formData.academicYear || ''}
            onChange={(e) => updateField('academicYear', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <input
            placeholder="Country of Residence"
            value={formData.residenceCountry || ''}
            onChange={(e) => updateField('residenceCountry', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <input
            placeholder="Country Interested in Studying Abroad (optional)"
            value={formData.interestCountry || ''}
            onChange={(e) => updateField('interestCountry', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <input
            placeholder="Area of Study"
            value={formData.areaOfStudy || ''}
            onChange={(e) => updateField('areaOfStudy', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <div>
            <div className='mb-2'>
            <label className="font-medium text-gray-900">Interests</label>
            </div>
            <SelectableButtons
              options={interestOptions}
              selected={formData.interests || []}
              onSelect={(val) => updateField('interests', val)}
              multi
            />
          </div>

          <textarea
            placeholder="List your work/research/study abroad experiences"
            value={formData.workExperiences || ''}
            onChange={(e) => updateField('workExperiences', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </>
      )}

      {/* Faculty Fields */}
      {formData.role === 'Faculty/Staff' && (
        <>
          <input
            placeholder="Department"
            value={formData.department || ''}
            onChange={(e) => updateField('department', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <input
            placeholder="Title"
            value={formData.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <div>
            <div className='mb-2'>
            <label className="font-medium text-gray-900">
              Areas you are interested in supporting students with:
            </label>
            </div>
            <SelectableButtons
              options={supportOptions}
              selected={formData.supportAreas || []}
              onSelect={(val) => updateField('supportAreas', val)}
              multi
            />
          </div>

          <textarea
            placeholder="Describe your experiences"
            value={formData.facultyExperience || ''}
            onChange={(e) => updateField('facultyExperience', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <textarea
            placeholder="Current projects or interests"
            value={formData.currentProjects || ''}
            onChange={(e) => updateField('currentProjects', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </>
      )}

      {/* Organization Fields */}
      {formData.role === 'Organization' && (
        <>
          <div>
            <div className='mb-2'>
            <label className="font-medium text-gray-900">Organization Type</label>
            </div>
            <SelectableButtons
              options={['NGO', 'Company', 'Government', 'Educational', 'Other']}
              selected={formData.organizationType || ''}
              onSelect={(val) => updateField('organizationType', val)}
            />
          </div>

          <div>
            <div className='mb-2'>
            <label className="font-medium text-gray-900">Opportunities Offered</label>
            </div>
            <SelectableButtons
              options={opportunityOptions}
              selected={formData.opportunitiesOffered || []}
              onSelect={(val) => updateField('opportunitiesOffered', val)}
              multi
            />
          </div>

          <div>
            <div className='mb-2'>
            <label className="font-medium text-gray-900">Target Audience</label>
            </div>
            <SelectableButtons
              options={audienceOptions}
              selected={formData.targetAudience || ''}
              onSelect={(val) => updateField('targetAudience', val)}
            />
          </div>

          <input
            placeholder="Regions of Operation or Focus"
            value={formData.regions || ''}
            onChange={(e) => updateField('regions', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <textarea
            placeholder="Briefly describe your mission or programs"
            value={formData.mission || ''}
            onChange={(e) => updateField('mission', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <input
            placeholder="Website URL"
            value={formData.website || ''}
            onChange={(e) => updateField('website', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </>
      )}

      <button
        onClick={handleSubmit}
        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Submit
      </button>
    </div>
    </div>
  );
}
