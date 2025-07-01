'use client';

export default function InnerBasic({ children }: { children: React.ReactNode }) {
  return <div className="w-full max-w-[750px] md:max-w-[1280px] mx-auto">{children}</div>;
}
