import { SetStateAction, useState } from "react";
import { Dispatch } from "react";
import { Loader } from "lucide-react";
import { QrDialog } from "./qrDialog";

type Props = {
  setSelectedTab: Dispatch<SetStateAction<number>>;
  selectedTab: string;
  setValue: Dispatch<SetStateAction<string>>;
  handleSubmit?: () => void;
  value?: string;
  url?: string | undefined;
  loading: boolean;
  qr: string;
  id:any;
};

function SupportCard({
  selectedTab,
  setSelectedTab,
  setValue,
  handleSubmit,
  value,
  url,
  id,
  qr,
}: Props) {
  const handleClick = (el: string) => {
    setSelectedTab(Number(el));
  };
  const amount = ["1", "2", "5", "10"];
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  return (
    <div className="bg-white p-6 rounded-md shadow flex flex-col justify-between">
      <div>
        <h2 className="font-semibold text-lg mb-4">Buy Jake a Coffee</h2>

        <div className="flex gap-3 mb-4">
          {amount.map((el, i) => (
            <button
              value={selectedTab}
              key={i}
              onClick={() => handleClick(el)}
              className={`border px-3 py-1 rounded ${
                el === selectedTab ? "bg-gray-800 text-white" : "bg-gray-100"
              }`}
            >
              ${el}
            </button>
          ))}
        </div>

        <div className="mb-4">
          <input
            value={url}
            type="text"
            placeholder={url}
            className="w-full border px-3 py-2 rounded text-sm"
          />
        </div>

        <div className="mb-4">
          <textarea
            placeholder="Please write your message here"
            rows={4}
            className="w-full border px-3 py-2 rounded text-sm resize-none"
            onChange={handleChange}
            value={value}
          />
        </div>
      </div>
      {/* {loading ? (
        <p className="flex justify-center items-center text-red-500 bg-gray-500 w-full p-2">
          <Loading />
        </p>
      ) : (
        <QrDialog handleSubmit={handleSubmit} qr={qr} />
      )} */}
      <QrDialog handleSubmit={handleSubmit} qr={qr} id= {id}/>
    </div>
  );
}

export default SupportCard;

export const Loading = () => {
  return (
    <div className="animate-spin text-xl">
      <Loader color={"blue"} />
    </div>
  );
};
