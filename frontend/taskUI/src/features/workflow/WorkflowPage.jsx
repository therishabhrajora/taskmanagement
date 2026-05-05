import { useEffect, useState } from "react";
import { getWorkflows } from "../../api/workflowApi";
import { ArrowRightIcon, ArrowsPointingOutIcon, AdjustmentsHorizontalIcon } from "@heroicons/react/20/solid";

export default function WorkflowPage() {
  const [flows, setFlows] = useState([]);

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      const res = await getWorkflows();
      setFlows(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Workflows</h2>
            <p className="mt-1 text-sm text-gray-500">Define and manage state transitions for your issues.</p>
          </div>
          <button className="inline-flex items-center gap-x-2 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <AdjustmentsHorizontalIcon className="-ml-0.5 h-5 w-5 text-gray-400" />
            Configure
          </button>
        </div>

        <div className="space-y-10">
          {flows.map((wf) => (
            <div key={wf.id} className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden">
              <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
                <h4 className="text-base font-semibold leading-6 text-gray-900">{wf.workflowName}</h4>
              </div>

              <div className="px-6 py-8">
                <div className="flow-root">
                  <ul role="list" className="-mb-8">
                    {wf.transaction?.map((t, tIdx) => (
                      <li key={t.id}>
                        <div className="relative pb-8">
                          {/* Vertical Connector Line */}
                          {tIdx !== wf.transaction.length - 1 ? (
                            <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                          ) : null}
                          
                          <div className="relative flex space-x-3">
                            <div>
                              <span className="h-8 w-8 rounded-full bg-indigo-50 flex items-center justify-center ring-8 ring-white">
                                <ArrowsPointingOutIcon className="h-4 w-4 text-indigo-600" aria-hidden="true" />
                              </span>
                            </div>
                            <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                              <div className="flex items-center gap-4">
                                <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                                  {t.fromStatus}
                                </span>
                                <ArrowRightIcon className="h-4 w-4 text-gray-400" />
                                <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                                  {t.toStatus}
                                </span>
                              </div>
                              <div className="whitespace-nowrap text-right text-sm text-gray-500 italic">
                                Transition #{t.id}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
