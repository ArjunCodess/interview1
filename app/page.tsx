"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
    file: z.string().min(2, {
        message: "file must be at least 2 characters.",
    }),
});

export default function Home() {
    const [category, setCategory] = useState("");
    const [image, setImage] = useState({});

    const submitValueId = () => {
        axios
            .post(
                "https://stage-ad-api.sampurnakart.in/api/repairs/addCategory",
                { categoryName: category }
            )
            .then((response) => console.log(response.data.result._id));

        axios
            .post(
                "https://stage-ad-api.sampurnakart.in/api/repairs/uploadCategoryImage",
                {
                    params: {
                        id: category,
                        image
                    },
                }
            )
            .then((response) => console.log(response.data));
    };

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            file: "",
        },
    });

    // 2. Define a submit handler.
    function onSubmitImage(values: z.infer<typeof formSchema>, e: any) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
        setImage(values.file)
    }

    return (
        <section className="flex h-screen justify-center items-center gap-10">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Create project</CardTitle>
                    <CardDescription>
                        Deploy your new project in one-click.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    placeholder="Name of your category"
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                />
                            </div>
                            {/* <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="framework">Framework</Label>
                                <Select>
                                    <SelectTrigger id="framework">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="next">
                                            Next.js
                                        </SelectItem>
                                        <SelectItem value="sveltekit">
                                            SvelteKit
                                        </SelectItem>
                                        <SelectItem value="astro">
                                            Astro
                                        </SelectItem>
                                        <SelectItem value="nuxt">
                                            Nuxt.js
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div> */}
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button type="submit" onClick={() => submitValueId()}>
                        Deploy
                    </Button>
                </CardFooter>
            </Card>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmitImage)}
                    className="space-y-8 border p-6 rounded-xl"
                >
                    <FormField
                        control={form.control}
                        name="file"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>file</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" type="file" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </section>
    );
}
