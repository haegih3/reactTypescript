'use client';

import Country from '@/data/Country.data';
import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import CustomSelect from './input/CustomSelect';
import InputContainer from './input/InputContainer';
import InputLabel from './input/InputLabel';
import InputText, { InputTextRef } from './input/InputText';
import InputTextarea, { InputTextareaRef } from './input/InputTextarea';

function EmailForm() {
  const API_KEY = '6Ldts2UrAAAAAMDWSI9bv9wygT4WBDU5QcQJu5WF'; // Replace with your site key
  const [captchaToken, setCaptchaToken] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const emailRef = useRef<InputTextRef>(null);
  const phoneRef = useRef<InputTextRef>(null);
  const messageRef = useRef<InputTextareaRef>(null);

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token || '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaToken || captchaToken.trim() === '') {
      alert('Please complete the CAPTCHA.');
      return;
    }

    // 이메일 유효성 검사
    if (emailRef.current && !emailRef.current.validateEmail()) {
      return;
    }

    // 전화번호 유효성 검사
    if (phoneRef.current && !phoneRef.current.validatePhone()) {
      return;
    }

    // required 체크
    if (!companyName || !email || !name || !phoneNumber) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName,
          email,
          name,
          phoneNumber,
          message,
          captchaToken,
        }),
      });

      const responseData = await response.json();
      // console.log('Response status:', response.status);
      // console.log('Response data:', responseData);

      if (response.ok) {
        // 성공 시 폼 초기화
        setCompanyName('');
        setEmail('');
        setName('');
        setPhoneNumber('');
        setMessage('');
        setCaptchaToken('');
        recaptchaRef.current?.reset();
        alert('Email sent successfully!');
      } else {
        // 실패 시 캡챠만 리셋
        setCaptchaToken('');
        recaptchaRef.current?.reset();
        alert(`Failed to send email: ${responseData.error || 'Unknown error'}`);
      }
    } catch (error) {
      // 에러 시 캡챠만 리셋
      setCaptchaToken('');
      recaptchaRef.current?.reset();
      console.error('Error sending email:', error);
      alert('Error sending email.');
    }
  };

  const scale = 1.3;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex gap-[50px] items-start">
        <div className="w-[50%] flex flex-col gap-[10px] justify-between">
          <InputContainer>
            <InputLabel label={'Company Name'} htmlFor={'companyName'} labelView={true} required />
            <InputText
              id="companyName"
              value={companyName}
              placeholder="Company Name *"
              onChange={setCompanyName}
              required
            />
          </InputContainer>

          <InputContainer>
            <InputLabel label={'Email'} htmlFor={'email'} labelView={true} required />
            <InputText
              ref={emailRef}
              id="email"
              type="EMAIL"
              value={email}
              placeholder="Business Email *"
              onChange={setEmail}
              required
            />
          </InputContainer>

          <InputContainer>
            <InputLabel label={'Name'} htmlFor={'name'} labelView={true} required />
            <InputText
              id="name"
              value={name}
              placeholder="Full Name (First Name/Last Name) *"
              onChange={setName}
              required
            />
          </InputContainer>

          <InputContainer>
            <InputLabel label={'Phone Number'} htmlFor={'phoneNumber'} labelView={true} required />
            <InputText
              ref={phoneRef}
              id="phoneNumber"
              value={phoneNumber}
              type="tel"
              placeholder="+821012345678 or 01012345678"
              onChange={setPhoneNumber}
              required
            />
          </InputContainer>

          <InputContainer>
            <InputLabel label={'Nation'} htmlFor={'nation'} labelView={true} />
            <CustomSelect id="nation" options={Country} />
          </InputContainer>
        </div>

        <div className="w-[50%] flex flex-col gap-[10px] justify-between items-start">
          <InputContainer align="start">
            <InputLabel label={'Message'} htmlFor={'message'} labelView={true} />
            <InputTextarea
              ref={messageRef}
              id="message"
              value={message}
              onChange={setMessage}
              placeholder="Type your message here"
            />
          </InputContainer>

          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              width: `${304 * scale}px`,
              height: `${78 * scale}px`,
            }}
          >
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={API_KEY}
              onChange={handleCaptchaChange}
              onExpired={() => setCaptchaToken('')}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={!captchaToken || captchaToken.trim() === ''}
        className={
          !captchaToken || captchaToken.trim() === '' ? 'opacity-50 cursor-not-allowed' : ''
        }
      >
        Send Email
      </button>
    </form>
  );
}

export default EmailForm;
