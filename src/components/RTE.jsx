import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name = "content", control, label, defaultValue = "" }) {
    return (
        <div className="w-full">
            {label && <label className="inline-block pl-1 mb-1">{label}</label>}

            <Controller
                name={name}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                        apiKey={import.meta.env.VITE_TINYMCE_API_KEY} // Fixed API Key Retrieval
                        initialValue={defaultValue}
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "help",
                                "wordcount",
                            ],
                            toolbar:
                                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        }}
                        onEditorChange={onChange} // Ensuring Correct Change Handling
                    />
                )}
            />
        </div>
    );
}
