import { useEffect, useState } from "react";
import {
  getBoard,
  createBoard,
  addColumn,
  addCard,
  moveCard,
} from "../../api/boardApi";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Sidebar from "../../layouts/Sidebar";

export default function BoardPage() {
  const [board, setBoard] = useState(null);
  const [boardName, setBoardName] = useState("");
  const [newColumn, setNewColumn] = useState("");
  const [cardInput, setCardInput] = useState({});

  useEffect(() => {
    loadBoard();
  }, []);

  const loadBoard = async () => {
    try {
      const res = await getBoard(9);
      setBoard(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🧱 CREATE BOARD
  const handleCreateBoard = async () => {
    if (!boardName) return;

    await createBoard({
      name: boardName,
      projectKey: "TASK",
    });

    setBoardName("");
    loadBoard();
  };

  // ➕ ADD COLUMN
  const handleAddColumn = async () => {
    if (!newColumn) return;

    await addColumn(1, {
      name: newColumn,
      statusKey: newColumn.toUpperCase(),
      position: board.columns?.length || 0,
    });

    setNewColumn("");
    loadBoard();
  };

  // ➕ ADD CARD
  const handleAddCard = async (columnId) => {
    const issueId = cardInput[columnId];
    if (!issueId) return;

    await addCard(1, {
      columnId,
      issueId,
    });

    setCardInput({ ...cardInput, [columnId]: "" });
    loadBoard();
  };

  // 🔁 DRAG
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    await moveCard(1, result.draggableId, {
      toColumnId: result.destination.droppableId,
      toPosition: result.destination.index,
    });

    loadBoard();
  };

  if (!board) {
    return (
      <div className="p-6">
        <h2 className="mb-2">Create Board</h2>
        <input
          className="border p-2 rounded"
          placeholder="Board name"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
        />
        <button
          onClick={handleCreateBoard}
          className="ml-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Sidebar />
      {/* HEADER */}
      <div className="ml-76 pt-6 px-6">
        <h1 className="text-2xl font-semibold mb-4">{board.name}</h1>

        {/* ADD COLUMN */}
        <div className="flex gap-2 mb-6">
          <input
            className="border p-2 rounded-lg"
            placeholder="Add column..."
            value={newColumn}
            onChange={(e) => setNewColumn(e.target.value)}
          />
          <button
            onClick={handleAddColumn}
            className="bg-blue-600 text-white px-4 rounded-lg"
          >
            Add
          </button>
        </div>

        {/* BOARD */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex gap-4 overflow-x-auto">
            {board.columns?.map((col) => (
              <Droppable droppableId={String(col.id)} key={col.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-gray-200 rounded-xl p-4 w-72 flex-shrink-0"
                  >
                    {/* COLUMN HEADER */}
                    <div className="flex justify-between mb-3">
                      <h2 className="font-medium">{col.name}</h2>
                      <span className="text-xs text-gray-500">
                        {col.cards?.length || 0}
                      </span>
                    </div>

                    {/* CARDS */}
                    <div className="flex flex-col gap-3">
                      {col.cards?.map((card, index) => (
                        <Draggable
                          key={card.id}
                          draggableId={String(card.id)}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white p-3 rounded-lg shadow hover:shadow-md cursor-pointer"
                            >
                              <p className="text-sm font-medium">
                                Issue #{card.issueId}
                              </p>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>

                    {/* ADD CARD */}
                    <div className="mt-3">
                      <input
                        type="number"
                        placeholder="Issue ID"
                        className="w-full p-2 border rounded text-sm"
                        value={cardInput[col.id] || ""}
                        onChange={(e) =>
                          setCardInput({
                            ...cardInput,
                            [col.id]: e.target.value,
                          })
                        }
                      />
                      <button
                        onClick={() => handleAddCard(col.id)}
                        className="w-full mt-2 bg-green-600 text-white py-1 rounded"
                      >
                        Add Card
                      </button>
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}
