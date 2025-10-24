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
import { createBlog } from "@/lib/blogs";

const IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/heic",
  "image/heif",
] as const;

const fileSchema = z.custom<File>((v) => v instanceof File, {
  message: "Invalid file",
});

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z
    .string()
    .min(1, "Subtitle is required")
    .max(160, "Subtitle must be 160 characters or fewer"),
  artistName: z.string().min(1, "Author name is required"),
  description: z.string().min(1, "Description is required"),
  featured: z.boolean().optional().default(false),
  image: fileSchema.refine(
    (f) => IMAGE_MIME_TYPES.includes((f as File).type as any),
    "Only JPEG, JPG, PNG, HEIC, HEIF allowed"
  ),
});

type FormValues = z.infer<typeof formSchema>;

const CreateNewBlogPage = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { getToken } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      title: "",
      subtitle: "",
      artistName: "",
      description: "",
      featured: false,
      image: undefined as unknown as File,
    },
    mode: "onSubmit",
  });

  const canSubmit = useMemo(() => {
    return !form.formState.isSubmitting;
  }, [form.formState.isSubmitting]);

  const onChangeFile = (file?: File) => {
    if (!file) return;
    if (
      !IMAGE_MIME_TYPES.includes(file.type as (typeof IMAGE_MIME_TYPES)[number])
    ) {
      toast.error("Unsupported file type");
      return;
    }
    form.setValue("image", file, { shouldValidate: true });
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const removeImage = () => {
    form.setValue("image", undefined as unknown as File, {
      shouldValidate: true,
    });
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const clearAll = () => {
    form.reset();
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const onSubmit = async (values: FormValues) => {
    try {
      const token = await getToken();
      if (!token) throw new Error("No auth token");
      // Get upload signature
      const sig = await getUploadSignature("blogs", token);
      const formData = new FormData();
      formData.append("file", values.image);
      formData.append("api_key", sig.apiKey);
      formData.append("timestamp", String(sig.timestamp));
      formData.append("signature", sig.signature);
      formData.append("folder", sig.folder);
      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${sig.cloudName}/auto/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!uploadRes.ok) throw new Error("Upload failed");
      const uploadJson = await uploadRes.json();
      const imageUrl = uploadJson.secure_url as string;

      await createBlog(
        {
          title: values.title,
          subtitle: values.subtitle,
          artistName: values.artistName,
          description: values.description,
          featured: values.featured,
          image: imageUrl,
        },
        token
      );
      toast.success("Blog submitted for approval");
      clearAll();
    } catch (e) {
      toast.error("Failed to create blog");
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
              <CardTitle className="text-2xl">Create New Blog</CardTitle>
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
                            placeholder="e.g. The Art of Creative Collaboration"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="subtitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subtitle</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="A concise subtitle (max 160 chars)"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="artistName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Author</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Elena Rodriguez"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Body</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={6}
                            placeholder="Write your blog content..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="image"
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
                              onChange={(e) => {
                                const file = (e.target.files ?? [])[0];
                                onChangeFile(file);
                              }}
                            />

                            {/* Dropzone styled like the art form */}
                            <div className="rounded-xl border border-border bg-card/50 p-4 md:p-6">
                              <div className="mb-4">
                                <h3 className="text-lg font-semibold">
                                  Upload Cover Image
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Upload a single image (JPEG, JPG, PNG, HEIC,
                                  HEIF).
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
                                  const file = (
                                    Array.from(
                                      e.dataTransfer?.files ?? []
                                    ) as File[]
                                  )[0];
                                  onChangeFile(file);
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
                                aria-label="Drop image here or click to browse"
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

                            {preview ? (
                              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3">
                                <div className="relative max-w-[280px]">
                                  <img
                                    src={preview}
                                    alt="cover-preview"
                                    className="aspect-[4/3] w-full rounded-md object-cover border"
                                  />
                                  <Button
                                    type="button"
                                    size="icon"
                                    variant="destructive"
                                    className="absolute -top-2 -right-2 h-7 w-7 rounded-full opacity-90"
                                    onClick={removeImage}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
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

export default CreateNewBlogPage;
