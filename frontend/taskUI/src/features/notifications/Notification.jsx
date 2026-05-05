import { useState } from "react";
import API from "../../api/axios";
import { BellIcon, CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Notification() {
  const [showToast, setShowToast] = useState(false);

  const send = async () => {
    try {
      await API.get("/notifications/notify");
      // Trigger the visual toast
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error("Notification failed", err);
    }
  };

  return (
    <div className="p-8">
      {/* ACTION CARD */}
      <div className="max-w-md mx-auto overflow-hidden rounded-lg bg-white shadow ring-1 ring-black ring-opacity-5">
        <div className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BellIcon className="h-8 w-8 text-indigo-600" aria-hidden="true" />
            </div>
            <div className="ml-4">
              <h3 className="text-base font-semibold leading-6 text-gray-900">System Notifications</h3>
              <p className="mt-1 text-sm text-gray-500">
                Test the global notification system by triggering a server-side alert.
              </p>
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={send}
              className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Trigger Notification
            </button>
          </div>
        </div>
      </div>

      {/* TOAST NOTIFICATION (Fixed Overlay) */}
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-50"
      >
        <div className={`flex w-full flex-col items-center space-y-4 sm:items-end transition-all duration-300 transform ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>
          <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-gray-900">Successfully Sent!</p>
                  <p className="mt-1 text-sm text-gray-500">The notification has been broadcasted to all users.</p>
                </div>
                <div className="ml-4 flex flex-shrink-0">
                  <button
                    type="button"
                    className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={() => setShowToast(false)}
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
