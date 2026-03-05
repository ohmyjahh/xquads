import { parseSquadBySlug } from '@/lib/parsers/squad-parser';
import { SquadDetail } from '@/components/squads/squad-detail';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function SquadDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const squad = parseSquadBySlug(slug);

  if (!squad) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <Link
        href="/squads"
        className="text-sm text-[#A3A3A8] hover:text-[#F07652] transition-colors"
      >
        &larr; Voltar para squads
      </Link>
      <SquadDetail squad={squad} />
    </div>
  );
}
