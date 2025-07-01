import { fetchGoogleSheet } from '@/actions/google-api';
import Container from '@/components/common/Container';
import { faqData } from '@/types/sub/sub.type';
import Faq from './Faq';
// import Image from "next/image";

export default async function Sub4() {
  // https://docs.google.com/spreadsheets/d/1ynMLtW7BYvVyWuz9L-RYCWfMFFik_5nNjWjS2Kxtvf4/edit?gid=0#gid=0
  // 무조건 숫자가 있는 행이 있어야함 seq 처럼 임의의 행

  const sheetId = '1ynMLtW7BYvVyWuz9L-RYCWfMFFik_5nNjWjS2Kxtvf4';

  const faqData = ((await fetchGoogleSheet(sheetId, '0')) as unknown as faqData[]).filter(
    (d: faqData) => d.display === true
  );
  return (
    <Container>
      <Faq faqData={faqData} />
    </Container>
  );
}
