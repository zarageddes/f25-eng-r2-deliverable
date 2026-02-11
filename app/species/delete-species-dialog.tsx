import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { createBrowserSupabaseClient } from "@/lib/client-utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type Database } from "@/lib/schema";

type Species = Database["public"]["Tables"]["species"]["Row"];

export default function DeleteSpeciesDialog({ species }: { species: Species }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const supabase = createBrowserSupabaseClient();
    const { error } = await supabase.from("species").delete().eq("id", species.id);

    setLoading(false);

    if (error) {
      return toast({
        title: "Failed to delete species.",
        description: error.message,
        variant: "destructive",
      });
    }

    setOpen(false);
    router.refresh();

    toast({
      title: "Species deleted!",
      description: `${species.scientific_name} was removed successfully.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="w-full mb-2">
          <Icons.trash className="mr-2 h-5 w-5" />
          Delete Species
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Delete Species?</DialogTitle>
        </DialogHeader>
        <p className="mb-4">
          Are you sure you want to delete <strong>{species.scientific_name}</strong>? This action cannot be undone.
        </p>
        <div className="flex gap-2">
        <Button
          variant="destructive"
          onClick={() => void handleDelete()}
          disabled={loading}
          className="flex-auto"
        >
            {loading ? "Deleting..." : "Delete"}
          </Button>
          <DialogClose asChild>
            <Button variant="secondary" className="flex-auto">
              Cancel
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
