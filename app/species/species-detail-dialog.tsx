"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Database } from "@/lib/schema";
import { useState } from "react";

type Species = Database["public"]["Tables"]["species"]["Row"];

export default function SpeciesDetailDialog({ species }: { species: Species }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-3 w-full">Learn More</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{species.scientific_name}</DialogTitle>
          <DialogDescription>{species.common_name ?? species.scientific_name}</DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <p>
            <strong>Kingdom:</strong> {species.kingdom}
          </p>
          <p>
            <strong>Total population:</strong> {species.total_population ?? "Unknown"}
          </p>
          <p>
            <strong>Description:</strong> {species.description}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
