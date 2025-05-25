import React, { useState } from "react";

const Admin = () => {
  const [activePage, setActivePage] = useState("myEvents");
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Sample Event",
      date: "2025-06-01",
      status: "pending",
      participants: [],
    },
  ]);

  const addEvent = (event) => {
    setEvents((prev) => [...prev, { ...event, id: Date.now(), participants: [] }]);
    setActivePage("myEvents");
  };

  const updateEvent = (id, updatedEvent) => {
    setEvents((prev) =>
      prev.map((ev) => (ev.id === id && ev.status === "pending" ? { ...ev, ...updatedEvent } : ev))
    );
  };

  const addParticipant = (eventId, participant) => {
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === eventId && ev.status === "approved"
          ? { ...ev, participants: [...ev.participants, participant] }
          : ev
      )
    );
  };

  const handleLogout = () => {
    alert("Logged out!");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md border-r border-gray-200 flex flex-col p-6">
        <h2 className="text-3xl font-bold mb-8 text-indigo-600">Dashboard</h2>
        <nav className="flex flex-col gap-4">
          <button
            onClick={() => setActivePage("myEvents")}
            className={`text-left px-4 py-2 rounded-lg font-semibold transition ${
              activePage === "myEvents"
                ? "bg-indigo-600 text-white shadow"
                : "text-gray-700 hover:bg-indigo-100"
            }`}
          >
            My Events
          </button>
          <button
            onClick={() => setActivePage("createEvent")}
            className={`text-left px-4 py-2 rounded-lg font-semibold transition ${
              activePage === "createEvent"
                ? "bg-indigo-600 text-white shadow"
                : "text-gray-700 hover:bg-indigo-100"
            }`}
          >
            Create Event
          </button>
          <button
            onClick={() => setActivePage("addParticipants")}
            className={`text-left px-4 py-2 rounded-lg font-semibold transition ${
              activePage === "addParticipants"
                ? "bg-indigo-600 text-white shadow"
                : "text-gray-700 hover:bg-indigo-100"
            }`}
          >
            Add Participants
          </button>
          <button
            onClick={handleLogout}
            className="mt-auto px-4 py-2 rounded-lg font-semibold text-red-600 hover:bg-red-100 transition"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10">
        {activePage === "myEvents" && <MyEventsPage events={events} updateEvent={updateEvent} />}
        {activePage === "createEvent" && <CreateEventPage addEvent={addEvent} />}
        {activePage === "addParticipants" && (
          <AddParticipantsPage events={events} addParticipant={addParticipant} />
        )}
      </main>
    </div>
  );
};





const MyEventsPage = ({ events, updateEvent }) => {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    datetime: "",
    location: "",
    category: categories[0],
  });

  const startEdit = (event) => {
    setEditId(event.id);
    setEditData({
      title: event.title || "",
      description: event.description || "",
      datetime: event.datetime || "",
      location: event.location || "",
      category: event.category || categories[0],
    });
  };

  const saveEdit = () => {
    updateEvent(editId, editData);
    setEditId(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-indigo-700">My Events</h1>
      {events.length === 0 ? (
        <p className="text-gray-500 text-lg">You have not created any events yet.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Description</th>
              <th className="py-3 px-4 text-left">Date & Time</th>
              <th className="py-3 px-4 text-left">Location</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Participants</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((ev) => (
              <tr
                key={ev.id}
                className="border-b border-gray-300 hover:bg-gray-50 transition"
              >
                {editId === ev.id ? (
                  <>
                    <td className="py-2 px-3">
                      <input
                        type="text"
                        value={editData.title}
                        onChange={(e) =>
                          setEditData({ ...editData, title: e.target.value })
                        }
                        className="w-full border border-indigo-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </td>
                    <td className="py-2 px-3">
                      <textarea
                        value={editData.description}
                        onChange={(e) =>
                          setEditData({ ...editData, description: e.target.value })
                        }
                        className="w-full border border-indigo-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        rows={2}
                      />
                    </td>
                    <td className="py-2 px-3">
                      <input
                        type="datetime-local"
                        value={editData.datetime}
                        onChange={(e) =>
                          setEditData({ ...editData, datetime: e.target.value })
                        }
                        className="w-full border border-indigo-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </td>
                    <td className="py-2 px-3">
                      <input
                        type="text"
                        value={editData.location}
                        onChange={(e) =>
                          setEditData({ ...editData, location: e.target.value })
                        }
                        className="w-full border border-indigo-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </td>
                    <td className="py-2 px-3">
                      <select
                        value={editData.category}
                        onChange={(e) =>
                          setEditData({ ...editData, category: e.target.value })
                        }
                        className="w-full border border-indigo-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-2 px-3 text-yellow-700 font-semibold">
                      {ev.status.charAt(0).toUpperCase() + ev.status.slice(1)}
                    </td>
                    <td className="py-2 px-3 text-center">
                      {ev.participants?.length || 0}
                    </td>
                    <td className="py-2 px-3 flex justify-center gap-2">
                      <button
                        onClick={saveEdit}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-2 px-3 font-semibold text-indigo-800">{ev.title}</td>
                    <td className="py-2 px-3">{ev.description}</td>
                    <td className="py-2 px-3">
                      {new Date(ev.datetime).toLocaleString()}
                    </td>
                    <td className="py-2 px-3">{ev.location}</td>
                    <td className="py-2 px-3">{ev.category}</td>
                    <td
                      className={`py-2 px-3 font-semibold ${
                        ev.status === "approved"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {ev.status.charAt(0).toUpperCase() + ev.status.slice(1)}
                    </td>
                    <td className="py-2 px-3 text-center">
                      {ev.participants?.length || 0}
                    </td>
                    <td className="py-2 px-3 text-center">
                      {ev.status === "pending" && (
                        <button
                          onClick={() => startEdit(ev)}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};







const categories = ["Tech", "Education", "Entertainment"];

const CreateEventPage = ({ addEvent }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    datetime: "",
    location: "",
    category: categories[0],
    imageFile: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.title ||
      !formData.description ||
      !formData.datetime ||
      !formData.location ||
      !formData.category
    ) {
      alert("Please fill all fields");
      return;
    }

    if (!formData.imageFile) {
      alert("Please upload an event image");
      return;
    }

    // Prepare data for submission
    // For now, imageFile will be handled separately during upload to Supabase Storage
    const newEvent = {
      title: formData.title,
      description: formData.description,
      datetime: formData.datetime,
      location: formData.location,
      category: formData.category,
      status: "pending",
      // We will store image URL after upload; here just placeholder filename
      imageUrl: formData.imageFile.name,
    };

    addEvent(newEvent);

    // Reset form
    setFormData({
      title: "",
      description: "",
      datetime: "",
      location: "",
      category: categories[0],
      imageFile: null,
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 border border-gray-200">
      <h1 className="text-4xl font-extrabold mb-8 text-indigo-700 text-center">Create Event</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Event Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full border border-indigo-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full border border-indigo-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows={4}
          required
        />

        <input
          type="datetime-local"
          value={formData.datetime}
          onChange={(e) => setFormData({ ...formData, datetime: e.target.value })}
          className="w-full border border-indigo-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="w-full border border-indigo-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full border border-indigo-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFormData({ ...formData, imageFile: e.target.files[0] })}
          className="w-full"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
        >
          Submit for Approval
        </button>
      </form>
    </div>
  );
};




const AddParticipantsPage = ({ events, addParticipant }) => {
  const [selectedEventId, setSelectedEventId] = useState("");
  const [participantName, setParticipantName] = useState("");

  const handleAdd = () => {
    if (!selectedEventId || !participantName) {
      alert("Select event and enter participant name");
      return;
    }
    addParticipant(Number(selectedEventId), participantName);
    setParticipantName("");
  };

  const approvedEvents = events.filter((ev) => ev.status === "approved");

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 border border-gray-200">
      <h1 className="text-4xl font-extrabold mb-8 text-indigo-700 text-center">Add Participants</h1>
      {approvedEvents.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No approved events available to add participants.
        </p>
      ) : (
        <>
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="w-full border border-indigo-300 rounded-md px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Event</option>
            {approvedEvents.map((ev) => (
              <option key={ev.id} value={ev.id}>
                {ev.title} - {ev.date}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Participant Name"
            value={participantName}
            onChange={(e) => setParticipantName(e.target.value)}
            className="w-full border border-indigo-300 rounded-md px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleAdd}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Add Participant
          </button>
        </>
      )}
    </div>
  );
};

export default Admin;
