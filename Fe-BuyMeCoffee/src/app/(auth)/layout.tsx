import { Left } from "./_Components/left";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen flex">
      <div className="bg-yellow-500 w-1/2">
        <Left />
      </div>
      <div className="w-1/2">{children}</div>
    </div>
  );
}
