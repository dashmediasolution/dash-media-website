'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { type Blog } from "@prisma/client";
import { Switch } from "@/components/ui/switch"
import { RichTextEditor } from '@/components/ui/RichTextEditor'; 

// ✅ Import the SEO Components
import { SEOAnalyzer } from "@/components/dashboard/SeoAnalyser";

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

const formSchema = z.object({
    headline: z.string().min(5, "Headline must be at least 5 characters."),
    blogUrl: z.string().min(3, "URL slug must be at least 3 characters.").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "URL slug can only contain lowercase letters, numbers, and hyphens."),
    category: z.string().min(2, "Category is required."),
    content: z.string().min(50, "Content must be at least 50 characters."),
    authorName: z.string().min(2, "Author name is required."),
    imageUrl: z.string().url("A valid image URL is required.").optional().or(z.literal("")),
    metaTitle: z.string().min(5, "Meta title is required."),
    metaDescription: z.string().min(10, "Meta description is required."),
    metaKeywords: z.string().min(3, "Please provide at least one keyword."),
});

interface BlogFormProps {
    onFormSubmit: () => void;
    initialData?: Blog;
}

type FormValues = z.infer<typeof formSchema>;

export function BlogForm({ onFormSubmit, initialData }: BlogFormProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadMethod, setUploadMethod] = useState<'url' | 'upload'>('url');
    const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
    
    // ✅ Local state for the Focus Keyword used for analysis
    const [focusKeyword, setFocusKeyword] = useState("");
    
    const isUpdateMode = !!initialData;

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? {
            headline: initialData.headline,
            blogUrl: initialData.blogUrl,
            category: initialData.category,
            content: initialData.content || "<p></p>",
            authorName: initialData.authorName,
            imageUrl: initialData.imageUrl || "",
            metaTitle: initialData.metaTitle,
            metaDescription: initialData.metaDescription,
            metaKeywords: initialData.metaKeywords,
        } : {
            headline: "",
            blogUrl: "",
            category: "Marketing",
            content: "<p></p>",
            authorName: "Dash Media",
            imageUrl: "",
            metaTitle: "",
            metaDescription: "",
            metaKeywords: "",
        },
    });

    // ✅ Watch form values for real-time SEO analysis
    const watchedValues = form.watch();
    const headlineValue = watchedValues.headline;

    useEffect(() => {
        if (headlineValue && !isSlugManuallyEdited && !isUpdateMode) {
            const slug = slugify(headlineValue);
            form.setValue("blogUrl", slug, { shouldValidate: true });
        }
    }, [headlineValue, isSlugManuallyEdited, isUpdateMode, form]);

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (isUploading) return;
        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const toastId = toast.loading("Uploading image...");
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (data.success) {
                form.setValue('imageUrl', data.url);
                toast.success("Image uploaded successfully!", { id: toastId });
            } else {
                throw new Error(data.message || "Upload failed");
            }
        } catch (error) {
            toast.error("Image upload failed.", { id: toastId });
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    };

    async function onSubmit(values: FormValues) {
        if (!values.imageUrl) {
            toast.error("Please provide an image URL or upload an image.");
            return;
        }
        try {
            const method = isUpdateMode ? 'PUT' : 'POST';
            const url = isUpdateMode ? `/api/blogs/${initialData.id}` : '/api/blogs';

            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error(`Failed to ${isUpdateMode ? 'update' : 'create'} post`);
            }

            form.reset();
            onFormSubmit();
        } catch (error) {
            toast.error(`An error occurred while ${isUpdateMode ? 'updating' : 'creating'} the post.`);
            console.error(error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                <FormField control={form.control} name="headline" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Headline</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter your blog title" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="blogUrl" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Blog URL Slug</FormLabel>
                        <FormControl>
                            <Input 
                                {...field} 
                                placeholder="auto-generated-slug"
                                onChange={(e) => {
                                    field.onChange(e);
                                    setIsSlugManuallyEdited(true);
                                }}
                            />
                        </FormControl>
                        <FormDescription>
                            The unique URL for this post. It was auto-generated from the headline.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="authorName" render={({ field }) => (
                    <FormItem><FormLabel>Author Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="category" render={({ field }) => (
                    <FormItem><FormLabel>Category</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />

                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <RichTextEditor
                                    value={field.value}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="space-y-4 rounded-md border p-4">
                    <h4 className="text-sm font-medium">Blog Image</h4>
                    <div className="flex items-center space-x-2">
                        <FormLabel>Use Image URL</FormLabel>
                        <Switch
                            checked={uploadMethod === 'upload'}
                            onCheckedChange={(checked) => {
                                setUploadMethod(checked ? 'upload' : 'url');
                                form.setValue('imageUrl', '');
                            }}
                        />
                        <FormLabel>Upload from System</FormLabel>
                    </div>

                    {uploadMethod === 'url' ? (
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ) : (
                        <div className="space-y-2">
                            <Input id="image-upload" type="file" onChange={handleImageUpload} disabled={isUploading} accept="image/*" />
                            {isUploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
                        </div>
                    )}
                </div>

                <div className="space-y-4 rounded-md border p-4">
                    <h4 className="text-sm font-medium">SEO Details</h4>
                    
                    {/* Focus Keyword Input for Analysis Only */}
                    <FormItem>
                        <FormLabel>Focus Keyword (for SEO Analysis)</FormLabel>
                        <FormControl>
                            <Input 
                                placeholder="Enter keyword to analyze" 
                                value={focusKeyword}
                                onChange={(e) => setFocusKeyword(e.target.value)}
                            />
                        </FormControl>
                        <FormDescription>
                            This keyword is used only for real-time analysis below.
                        </FormDescription>
                    </FormItem>

                    <FormField control={form.control} name="metaTitle" render={({ field }) => (
                        <FormItem><FormLabel>Meta Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="metaDescription" render={({ field }) => (
                        <FormItem><FormLabel>Meta Description</FormLabel><FormControl><Textarea rows={3} {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="metaKeywords" render={({ field }) => (
                        <FormItem><FormLabel>Meta Keywords</FormLabel><FormControl><Input placeholder="e.g., marketing, seo, growth" {...field} /></FormControl><FormDescription>Separate keywords with a comma.</FormDescription><FormMessage /></FormItem>
                    )} />

                    {/* ✅ Real-time SEO Scorecard */}
                    <SEOAnalyzer 
                        content={watchedValues.content}
                        keyword={focusKeyword}
                        title={watchedValues.headline}
                        metaTitle={watchedValues.metaTitle}
                        metaDesc={watchedValues.metaDescription}
                        metaKeywords={watchedValues.metaKeywords}
                    />
                </div>

                <Button type="submit" disabled={form.formState.isSubmitting || isUploading} className="w-full">
                    {form.formState.isSubmitting ? "Saving..." : isUpdateMode ? "Update Post" : "Create Post"}
                </Button>
            </form>
        </Form>
    );
}