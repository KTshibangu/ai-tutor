import { useState } from "react";
import UploadCard from "../components/teacher/UploadCard";
import RecentUploads from "../components/teacher/RecentUploads";


export default function TeacherDashboard() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Teacher Dashboard
        </h1>

        <p className="text-gray-500">
          Upload study material for students.
        </p>

      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        <UploadCard onUploadSuccess={() => setRefreshKey((prev) => prev + 1)}/>

        <RecentUploads key={refreshKey}/>

      </div>

    </div>
  );
}