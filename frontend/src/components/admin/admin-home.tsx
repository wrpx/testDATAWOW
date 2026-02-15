"use client";

import { FormEvent, useMemo, useState } from "react";
import { ConcertCard } from "@/components/common/concert-card";
import { StatCard } from "@/components/common/stat-card";
import { Toast } from "@/components/common/toast";
import { adminConcertsMock } from "@/lib/mock-data";
import { Concert } from "@/lib/types";

type AdminTab = "overview" | "create";

const initialForm = {
  name: "",
  description: "",
  totalSeats: 500
};

export function AdminHome() {
  const [tab, setTab] = useState<AdminTab>("overview");
  const [concerts, setConcerts] = useState<Concert[]>(adminConcertsMock);
  const [deleteTarget, setDeleteTarget] = useState<Concert | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [form, setForm] = useState(initialForm);

  const totalSeats = useMemo(
    () => concerts.reduce((sum, concert) => sum + concert.totalSeats, 0),
    [concerts]
  );
  const reserved = useMemo(
    () => concerts.reduce((sum, concert) => sum + concert.reservedSeats, 0),
    [concerts]
  );
  const canceled = 12;

  const showToast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(null), 2200);
  };

  const onConfirmDelete = () => {
    if (!deleteTarget) return;

    setConcerts((prev) => prev.filter((item) => item.id !== deleteTarget.id));
    setDeleteTarget(null);
    showToast("Delete successfully");
  };

  const onSaveConcert = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name.trim() || !form.description.trim() || form.totalSeats < 1) return;

    const newConcert: Concert = {
      id: `concert-${Date.now()}`,
      name: form.name.trim(),
      description: form.description.trim(),
      totalSeats: form.totalSeats,
      reservedSeats: 0
    };

    setConcerts((prev) => [newConcert, ...prev]);
    setForm(initialForm);
    setTab("overview");
    showToast("Create successfully");
  };

  return (
    <section className="relative">
      {toastMessage && <Toast message={toastMessage} />}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <StatCard title="Total of seats" value={totalSeats} tone="info" icon="◔" />
        <StatCard title="Reserve" value={reserved} tone="success" icon="◉" />
        <StatCard title="Cancel" value={canceled} tone="danger" icon="⊗" />
      </div>

      <div className="mt-8 flex gap-8 border-b border-app-border">
        <button
          type="button"
          onClick={() => setTab("overview")}
          className={`tab-button ${tab === "overview" ? "tab-button-active" : ""}`}
        >
          Overview
        </button>
        <button
          type="button"
          onClick={() => setTab("create")}
          className={`tab-button ${tab === "create" ? "tab-button-active" : ""}`}
        >
          Create
        </button>
      </div>

      {tab === "overview" ? (
        <div className="mt-6 space-y-6">
          {concerts.map((concert) => (
            <ConcertCard
              key={concert.id}
              concert={concert}
              actionLabel="Delete"
              actionTone="danger"
              onAction={() => setDeleteTarget(concert)}
            />
          ))}
        </div>
      ) : (
        <form onSubmit={onSaveConcert} className="mt-6 rounded-lg border border-app-border bg-transparent p-5 sm:p-6 lg:p-8">
          <h3 className="text-4xl font-semibold text-app-primary sm:text-5xl">Create</h3>
          <div className="my-6 h-px bg-app-border" />
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="text-lg text-app-text">
              <span className="mb-2 block">Concert Name</span>
              <input
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                className="w-full rounded border border-[#A7A7A7] bg-white px-4 py-3 text-base outline-none focus:border-app-primary"
                placeholder="Please input concert name"
              />
            </label>
            <label className="text-lg text-app-text">
              <span className="mb-2 block">Total of seat</span>
              <input
                type="number"
                min={1}
                value={form.totalSeats}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    totalSeats: Number(event.target.value) || 0
                  }))
                }
                className="w-full rounded border border-[#A7A7A7] bg-white px-4 py-3 text-base outline-none focus:border-app-primary"
              />
            </label>
          </div>

          <label className="mt-6 block text-lg text-app-text">
            <span className="mb-2 block">Description</span>
            <textarea
              value={form.description}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  description: event.target.value
                }))
              }
              rows={4}
              className="w-full rounded border border-[#A7A7A7] bg-white px-4 py-3 text-base outline-none focus:border-app-primary"
              placeholder="Please input description"
            />
          </label>

          <div className="mt-6 flex justify-end">
            <button type="submit" className="rounded bg-app-primary px-10 py-2.5 text-lg font-semibold text-white">
              Save
            </button>
          </div>
        </form>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/35 px-4">
          <div className="w-full max-w-[540px] rounded-lg bg-white p-8 text-center shadow-panel">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-app-danger text-3xl text-white">
              ×
            </div>
            <p className="text-2xl font-semibold text-app-text">Are you sure to delete?</p>
            <p className="mt-2 text-xl font-semibold text-app-text">"{deleteTarget.name}"</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="rounded border border-[#D2D2D2] px-4 py-2.5 text-lg font-semibold text-app-text"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirmDelete}
                className="rounded bg-app-danger px-4 py-2.5 text-lg font-semibold text-white"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
