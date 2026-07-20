import { useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { uploadDocument } from "../../api/teacher";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UploadCard({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a PDF.");
      return;
    }

    try {
      setLoading(true);

      const response = await uploadDocument(
        file,
        topic
      );

      toast.success(response.message);

      if (onUploadSuccess) {
        onUploadSuccess();
      }

      setFile(null);

    } catch (err) {
      toast.error(
        err.response?.data?.detail ||
        "Upload failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>

      <CardHeader>

        <CardTitle>
          Upload Study Material
        </CardTitle>

      </CardHeader>

      <CardContent className="space-y-5">

        <div>

          <Label>PDF Document</Label>

          <Input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
          />

        </div>

        <div>

          <Label>Topic</Label>

          <Input
            type="text"
            value={topic}
            onChange={(e) =>
              setTopic(e.target.value)
            }
          />

        </div>

        <Button
          className="w-full"
          disabled={loading}
          onClick={handleUpload}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload PDF
            </>
          )}
        </Button>

      </CardContent>

    </Card>
  );
}