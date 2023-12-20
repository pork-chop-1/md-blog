export default function SiteInfoBox() {
  return (
    <div className="rounded-xl bg-white/80 w-full p-4">
      <h2 className="text-center text-xl leading-10">RingWorld Blog</h2>
      <div className="w-full border-b-slate-400 border"></div>
      <ul>
        <li className="h-10 hover:bg-white rounded-xl flex items-center px-4 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 6h.008v.008H6V6Z"
            />
          </svg>
          tag
        </li>
      </ul>
    </div>
  )
}
