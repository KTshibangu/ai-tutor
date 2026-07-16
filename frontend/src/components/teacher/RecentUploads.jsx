import { useEffect, useState } from "react";

import { Card } from "@/components/ui/card";

import { getDocuments } from "../../api/teacher";

export default function RecentUploads() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    loadDocuments();
  }, []);

  async function loadDocuments() {
    try {
      const docs = await getDocuments();
      setDocuments(docs);
    } catch (err) {
      console.error(err);
    }
  }

  if (documents.length === 0) {
    return (
      <Card className="p-6">
        No documents uploaded yet.
      </Card>
    );
  }

  return (
    <div className="space-y-4">

      {documents.map((doc) => (

        <Card
          key={doc.id}
          className="p-5"
        >

          <div className="flex justify-between items-center">

            <div>

              <h3 className="font-semibold">
                {doc.filename}
              </h3>

              <p className="text-sm text-gray-500">
                Grade {doc.grade}
              </p>

            </div>

            <span className="text-sm text-green-600">
              {doc.access}
            </span>

          </div>

        </Card>

      ))}

    </div>
  );
}