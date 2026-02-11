import { Separator } from "@/components/ui/separator";
import { TypographyH2 } from "@/components/ui/typography";
import { createServerSupabaseClient } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import AddSpeciesDialog from "./add-species-dialog";
import SpeciesCard from "./species-card";

type Species = {
  id: number;
  author: string;
  common_name: string | null;
  description: string | null;
  kingdom: "Animalia" | "Plantae" | "Fungi" | "Protista" | "Archaea" | "Bacteria";
  scientific_name: string;
  total_population: number | null;
  image: string | null;
};

export default async function SpeciesList() {
  // Create supabase server component client and obtain user session from stored cookie
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // this is a protected route - only users who are signed in can view this route
    redirect("/");
  }

  // Obtain the ID of the currently signed-in user
  const sessionId = session.user.id;

  const { data: species } = await supabase.from("species").select("*").order("id", { ascending: false }).returns<Species[]>();

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <TypographyH2>Species List</TypographyH2>
        <AddSpeciesDialog userId={sessionId} />
      </div>
      <Separator className="my-4" />
      <div className="flex flex-wrap justify-center">
        {species?.map((species) => (
          <SpeciesCard key={species.id} species={species} sessionId={sessionId} />
        ))}
      </div>
    </>
  );
}
