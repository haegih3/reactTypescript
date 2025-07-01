import { parseGoogleSheetJSON, parseList } from '@/utils/googleSheetUtil';

export const fetchGoogleSheet = async (sheetId: string, gid: string) => {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?gid=${gid}&tqx=out:json`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  const text = await res.text();
  const jsonData = parseGoogleSheetJSON(text);
  return parseList(jsonData);
};
