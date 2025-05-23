// src/components/CreatePlayerForm.tsx
import { useState } from "react";
import { createPlayer } from "../services/api";

export default function CreatePlayerForm() {
  const [form, setForm] = useState({ name: "", position: "", imageUrl: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await createPlayer(form);
      setMessage("Player created successfully!");
      setForm({ name: "", position: "", imageUrl: "" });
    } catch (err) {
      setMessage("Error creating player.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded shadow">
      <h2 className="text-xl font-semibold">Add Player</h2>
      <input
        type="text"
        name="name"
        placeholder="Player Name"
        value={form.name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="position"
        placeholder="Position"
        value={form.position}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="imageUrl"
        placeholder="Image URL"
        value={form.imageUrl}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Player
      </button>
      {message && <p className="text-sm">{message}</p>}
    </form>
  );
}
