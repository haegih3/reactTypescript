'use client';

import InnerBasic from '@/components/common/InnerBasic';
import InputLabel from '@/components/module/input/InputLabel';
import InputText from '@/components/module/input/InputText';
import { faqData } from '@/types/sub/sub.type';
import { cn } from '@/utils/styleUtil';
import { JSX, useState } from 'react';

export default function Faq({ faqData }: { faqData: faqData[] }) {
  const [inputText, setInputText] = useState('');
  const [searchText, setSearchText] = useState('');
  const categoryTypes = Array.from(new Set(faqData.map(item => item.type)));
  const [category, setCategory] = useState<string>(categoryTypes[0] || '');

  const isIndentItem = (text: string) => /^[0-9]+\. .+|^[a-zA-Z]\. .+/.test(text);

  // text용 : 제목
  function highlightText(text: string, keyword: string): JSX.Element {
    if (!keyword) return <>{text}</>;
    const regex = new RegExp(`(${keyword})`, 'gi');
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <mark key={i} className="bg-yellow-200 text-black font-semibold">
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  }

  // html용 : 내용
  function highlightInHTML(html: string, keyword: string): string {
    if (!keyword) return html;
    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedKeyword})`, 'gi');

    return html.replace(
      regex,
      `<mark style="background-color: #FEF08A; color: #1F2937;">$1</mark>`
    );
  }

  const searchData = searchText
    ? faqData.filter(
        item =>
          item.question.toLowerCase().includes(searchText.toLowerCase()) ||
          (item.answer_En?.some(answer =>
            answer.toLowerCase().includes(searchText.toLowerCase())
          ) ??
            false)
      )
    : faqData.filter(item => item.type === category);

  return (
    <InnerBasic>
      <h2>FAQ</h2>

      {/* 단어검색 */}
      <div className="flex gap-[10px]">
        <InputLabel label={'Search'} htmlFor={'search'} labelView={false} />
        <InputText
          type="TEXT"
          id="search"
          placeholder="Search keyword..."
          value={inputText}
          onChange={value => setInputText(value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              setSearchText(inputText);
            }
          }}
        />
        <button
          type="button"
          className="bg-amber-800 text-white rounded-[5px] p-[10px]"
          onClick={() => {
            setSearchText(inputText);
            setCategory('');
          }}
        >
          Search
        </button>
      </div>

      {/* 카테고리 */}
      <div className="mt-[120px]">
        {categoryTypes.length > 0 && (
          <ul className="flex gap-[10px] [&_button]:px-[10px] [&_button]:py-[5px] [&_button]:rounded-[5px] [&_button]:hover:text-amber-800 [&_button]:cursor-pointer">
            {categoryTypes.map(type => (
              <li key={type}>
                <button
                  type="button"
                  onClick={() => {
                    setCategory(type);
                    setInputText('');
                    setSearchText('');
                  }}
                  className={cn(
                    'font-bold border',
                    searchText
                      ? 'text-gray-400 border-gray-200'
                      : category === type
                        ? 'text-amber-800 border-amber-800'
                        : 'text-gray-400 border-gray-200'
                  )}
                >
                  {type}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 목록 */}
      <div className="mt-[120px]">
        {searchData.map(item => (
          <div key={item.seq} className="py-5 border-b">
            <div className="text-lg font-bold mb-2">{highlightText(item.question, searchText)}</div>

            {item.answer_En && (
              <div className="space-y-2 [&_a]:text-gray-400 [&_a]:underline [&_a:hover]:text-purple-950">
                {item.answer_En.map((htmlStr, idx) => (
                  <p
                    key={idx}
                    className={cn('text-sm', isIndentItem(htmlStr) && 'pl-4')}
                    dangerouslySetInnerHTML={{
                      __html: highlightInHTML(htmlStr || '', searchText),
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </InnerBasic>
  );
}
