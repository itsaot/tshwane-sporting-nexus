// src/components/CreateCoachForm.tsx
import { useState } from "react";
import { createCoach } from "../services/api";

export default function CreateCoachForm() {
  const [form, setForm] = useState({ name: "", role: "", imageUrl: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await createCoach(form);
      setMessage("Coach added successfully!");
      setForm({ name: "", role: "", imageUrl: "" });
    } catch (err) {
      setMessage("Error adding coach.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded shadow">
      <h2 className="text-xl font-semibold">Add Coach</h2>
      <input
        type="text"
        name="name"
        placeholder="Coach Name"
        value={form.name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="role"
        placeholder="Role (e.g. Head Coach)"
        value={form.role}
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
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Add Coach
      </button>
      {message && <p className="text-sm">{message}</p>}
    </form>
  );
}
