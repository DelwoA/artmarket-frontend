import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { X, Share, Image } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import { getUploadSignature } from "@/lib/uploads";
import { createArt } from "@/lib/arts";

const IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/heic",
  "image/heif",
] as const;

const Categories = [
  "Painting",
  "Sculpture",
  "Photography",
  "Mixed Media",
  "Digital Art",
  "Other",
] as const;

const Availabilities = ["For Sale", "Not for Sale", "Sold"] as const;

const fileSchema = z.custom<File>((v) => v instanceof File, {
  message: "Invalid file",
});

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.enum(Categories),
  price: z.coerce.number().positive("Price must be greater than 0"),
  availability: z.enum(Availabilities),
  featured: z.boolean().optional().default(false),
  images: z
    .array(fileSchema)
    .min(1, "Attach at least 1 image")
    .max(5, "Attach up to 5 images")
    .refine(
      (files) =>
        files.every((f) =>
          IMAGE_MIME_TYPES.includes(f.type as (typeof IMAGE_MIME_TYPES)[number])
        ),
      "Only JPEG, JPG, PNG, HEIC, HEIF allowed"
    ),
});

type FormValues = z.infer<typeof formSchema>;

const CreateNewArtPage = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const { getToken } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      title: "",
      description: "",
      category: "Painting",
      price: 1,
      availability: "For Sale",
      featured: false,
      images: [],
    },
    mode: "onSubmit",
  });

  const images = form.watch("images");

  const canSubmit = useMemo(() => {
    return !form.formState.isSubmitting;
  }, [form.formState.isSubmitting]);

  const onChangeFiles = (files: File[]) => {
    const allowed = files.filter((f) =>
      IMAGE_MIME_TYPES.includes(f.type as (typeof IMAGE_MIME_TYPES)[number])
    );
    const current = form.getValues("images") ?? [];
    const next = [...current, ...allowed].slice(0, 5);
    form.setValue("images", next, { shouldValidate: true });

    // update previews
    const urls = next.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
  };

  const removeImageAt = (index: number) => {
    const current = form.getValues("images") ?? [];
    const next = current.filter((_, i) => i !== index);
    form.setValue("images", next, { shouldValidate: true });
    const urls = next.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
  };

  const clearAll = () => {
    form.reset();
    setPreviews([]);
    if (inputRef.current) inputRef.current.value = "";
  };

  const onSubmit = async (_values: FormValues) => {
    try {
      const token = await getToken();
      if (!token) {
        toast.error("You must be signed in to create art");
        return;
      }

      // 1) Get signed upload parameters
      const sig = await getUploadSignature("arts", token);

      // 2) Upload images directly to Cloudinary
      const uploadOne = async (file: File): Promise<string> => {
        const form = new FormData();
        form.append("file", file);
        form.append("api_key", sig.apiKey);
        form.append("timestamp", String(sig.timestamp));
        form.append("signature", sig.signature);
        form.append("folder", sig.folder);
        const endpoint = `https://api.cloudinary.com/v1_1/${sig.cloudName}/auto/upload`;
        const res = await fetch(endpoint, { method: "POST", body: form });
        if (!res.ok) throw new Error("Upload failed");
        const json = (await res.json()) as { secure_url?: string };
        const url = json.secure_url;
        if (!url) throw new Error("Upload failed");
        return url;
      };

      const imageFiles = _values.images ?? [];
      const imageUrls = await Promise.all(imageFiles.map((f) => uploadOne(f)));

      // 3) Create the art in backend
      const payload = {
        title: _values.title,
        description: _values.description,
        category: _values.category,
        price: Number(_values.price),
        availability: _values.availability,
        featured: Boolean(_values.featured),
        images: imageUrls,
      };
      await createArt(payload, token);

      toast.success("Artwork created");
      clearAll();
    } catch (e) {
      toast.error("Failed to create artwork");
    }
  };

  const onInvalid = () => {
    toast.error("Please fix the errors in the form");
  };

  return (
    <main className="w-full bg-background">
      <div className="container mx-auto px-4 md:px-8 py-8 md:py-10">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Create New Art</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit, onInvalid)}
                  className="space-y-5"
                >
                  <FormField
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Serenity in Blue"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {null}

                  <FormField
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={5}
                            placeholder="Describe the artwork..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                {Categories.map((c) => (
                                  <SelectItem key={c} value={c}>
                                    {c}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price (USD)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={1}
                              step={1}
                              placeholder="e.g. 1200"
                              value={field.value ?? ""}
                              onChange={(e) => field.onChange(e.target.value)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      name="availability"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Availability</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select availability" />
                              </SelectTrigger>
                              <SelectContent>
                                {Availabilities.map((a) => (
                                  <SelectItem key={a} value={a}>
                                    {a}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    name="images"
                    render={() => (
                      <FormItem>
                        <FormControl>
                          <div>
                            {/* Hidden input for file picker */}
                            <Input
                              ref={inputRef}
                              type="file"
                              className="sr-only"
                              accept={IMAGE_MIME_TYPES.join(",")}
                              multiple
                              onChange={(e) => {
                                const files = Array.from(e.target.files ?? []);
                                onChangeFiles(files);
                              }}
                            />

                            {/* Dropzone block styled similar to the provided design */}
                            <div className="rounded-xl border border-border bg-card/50 p-4 md:p-6">
                              <div className="mb-4">
                                <h3 className="text-lg font-semibold">
                                  Upload File
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Upload your material as image files (JPEG,
                                  JPG, PNG, HEIC, HEIF). Up to 5 images.
                                </p>
                              </div>
                              <div
                                className={`rounded-lg border-2 border-dashed ${
                                  isDragging
                                    ? "border-ring/70 bg-muted/20"
                                    : "border-muted-foreground/30 bg-muted/5"
                                } p-6 md:p-10 transition-colors`}
                                onDragEnter={(e) => {
                                  e.preventDefault();
                                  setIsDragging(true);
                                }}
                                onDragOver={(e) => {
                                  e.preventDefault();
                                  setIsDragging(true);
                                }}
                                onDragLeave={(e) => {
                                  e.preventDefault();
                                  setIsDragging(false);
                                }}
                                onDrop={(e) => {
                                  e.preventDefault();
                                  setIsDragging(false);
                                  const dtFiles = Array.from(
                                    e.dataTransfer?.files ?? []
                                  );
                                  onChangeFiles(dtFiles);
                                }}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    inputRef.current?.click();
                                  }
                                }}
                                onClick={() => inputRef.current?.click()}
                                aria-label="Drop images here or click to browse"
                              >
                                <div className="flex flex-col items-center text-center">
                                  <div className="mb-5 flex items-center justify-center">
                                    <div className="rounded-full bg-muted p-5 ring-1 ring-border">
                                      <Share className="h-8 w-8" />
                                    </div>
                                  </div>
                                  <p className="text-lg md:text-xl font-medium">
                                    Drop your file here or click to browse
                                  </p>
                                  <p className="mt-2 text-sm text-muted-foreground">
                                    Supports JPEG, JPG, PNG, HEIC and HEIF files
                                  </p>
                                  <div className="mt-4 flex items-center justify-center gap-3 text-xs">
                                    <span className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1">
                                      <Image className="h-4 w-4" /> JPEG/JPG
                                    </span>
                                    <span className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1">
                                      <Image className="h-4 w-4" /> PNG
                                    </span>
                                    <span className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1">
                                      <Image className="h-4 w-4" /> HEIC/HEIF
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {images && images.length > 0 ? (
                              <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
                                {previews.map((src, i) => (
                                  <div key={i} className="relative group">
                                    <img
                                      src={src}
                                      alt={`preview-${i}`}
                                      className="aspect-square w-full rounded-md object-cover border"
                                    />
                                    <Button
                                      type="button"
                                      size="icon"
                                      variant="destructive"
                                      className="absolute -top-2 -right-2 h-7 w-7 rounded-full opacity-90"
                                      onClick={() => removeImageAt(i)}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <Button type="button" variant="outline" onClick={clearAll}>
                      Clear
                    </Button>
                    <Button type="submit" disabled={!canSubmit}>
                      Submit
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter />
          </Card>
        </div>
      </div>
    </main>
  );
};

export default CreateNewArtPage;
