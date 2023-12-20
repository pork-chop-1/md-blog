import Image from "next/image"

export default function AuthorInfoBox() {
  return (
    <div className="rounded-xl bg-white/80 w-full p-4 mt-8">
      <Image src={'/avatar.jpg'} width={80} height={80} alt="avatar" className="w-[80px] h-[80px] rounded-lg shadow-md border border-gray-400 mx-auto my-2"></Image>
      <h2 className="text-center text-xl leading-10">pork-chop-1</h2>
      <p className="text-center font-light">我得重新集结部队</p>
    </div>
  )
}
