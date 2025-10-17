import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  website?: string;
  instagram?: string;
  facebook?: string;
  onChange: (next: {
    website?: string;
    instagram?: string;
    facebook?: string;
  }) => void;
};

const SocialLinks = ({ website, instagram, facebook, onChange }: Props) => {
  return (
    <Card className="p-5 md:py-10 md:px-10">
      <h3 className="text-sm font-semibold mb-4">Social Links</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            value={website ?? ""}
            onChange={(e) => onChange({ website: e.target.value })}
            placeholder="https://your-portfolio.com"
            inputMode="url"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="instagram">Instagram</Label>
          <Input
            id="instagram"
            value={instagram ?? ""}
            onChange={(e) => onChange({ instagram: e.target.value })}
            placeholder="https://instagram.com/yourhandle"
            inputMode="url"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="facebook">Facebook</Label>
          <Input
            id="facebook"
            value={facebook ?? ""}
            onChange={(e) => onChange({ facebook: e.target.value })}
            placeholder="https://facebook.com/yourprofile"
            inputMode="url"
          />
        </div>
      </div>
    </Card>
  );
};

export default SocialLinks;
