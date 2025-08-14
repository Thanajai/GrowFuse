
import React, { useState, useEffect } from 'react';
import type { User, Language } from '../types';
import { UI_TEXT } from '../constants';
import * as authService from '../services/authService';
import Modal from './Modal';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  language: Language;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess, language }) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [mockOtp, setMockOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    // Reset state when modal is opened or closed
    if (!isOpen) {
      setTimeout(() => { // delay to allow closing animation
        setStep('phone');
        setPhone('');
        setOtp('');
        setError('');
        setIsLoading(false);
      }, 300);
    }
  }, [isOpen]);

  useEffect(() => {
    let timerId: number;
    if (resendTimer > 0) {
      timerId = window.setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timerId);
  }, [resendTimer]);

  const handleSendOtp = () => {
    if (!/^\d{10}$/.test(phone)) {
      setError(UI_TEXT[language].invalidPhone);
      return;
    }
    setError('');
    setIsLoading(true);

    // Simulate API call to send OTP
    setTimeout(() => {
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setMockOtp(generatedOtp);
      console.log(`%c[MOCK OTP] Your OTP is: ${generatedOtp}`, 'color: #38A169; font-weight: bold; font-size: 14px;');
      
      setIsLoading(false);
      setStep('otp');
      setResendTimer(30); // 30 second timer
    }, 1000);
  };

  const handleVerifyOtp = () => {
    if (otp !== mockOtp) {
      setError(UI_TEXT[language].invalidOtp);
      return;
    }
    setError('');
    setIsLoading(true);

    // Simulate API call to verify OTP and login
    setTimeout(() => {
      const user = authService.loginWithPhone(phone);
      setIsLoading(false);
      onLoginSuccess(user);
    }, 1000);
  };
  
  const handleResendOtp = () => {
      if (resendTimer > 0) return;
      handleSendOtp();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={e => e.preventDefault()} className="space-y-6">
        {step === 'phone' ? (
          <>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white" id="modal-title">{UI_TEXT[language].enterPhoneNumber}</h3>
            <div>
              <label htmlFor="phone" className="sr-only">{UI_TEXT[language].enterPhoneNumber}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 dark:text-gray-400">
                  +91
                </div>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder={UI_TEXT[language].phonePlaceholder}
                  required
                  maxLength={10}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button 
              type="button" 
              onClick={handleSendOtp}
              disabled={isLoading || !/^\d{10}$/.test(phone)}
              className="w-full py-3 px-4 bg-brand-green hover:bg-brand-green-dark text-white font-bold rounded-lg shadow-md transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {isLoading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : UI_TEXT[language].sendOtp}
            </button>
          </>
        ) : (
          <>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{UI_TEXT[language].enterOtp}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{UI_TEXT[language].otpSent}</p>
            <div>
              <label htmlFor="otp" className="sr-only">{UI_TEXT[language].enterOtp}</label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                placeholder={UI_TEXT[language].otpPlaceholder}
                required
                maxLength={6}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-green focus:border-brand-green text-center tracking-[0.5em]"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
             <button
              type="button" 
              onClick={handleVerifyOtp}
              disabled={isLoading || otp.length !== 6}
              className="w-full py-3 px-4 bg-brand-green hover:bg-brand-green-dark text-white font-bold rounded-lg shadow-md transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center"
            >
               {isLoading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : UI_TEXT[language].verifyAndSignIn}
            </button>
            <div className="text-center">
                <button 
                    type="button" 
                    onClick={handleResendOtp}
                    disabled={resendTimer > 0}
                    className="text-sm text-brand-green hover:underline disabled:text-gray-500 disabled:cursor-not-allowed"
                >
                    {resendTimer > 0 ? `${UI_TEXT[language].resendOtp} in ${resendTimer}s` : UI_TEXT[language].resendOtp}
                </button>
            </div>
          </>
        )}
      </form>
    </Modal>
  );
};

export default LoginModal;
