import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, companyName, name, phoneNumber, message, captchaToken } = body;

    // 필수 필드 검증
    if (!email || !companyName || !name || !phoneNumber || !captchaToken) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 환경변수 확인
    const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!recaptchaSecretKey) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // reCAPTCHA 검증
    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: recaptchaSecretKey,
        response: captchaToken,
      }),
    });

    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success) {
      return NextResponse.json({ error: 'Invalid reCAPTCHA' }, { status: 400 });
    }

    // 이메일 전송 설정
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // 이메일 내용
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `새로운 문의사항 - ${companyName}`,
      html: `
        <h2>새로운 문의사항이 도착했습니다</h2>
        <p><strong>회사명:</strong> ${companyName}</p>
        <p><strong>이메일:</strong> ${email}</p>
        <p><strong>작성자:</strong> ${name}</p>
        <p><strong>전화번호:</strong> ${phoneNumber}</p>
        <p><strong>메시지:</strong></p>
        <p>${!!message ? message.replace(/\n/g, '<br>') : ''}</p>
      `,
    };

    // 이메일 전송
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
