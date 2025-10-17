import { useId } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import COUNTRIES from "@/lib/data/countries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  email: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string;
  onChange: (next: {
    displayName?: string;
    bio?: string;
    avatarUrl?: string;
    country?: string;
    city?: string;
  }) => void;
  displayNameRequired?: boolean;
  bioRequired?: boolean;
  onAvatarFileSelected?: (file: File) => void;
  country?: string;
  city?: string;
};

const BasicInfo = ({
  email,
  displayName,
  bio,
  avatarUrl,
  onChange,
  displayNameRequired,
  bioRequired,
  onAvatarFileSelected,
  country,
  city,
}: Props) => {
  const avatarInputId = useId();
  const fall = (displayName || email || "U").slice(0, 1).toUpperCase();

  return (
    <Card className="p-5 md:py-10 md:px-10 mb-8">
      <h3 className="text-base font-semibold mb-4">Basic Info</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center gap-4">
            <Avatar className="size-16 md:size-20">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback>{fall}</AvatarFallback>
            </Avatar>
            <input
              id={avatarInputId}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const url = URL.createObjectURL(file);
                  onChange({ avatarUrl: url });
                  onAvatarFileSelected?.(file);
                }
              }}
            />
            <Label htmlFor={avatarInputId} className="cursor-pointer">
              <Button type="button" size="sm" variant="outline">
                Change Avatar
              </Button>
            </Label>
          </div>
        </div>
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
          <div className="space-y-2">
            <Label htmlFor="displayName">
              Display Name{" "}
              {displayNameRequired ? (
                <span className="text-destructive">*</span>
              ) : null}
            </Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => onChange({ displayName: e.target.value })}
              placeholder="Your public name"
              aria-required={displayNameRequired}
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              value={email}
              readOnly
              aria-readonly
              className="opacity-80"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="bio">
              Bio{" "}
              {bioRequired ? <span className="text-destructive">*</span> : null}
            </Label>
            <Textarea
              id="bio"
              value={bio ?? ""}
              onChange={(e) => onChange({ bio: e.target.value })}
              placeholder="A short bio or tagline"
              aria-required={bioRequired}
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label>Country</Label>
            <Select
              value={(country || "").toString().toLowerCase()}
              onValueChange={(v) => onChange({ country: v })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((c) => (
                  <SelectItem key={c.code} value={c.slug}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={city ?? ""}
              onChange={(e) => onChange({ city: e.target.value })}
              placeholder="e.g., Madrid"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BasicInfo;
