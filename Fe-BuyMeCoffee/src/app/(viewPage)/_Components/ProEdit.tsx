import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Pro } from "./pro";

export type PropsType = {
  name: string;
  social: string;
  image: string;
  about: string;
  userId: string;
};

export function ProEdit({ name, social, image, about, userId }: PropsType) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="text-sm bg-gray-200 px-3 py-1 rounded">
          Edit page
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit profile</AlertDialogTitle>
          <AlertDialogDescription>
            Make changes to your profile here. Click save when you're done.
          </AlertDialogDescription>
          <Pro
            name={name}
            social={social}
            image={image}
            about={about}
            userId={userId}
          />
        </AlertDialogHeader>
        <AlertDialogFooter></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
