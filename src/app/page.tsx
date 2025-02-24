'use client';

import { useEffect, useState } from 'react';

import AuthPage from '@/components/blocks/Auth';
import Contact from '@/components/blocks/Contact';
import Chat from '@/components/blocks/Chat';
import { getCookie } from 'cookies-next';


export default function Home() {
  const idInstance = getCookie('idInstance');
  const apiToken = getCookie('apiToken');

  const [step, setStep] = useState<'login' | 'contact' | 'chat'>('login');
  

  useEffect(() => {
    if (idInstance && apiToken) {
      setStep('contact');
    }
  }, []);

  return (
    <div className="h-[100%] p-2 s:p-10 font-[family-name:var(--font-geist-sans)] bg-neutral-300">
      <main className="flex flex-col w-[100%] h-[100%] justify-center   items-center">
        {step === 'login' && <AuthPage nextStep={() => setStep('contact')} />}
        {step === 'contact' && <Contact nextStep={() => setStep('chat')} prevStep={() => setStep('login')} />}
        {step === 'chat' && <Chat prevStep={() => setStep('contact')}/>}
      </main>
    </div>
  );
}
