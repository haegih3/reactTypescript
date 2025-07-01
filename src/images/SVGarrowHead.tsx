export default function SVGarrowHead(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M1.5 3.75L6 8.25l4.5-4.5"
        stroke="#B3B3B3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
