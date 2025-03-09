"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const [cdnUrl, setCdnUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("filename", file.name);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setCdnUrl(result.cdnUrl);
      } else {
        alert(result.error || "Upload failed!");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Something went wrong!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {session ? (
        <>
          <p>Logged in as {session.user?.email}</p>
          <button onClick={() => signOut()} className="px-4 py-2 bg-red-500 text-white rounded">
            Logout
          </button>

          {/* File Upload Section */}
          <input type="file" onChange={handleFileChange} />
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-blue-500 text-white rounded"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>

          {/* Show CDN URL if upload is successful */}
          {cdnUrl && (
            <div>
              <p>Uploaded Image:</p>
              <a href={cdnUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                {cdnUrl}
              </a>
            </div>
          )}
        </>
      ) : (
        <button onClick={() => signIn("discord")} className="px-4 py-2 bg-green-500 text-white rounded">
          Login with Discord
        </button>
      )}
    </div>
  );
}
