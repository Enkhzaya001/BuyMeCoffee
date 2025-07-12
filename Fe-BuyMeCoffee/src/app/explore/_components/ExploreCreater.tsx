import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type AllPro = {
  name: string;
  about: string;
  socialMediaURL: string;
  avatarImage: string;
  userId?: number;
};
type PropsPro = {
  allProfile: AllPro[];
};

export default function ExploreCreators({ allProfile }: PropsPro) {
  return (
    <div className="w-full  p-6 space-y-6">
      <h2 className="text-xl font-semibold">Explore creators</h2>

      <Input placeholder="Search name" className="w-sm" />

      {allProfile.map((creator, index) => (
        <Card key={index}>
          <div className="flex justify-between  p-4 space-y-3">
            <div>
              <div className="flex gap-2 items-center">
                <img
                  src={creator.avatarImage}
                  width={50}
                  height={50}
                  alt="avatar"
                />
                <h3 className="font-semibold">{creator.name}</h3>
              </div>

              <div className="flex-1 space-y-4 p-1">
                <div>
                  <p className="text-md font-semibold">About {creator.name}</p>
                  <p className="text-sm mt-1">{creator.about}</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Social media URL:</p>
              <p className="text-blue-500 text-sm">{creator.socialMediaURL}</p>
            </div>
            <div>
              <Link href={`/viewPage/${creator.userId}`}>
                <Button variant="outline" className="ml-auto">
                  View profile <ExternalLink className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
