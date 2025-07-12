import Image from "next/image";

export const SupportYet = () => {
  return (
    <div className="bg-white w-[800px] h-[184px] rounded-xl border shadow-sm flex flex-col justify-center items-center">
      <Image src={"/heart.png"} width={50} height={50} alt="heart"></Image>
      <p className="font-semibold">You don’t have any supporters yet</p>
      <p>Share your page with your audience to get started.</p>
    </div>
  );
};
