/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Google Visualization API 결과에서 JSON 파싱
 */
export const parseGoogleSheetJSON = (text: string) => {
  try {
    return JSON.parse(text.replace(/^[\s\S]*?setResponse\(/, '').replace(/\);?$/, ''));
  } catch (err) {
    console.error('📛 GViz JSON Parse Error:', err);
    throw new Error('Google Sheet 응답이 예상과 다릅니다.');
  }
};

/**
 * json 형태로 변환
 */
export const parseList = (json: any): any[] => {
  if (!json.table || !json.table.cols || !json.table.rows) {
    throw new Error('유효하지 않은 Google Sheet 응답입니다.');
  }

  const headers: string[] = json.table.cols.map(
    (col: { label: string }, idx: number) => col.label || `col${idx}`
  );
  const rows: any[] = json.table.rows;

  return rows.map((row: { c: { v: string | null }[] }) => {
    const obj: Partial<any> = {};

    headers.forEach((key: string, i: number) => {
      const actualKey = key.endsWith('_P') ? key.slice(0, -2) : key;

      const cell = row.c[i];
      const raw = cell?.v;

      let value: any;

      if (key === 'answer_En' || key === 'answer_Ko') {
        value = typeof raw === 'string' ? raw.split('<br>').map(v => v.trim()) : [];
      } else if (cell == null || cell.v == null || cell.v === '') {
        // 완전 빈 셀
        value = null;
      } else {
        // ✅ 나머지: 숫자형이면 숫자로, TRUE/FALSE면 boolean으로, 아니면 그대로
        if (typeof raw === 'string') {
          const lower = raw.toLowerCase();
          if (!isNaN(Number(raw))) {
            value = Number(raw);
          } else if (lower === 'true') {
            value = true;
          } else if (lower === 'false') {
            value = false;
          } else {
            value = raw;
          }
        } else if (typeof raw === 'number') {
          value = raw;
        } else if (typeof raw === 'boolean') {
          value = raw;
        } else {
          value = raw;
        }
      }

      (obj as any)[actualKey] = value;
    });

    return obj;
  });
};

/**
 * Google Spreadsheet 데이터 fetch (Next.js의 next 옵션은 사용 X)
 * 캐싱을 사용할수 없음.
 */
export const fetchRawGoogleSheet = async (sheetId: string, gid: string) => {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?gid=${gid}&tqx=out:json`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Google Sheet API 호출 실패: ${res.status} ${res.statusText}`);
  }

  const text = await res.text();

  // HTML 응답인지 확인
  if (text.trim().startsWith('<!DOCTYPE')) {
    throw new Error('Google Sheet에 접근할 수 없습니다. 권한을 확인해주세요.');
  }

  const jsonData = parseGoogleSheetJSON(text);
  return jsonData;
};
