"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import { useParams, useRouter } from "next/navigation";

type PropsType = {
  handleSubmit?: () => void;
  qr: string;
  id: any;
};

export function QrDialog({ handleSubmit, qr, id }: PropsType) {
  const router = useRouter();

  const handlePayment = () => {
    router.push(`/paymentSubmit/${id}`);
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <button
            onClick={handleSubmit}
            className="w-full bg-black text-white py-2 rounded"
          >
            Support
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[325px] m-auto">
          <DialogHeader className="m-auto">
            <DialogTitle className="ml-15">Scan QR code</DialogTitle>
            <DialogDescription>
              Scan the QR code to complete your donation
            </DialogDescription>
          </DialogHeader>
          <div className="m-auto">{qr && <img src={qr} alt="qr" />}</div>
          <DialogFooter>
            <DialogClose asChild onClick={handlePayment}>
              <Button>Submit</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
