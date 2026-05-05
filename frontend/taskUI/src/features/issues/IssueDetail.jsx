import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getIssueById,
  updateStatus,
  addComment,
  getComments,
  deleteComment,
} from "../../api/issueApi";
import {
  ChatBubbleLeftIcon,
  PaperClipIcon,
  ArrowPathIcon,
} from "@heroicons/react/20/solid";
import Sidebar from "../../layouts/Sidebar";

export default function IssueDetail() {
  const { id } = useParams();
  const [issue, setIssue] = useState([]);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const profile = JSON.parse(localStorage.getItem("profile"));
  const role = JSON.parse(localStorage.getItem("role"));

  const load = async () => {
    const res = await getIssueById(id);
    setIssue(res.data);
  };

  const changeStatus = async (status) => {
    await updateStatus(id, status, "admin");
    load();
  };

  const submitComment = async () => {
    await addComment(id, profile.userOfficialEmail, comment);
    setComment("");
    load();
    loadComments();
  };

  const loadComments = async () => {
    if (issue) {
      getComments(id)
        .then((res) => {
          setComments(res.data || []);
        })
        .catch((err) => {
          console.error("Error fetching comments:", err);
        });
    }
  };
  useEffect(() => {
    load();
    loadComments();
  }, []);

  const deleteComments = async (commentId) => {
    try {
      await deleteComment(commentId);
      loadComments();
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  if (!issue)
    return (
      <div className="flex h-screen items-center justify-center">
        <ArrowPathIcon className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-x-8 pl-72">
          {/* Main Content: Header, Description, Comments */}
          <div className="lg:col-span-2">
            <div className="border-b border-gray-200 pb-5">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:tracking-tight">
                {issue.issueTitle}
              </h2>
              <div className="mt-2 flex items-center gap-x-3 text-sm text-gray-500">
                <span className="font-semibold text-indigo-600">
                  {issue.issueKey || "ISSUE-101"}
                </span>
                <span>•</span>
                <span>Created by {issue.reporterEmail || "Unknown"}</span>
              </div>
            </div>

            <div className="py-6">
              <h3 className="text-sm font-medium text-gray-900">Description</h3>
              <div className="mt-2 prose prose-sm text-gray-600">
                <p>{issue.issueDescription || "No description provided."}</p>
              </div>
            </div>

            {/* Comment Section */}
            <section className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <ChatBubbleLeftIcon className="h-5 w-5 text-gray-400" />
                Comments
              </h3>
              <div className="mt-8 space-y-6">
                {console.log("Rendering comments:", comments)}
                {comments.map((c) => (
                  <div key={c.id} className="group flex gap-x-4">
                    {/* Avatar with Initial */}
                    <div className="relative flex-none">
                      <div className="h-10 w-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center shadow-sm">
                        <span className="text-sm font-semibold text-indigo-700">
                          {c.author?.charAt(0).toUpperCase() || "U"}
                        </span>
                      </div>
                    </div>

                    {/* Comment Content */}
                    <div className="flex-auto rounded-xl bg-gray-50 p-4 ring-1 ring-inset ring-gray-200 transition-all hover:bg-gray-100/80">
                      {/* Header: Author, Label, and Time/Reply */}
                      <div className="flex items-center justify-between gap-x-4 border-b border-gray-100 pb-2 mb-3">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-gray-900">
                            {c.author}
                          </h4>
                          {/* Short Label Tag */}
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700  tracking-tight">
                            {c.authorEmail}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <time className="text-xs text-gray-400">
                            2 days ago
                          </time>
                          <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800">
                            Reply
                          </button>
                          {role === "ADMIN" && (
                            <button
                              onClick={() => deleteComments(c.id)}
                              className="text-xs font-bold text-red-600 hover:text-indigo-800"
                            >
                              delete
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Comment Body: Outside the small span, allowing full width */}
                      <div className="text-sm leading-relaxed text-gray-700 break-all">
                        {c.body}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-x-3">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex-none" />
                <div className="min-w-0 flex-1">
                  <div className="relative">
                    <textarea
                      rows={3}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                      placeholder="Add a comment..."
                    />
                  </div>
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={submitComment}
                      className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                    >
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar: Status & Attachments */}
          <aside className="mt-10 lg:mt-0 lg:border-l lg:border-gray-200 lg:pl-8">
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                  Status
                </h3>
                <div className="mt-3 flex items-center gap-3">
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    {issue.issueStatus}
                  </span>
                  <button
                    onClick={() => changeStatus("IN_PROGRESS")}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Move to In Progress
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                  Attachments
                </h3>
                <div className="mt-3">
                  <label className="flex cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-300 px-6 py-4 hover:border-indigo-500 transition-colors">
                    <div className="text-center">
                      <PaperClipIcon className="mx-auto h-6 w-6 text-gray-400" />
                      <span className="mt-2 block text-xs font-medium text-gray-600">
                        Upload File
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) =>
                          uploadFile(id, e.target.files[0], "admin")
                        }
                      />
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
