"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useEffect, useRef, useState } from "react";
import { ConcertCard } from "@/components/common/concert-card";
import {
  BadgeIcon,
  CircleXIcon,
  DeleteAlertIcon,
  SaveIcon,
  TrashIcon,
  UserIcon
} from "@/components/common/icons";
import { StatCard } from "@/components/common/stat-card";
import { Toast } from "@/components/common/toast";
import { apiRequest } from "@/lib/api-client";
import { queryKeys } from "@/lib/query-keys";
import { AdminSummary, ApiSuccessResponse, Concert } from "@/lib/types";

type AdminTab = "overview" | "create";

type ToastState = {
  message: string;
  tone: "success" | "error";
};

type CreateConcertPayload = {
  name: string;
  description: string;
  totalSeats: number;
};

const initialForm = {
  name: "",
  description: "",
  totalSeats: "500"
};

const initialSummary: AdminSummary = {
  totalSeats: 0,
  reserveCount: 0,
  cancelCount: 0
};

export function AdminHome() {
  const queryClient = useQueryClient();

  const [tab, setTab] = useState<AdminTab>("overview");
  const [deleteTarget, setDeleteTarget] = useState<Concert | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [form, setForm] = useState(initialForm);
  const [formError, setFormError] = useState<string | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);

  const showToast = (message: string, tone: ToastState["tone"] = "success") => {
    setToast({ message, tone });

    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = window.setTimeout(() => setToast(null), 2400);
  };

  const concertsQuery = useQuery({
    queryKey: queryKeys.concerts,
    queryFn: () => apiRequest<Concert[]>({ path: "/concerts" }),
    staleTime: 10_000
  });

  const summaryQuery = useQuery({
    queryKey: queryKeys.adminSummary,
    queryFn: () => apiRequest<AdminSummary>({ path: "/admin/summary" }),
    staleTime: 10_000
  });

  const createConcertMutation = useMutation({
    mutationFn: (payload: CreateConcertPayload) =>
      apiRequest<Concert>({
        path: "/admin/concerts",
        method: "POST",
        body: JSON.stringify(payload)
      })
  });

  const deleteConcertMutation = useMutation({
    mutationFn: (concertId: string) =>
      apiRequest<ApiSuccessResponse>({
        path: `/admin/concerts/${concertId}`,
        method: "DELETE"
      })
  });

  const refreshAdminData = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: queryKeys.concerts }),
      queryClient.invalidateQueries({ queryKey: queryKeys.adminSummary })
    ]);
  };

  const isLoading = concertsQuery.isLoading || summaryQuery.isLoading;
  const pageError = concertsQuery.error ?? summaryQuery.error;
  const pageErrorMessage = pageError instanceof Error ? pageError.message : null;
  const concerts = concertsQuery.data ?? [];
  const summary = summaryQuery.data ?? initialSummary;

  useEffect(() => {
    if (pageErrorMessage) {
      showToast(pageErrorMessage, "error");
    }
  }, [pageErrorMessage]);

  useEffect(
    () => () => {
      if (toastTimeoutRef.current) {
        window.clearTimeout(toastTimeoutRef.current);
      }
    },
    []
  );

  const onConfirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      const result = await deleteConcertMutation.mutateAsync(deleteTarget.id);
      setDeleteTarget(null);
      await refreshAdminData();
      showToast(result.message ?? "Delete successfully", "success");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Delete failed";
      showToast(message, "error");
    }
  };

  const onSaveConcert = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parsedTotalSeats = Number(form.totalSeats);
    const isValidSeats = Number.isInteger(parsedTotalSeats) && parsedTotalSeats > 0;

    if (!form.name.trim() || !form.description.trim() || !isValidSeats) {
      setFormError("Please complete all fields with valid values");
      return;
    }

    setFormError(null);

    try {
      await createConcertMutation.mutateAsync({
        name: form.name.trim(),
        description: form.description.trim(),
        totalSeats: parsedTotalSeats
      });

      setForm(initialForm);
      setTab("overview");
      await refreshAdminData();
      showToast("Create successfully", "success");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Create failed";
      setFormError(message);
      showToast(message, "error");
    }
  };

  return (
    <section className="relative">
      {toast && <Toast message={toast.message} tone={toast.tone} />}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <StatCard
          title="Total of seats"
          value={summary.totalSeats}
          tone="info"
          icon={<UserIcon className="h-8 w-8" />}
        />
        <StatCard
          title="Reserve"
          value={summary.reserveCount}
          tone="success"
          icon={<BadgeIcon className="h-8 w-8" />}
        />
        <StatCard
          title="Cancel"
          value={summary.cancelCount}
          tone="danger"
          icon={<CircleXIcon className="h-8 w-8" />}
        />
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
          {isLoading && <p className="text-lg text-app-text">Loading concerts...</p>}
          {!isLoading && pageErrorMessage && <p className="text-lg text-app-danger">{pageErrorMessage}</p>}
          {!isLoading && !pageErrorMessage && concerts.length === 0 && (
            <p className="text-lg text-app-text">No concerts yet</p>
          )}
          {!isLoading &&
            concerts.map((concert) => (
              <ConcertCard
                key={concert.id}
                concert={concert}
                actionLabel="Delete"
                actionTone="danger"
                actionIcon={<TrashIcon className="h-5 w-5" />}
                onAction={() => setDeleteTarget(concert)}
              />
            ))}
        </div>
      ) : (
        <form
          onSubmit={onSaveConcert}
          className="mt-6 rounded-lg border border-app-border bg-transparent p-5 sm:p-6 lg:p-8"
        >
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
              <div className="relative">
                <input
                  type="number"
                  min={1}
                  value={form.totalSeats}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      totalSeats: event.target.value
                    }))
                  }
                  className="w-full rounded border border-[#A7A7A7] bg-white px-4 py-3 pr-11 text-base outline-none focus:border-app-primary"
                />
                <UserIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-app-text/70" />
              </div>
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

          {formError && <p className="mt-4 text-base font-medium text-app-danger">{formError}</p>}

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={createConcertMutation.isPending}
              className="inline-flex items-center gap-2 rounded bg-app-primary px-10 py-2.5 text-lg font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              <SaveIcon className="h-5 w-5" />
              {createConcertMutation.isPending ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/35 px-4">
          <div className="w-full max-w-[540px] rounded-lg bg-white p-8 text-center shadow-panel">
            <div className="mx-auto mb-4 flex h-[48px] w-[48px] items-center justify-center text-[#E63946]">
              <DeleteAlertIcon className="h-[48px] w-[48px]" />
            </div>
            <p className="text-2xl font-semibold text-app-text">Are you sure to delete?</p>
            <p className="mt-2 text-xl font-semibold text-app-text">
              &quot;{deleteTarget.name}&quot;
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={deleteConcertMutation.isPending}
                className="rounded border border-[#D2D2D2] px-4 py-2.5 text-lg font-semibold text-app-text disabled:cursor-not-allowed disabled:opacity-70"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirmDelete}
                disabled={deleteConcertMutation.isPending}
                className="rounded bg-app-danger px-4 py-2.5 text-lg font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                {deleteConcertMutation.isPending ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
