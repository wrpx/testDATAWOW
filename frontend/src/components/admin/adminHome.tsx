"use client";

import { useState } from "react";
import { ConcertCard } from "@/components/common/concertCard";
import {
  BadgeIcon,
  CircleXIcon,
  DeleteAlertIcon,
  SaveIcon,
  TrashIcon,
  UserIcon
} from "@/components/common/icons";
import { StatCard } from "@/components/common/statCard";
import { Toast } from "@/components/common/toast";
import { useAdminConcertActions } from "@/hooks/admin/useAdminConcertActions";
import {
  AdminCreateConcertFormValues,
  useAdminCreateConcertForm
} from "@/hooks/admin/useAdminCreateConcertForm";
import { useAdminDashboardData } from "@/hooks/admin/useAdminDashboardData";
import { useTimedToast } from "@/hooks/useTimedToast";
import { Concert } from "@/lib/types";

type AdminTab = "overview" | "create";

export function AdminHome() {
  const [tab, setTab] = useState<AdminTab>("overview");
  const [deleteTarget, setDeleteTarget] = useState<Concert | null>(null);

  const { toast, showToast } = useTimedToast(2400);
  const { concerts, summary, isLoading, pageErrorMessage } = useAdminDashboardData();
  const { createConcertMutation, deleteConcertMutation, refreshAdminData } = useAdminConcertActions();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setServerError,
    clearServerError
  } = useAdminCreateConcertForm();

  const onSubmitCreateConcert = handleSubmit(async (values: AdminCreateConcertFormValues) => {
    clearServerError();

    try {
      await createConcertMutation.mutateAsync({
        name: values.name.trim(),
        description: values.description.trim(),
        totalSeats: values.totalSeats
      });

      reset();
      setTab("overview");
      await refreshAdminData();
      showToast("Create successfully", "success");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Create failed";
      setServerError(message);
      showToast(message, "error");
    }
  });

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
          onSubmit={onSubmitCreateConcert}
          className="mt-6 rounded-lg border border-app-border bg-transparent p-5 sm:p-6 lg:p-8"
        >
          <h3 className="text-4xl font-semibold text-app-primary sm:text-5xl">Create</h3>
          <div className="my-6 h-px bg-app-border" />
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="text-lg text-app-text">
              <span className="mb-2 block">Concert Name</span>
              <input
                {...register("name", {
                  required: "Please input concert name",
                  validate: (value) => value.trim().length > 0 || "Please input concert name"
                })}
                className="w-full rounded border border-[#A7A7A7] bg-white px-4 py-3 text-base outline-none focus:border-app-primary"
                placeholder="Please input concert name"
              />
              {errors.name && <p className="mt-2 text-base text-app-danger">{errors.name.message}</p>}
            </label>
            <label className="text-lg text-app-text">
              <span className="mb-2 block">Total of seat</span>
              <div className="relative">
                <input
                  type="number"
                  min={1}
                  {...register("totalSeats", {
                    required: "Please input total seat",
                    valueAsNumber: true,
                    min: {
                      value: 1,
                      message: "Total seat must be greater than 0"
                    }
                  })}
                  className="w-full rounded border border-[#A7A7A7] bg-white px-4 py-3 pr-11 text-base outline-none focus:border-app-primary"
                />
                <UserIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-app-text/70" />
              </div>
              {errors.totalSeats && (
                <p className="mt-2 text-base text-app-danger">{errors.totalSeats.message}</p>
              )}
            </label>
          </div>

          <label className="mt-6 block text-lg text-app-text">
            <span className="mb-2 block">Description</span>
            <textarea
              {...register("description", {
                required: "Please input description",
                validate: (value) => value.trim().length > 0 || "Please input description"
              })}
              rows={4}
              className="w-full rounded border border-[#A7A7A7] bg-white px-4 py-3 text-base outline-none focus:border-app-primary"
              placeholder="Please input description"
            />
            {errors.description && (
              <p className="mt-2 text-base text-app-danger">{errors.description.message}</p>
            )}
          </label>

          {errors.root?.serverError?.message && (
            <p className="mt-4 text-base font-medium text-app-danger">{errors.root.serverError.message}</p>
          )}

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
