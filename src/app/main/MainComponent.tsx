'use client';

import Container from '@/components/common/Container';
import InnerBasic from '@/components/common/InnerBasic';
import MotionSection from '@/components/common/MotionSection';
import { setupInputTracker } from '@/utils/globals';
import { useEffect } from 'react';

export default function MainComponent() {
  useEffect(() => {
    setupInputTracker();
  }, []);

  return (
    <main>
      <Container id="mainVisual" className="bg-white">
        <InnerBasic>
          <h1>MainPage</h1>
          <section className="mainvisual h-[800px]">
            <h2 className="text-[34px] font-bold">Main Visual</h2>
            <div className=""></div>
          </section>
        </InnerBasic>
      </Container>
      <Container id="section01" className="bg-red-50">
        <InnerBasic>
          <h2 className="text-[34px] font-bold">Section 01</h2>
          <MotionSection className="h-[1200px]" once={false}>
            <section>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </section>
          </MotionSection>
        </InnerBasic>
      </Container>
      <Container id="section02" className="bg-amber-50">
        <InnerBasic>
          <h2 className="text-[34px] font-bold">Section 02</h2>
          <MotionSection className="h-[1200px]">
            <section>
              Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a
              piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard
              McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going
              through the cites of the word in classical literature, discovered the undoubtable
              source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of &quot;de Finibus
              Bonorum et Malorum&quot; (The Extremes of Good and Evil) by Cicero, written in 45 BC.
              This book is a treatise on the theory of ethics, very popular during the Renaissance.
              The first line of Lorem Ipsum, &quot;Lorem ipsum dolor sit amet..&quot;, comes from a
              line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is
              reproduced below for those interested. Sections 1.10.32 and 1.10.33 from &quot;de
              Finibus Bonorum et Malorum&quot; by Cicero are also reproduced in their exact original
              form, accompanied by English versions from the 1914 translation by H. Rackham.
            </section>
          </MotionSection>
        </InnerBasic>
      </Container>
      <Container id="section03" className="bg-slate-50">
        <InnerBasic>
          <h2 className="text-[34px] font-bold">Section 03</h2>
          <MotionSection className="h-[1200px]">
            <section>
              It is a long established fact that a reader will be distracted by the readable content
              of a page when looking at its layout. The point of using Lorem Ipsum is that it has a
              more-or-less normal distribution of letters, as opposed to using &apos;Content here,
              content here&apos;, making it look like readable English. Many desktop publishing
              packages and web page editors now use Lorem Ipsum as their default model text, and a
              search for &apos;lorem ipsum&apos; will uncover many web sites still in their infancy.
              Various versions have evolved over the years, sometimes by accident, sometimes on
              purpose (injected humour and the like).
            </section>
          </MotionSection>
        </InnerBasic>
      </Container>
      <Container id="section04" className="bg-teal-50">
        <InnerBasic>
          <h2 className="text-[34px] font-bold">Section 04</h2>
          <MotionSection className="h-[1200px]">
            <section>
              There are many variations of passages of Lorem Ipsum available, but the majority have
              suffered alteration in some form, by injected humour, or randomised words which
              don&apos;t look even slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn&apos;t anything embarrassing hidden in the middle
              of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined
              chunks as necessary, making this the first true generator on the Internet. It uses a
              dictionary of over 200 Latin words, combined with a handful of model sentence
              structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum
              is therefore always free from repetition, injected humour, or non-characteristic words
              etc.
            </section>
          </MotionSection>
        </InnerBasic>
      </Container>
    </main>
  );
}
