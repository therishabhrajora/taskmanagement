import { useState } from "react";
import Sidebar from "./Sidebar";
import { uploadFile, deleteFile, downloadFile } from "../../api/attachmentApi";
import {
  PaperClipIcon,
  TrashIcon,
  ArrowDownTrayIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

export default function AttachmentPage({ issueId, attachments = [] }) {
  const [file, setFile] = useState(null);
  const [list, setList] = useState(attachments);

  const handleUpload = async () => {
    if (!file) return;
    try {
      const res = await uploadFile(issueId, file, "admin");
      setList([...list, res.data]);
      setFile(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    await deleteFile(id);
    setList(list.filter((f) => f.id !== id));
  };

  const handleDownload = (id) => {
    window.open(downloadFile(id), "_blank");
  };

  return (
    <>
       <Sidebar></Sidebar>
      <div className="pl-72 m-5 max-w-4xl mx-auto">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Attachments
            </h2>
          </div>
        </div>

        {/* Upload Section */}
        <div className="mt-2 flex items-center gap-x-3 rounded-lg border border-dashed border-gray-900/25 p-6 mb-8 bg-white">
          <input
            type="file"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            onClick={handleUpload}
            className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Upload
          </button>
          <Homebtn />
        </div>

        {/* File List */}
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {list.length === 0 ? (
              <li className="px-4 py-8 text-center text-sm text-gray-500">
                No attachments found.
              </li>
            ) : (
              list.map((file) => (
                <li
                  key={file.id}
                  className="px-4 py-4 sm:px-6 hover:bg-gray-50 flex items-center justify-between"
                >
                  <div className="flex items-center min-w-0">
                    <PaperClipIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <div className="ml-4">
                      <p className="truncate text-sm font-medium text-indigo-600">
                        {file.filename}
                      </p>
                      <p className="flex items-center text-xs text-gray-500">
                        {(file.fileSize / 1024).toFixed(2)} KB • Uploaded by{" "}
                        {file.uploadedBy}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDownload(file.id)}
                      className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                      title="Download"
                    >
                      <ArrowDownTrayIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(file.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
