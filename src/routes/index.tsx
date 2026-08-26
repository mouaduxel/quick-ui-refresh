import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Activity,
  BarChart3,
  Barcode,
  Bell,
  Building2,
  CalendarDays,
  ChevronDown,
  ClipboardCheck,
  FileSearch,
  FileText,
  FlaskConical,
  Globe2,
  Home,
  Inbox,
  LayoutGrid,
  Link2,
  type LucideIcon,
  Mail,
  MapPin,
  Printer,
  Receipt,
  Search,
  Send,
  Share2,
  ShieldCheck,
  Star,
  TestTubes,
  Users,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arborescence — Laboratoire des Hôpitaux" },
      {
        name: "description",
        content:
          "Arborescence complète du laboratoire: accueil, technique, biologie, facturation et interopérabilité en un seul écran.",
      },
      { property: "og:title", content: "Arborescence — Laboratoire des Hôpitaux" },
      {
        property: "og:description",
        content:
          "Arborescence complète du laboratoire: accueil, technique, biologie, facturation et interopérabilité en un seul écran.",
      },
    ],
  }),
  component: Index,
});

const toolbar = [
  { label: "Recherche", icon: Search },
  { label: "Saisie de devis", icon: FileText },
  { label: "Saisie de demande", icon: ClipboardCheck },
  { label: "Demandes du jour", icon: CalendarDays },
  { label: "Recherche de demandes", icon: FileSearch },
  { label: "Demandes par patient", icon: Users },
  { label: "Sérothèque", icon: TestTubes },
  { label: "Validation technique", icon: ShieldCheck },
  { label: "Fichiers envoyés", icon: Send },
  { label: "Fichiers reçus", icon: Inbox },
  { label: "Connexions RS232", icon: Share2 },
];

type Group = {
  id: string;
  title: string;
  icon: LucideIcon;
  tone: "blue" | "green" | "amber" | "orange" | "violet";
  sections: { title: string; items: string[] }[];
};

const groups: Group[] = [
  {
    id: "accueil",
    title: "Accueil",
    icon: Home,
    tone: "blue",
    sections: [
      {
        title: "Rendez-vous et devis",
        items: [
          "Saisie de rendez-vous",
          "Planning des rendez-vous",
          "Saisie de devis",
          "Recherche de devis",
        ],
      },
      {
        title: "Demandes",
        items: [
          "Saisie de demande",
          "Réservation de demande",
          "Demandes du jour",
          "Recherche de demandes",
          "Demandes hors délais",
          "Recherche demandes par patient",
          "Recherche demandes archivées",
          "Ordonnances renouvelables",
          "Analyses en cours",
          "Vérification des demandes saisies",
        ],
      },
      { title: "Scans", items: ["Scan en flot", "Suivi des scans en flot", "Recherche de scans"] },
      {
        title: "Transmissions",
        items: [
          "Transmissions automatiques",
          "Transmissions manuelles",
          "Evénements automatiques",
          "Imprimantes",
          "Impressions en cours",
          "Impressions effectuées",
          "Cartes de groupe",
          "Envoyer un message libre",
        ],
      },
      {
        title: "Outils",
        items: [
          "Gestion de mon ordinateur",
          "Dictionnaire des analyses",
          "Impression des planches perso",
          "Réservations de tubes",
          "Recherche de patients",
          "Doublons de patients",
        ],
      },
    ],
  },
  {
    id: "technique",
    title: "Technique",
    icon: FlaskConical,
    tone: "orange",
    sections: [
      {
        title: "Tubes",
        items: [
          "Prélèvements en attente",
          "Attribution des prélèvements",
          "Colisage des tubes",
          "Suivi de tube",
          "Tubes à coliser",
          "Tubes à stabiliser",
          "Tubes de groupes à valider",
          "Bon des transmis",
          "Sérothèque",
        ],
      },
      {
        title: "Résultats",
        items: [
          "Saisie de résultats",
          "Paillasse de bactério",
          "Validation technique",
          "Cahiers de paillasse",
          "Paillasse de décantation",
          "Progression de la journée",
          "Hors-bornes consécutifs",
        ],
      },
      {
        title: "Connexions",
        items: [
          "Liste des fichiers envoyés",
          "Liste des fichiers réceptionnés",
          "Connexions automates",
          "Connexions automates RS232",
          "Liste des tubes sur automates",
        ],
      },
      {
        title: "Outils",
        items: [
          "Etiquettes en différé",
          "Options de validation automatique",
          "Exécutant des demandes en cours",
          "Exécution des analyses",
        ],
      },
    ],
  },
  {
    id: "biologie",
    title: "Biologie",
    icon: Activity,
    tone: "green",
    sections: [
      { title: "Validation", items: ["Validation biologique", "Résultats pathologiques"] },
      {
        title: "Statistiques",
        items: [
          "Statistiques générales et CA",
          "Statistiques sur résultats",
          "Délais de validation (TAT)",
          "Nombre d'analyses et d'actes",
          "Statistiques du temps passé",
          "Statistiques d'épidémiologie",
          "Statistiques du colisage",
          "Export de résultats",
          "Export des AcBUS / INR",
          "Extracteur de demande",
        ],
      },
      {
        title: "Outils",
        items: [
          "Coût patient",
          "Répartition géogr. patients",
          "Répartition géogr. médecins",
          "Répartition géogr. corresp",
        ],
      },
    ],
  },
  {
    id: "facturation",
    title: "Facturation",
    icon: Receipt,
    tone: "amber",
    sections: [
      {
        title: "Factures",
        items: [
          "Facturation préleveur",
          "Facturation patient",
          "Facturation caisse",
          "Facturation mutuelle",
          "Facturation corresp. par demande",
          "Facturation corresp. globale",
          "Impayés antérieurs résumé",
          "Impayés antérieurs détaillés",
        ],
      },
      {
        title: "Journaux",
        items: ["Journal de caisse", "Journal de facturation", "Impressions légales"],
      },
      { title: "Nomenclature", items: ["Mise à jour de la nomenclature"] },
    ],
  },
  {
    id: "interop",
    title: "Interopérabilité",
    icon: Globe2,
    tone: "violet",
    sections: [
      {
        title: "HPRIM et HL7",
        items: ["Liste des fichiers envoyés", "Liste des fichiers réceptionnés"],
      },
      {
        title: "Prescriptions connectées",
        items: [
          "Suivi des demandes transmises",
          "Suivi des demandes réceptionnées",
          "Liste des prescriptions connectées",
        ],
      },
      {
        title: "Laboratoires spécialisés",
        items: ["Réception des PDF HPRIM Image", "Réception de la facturation", "Demandes d'images"],
      },
      {
        title: "Cliniques",
        items: [
          "Liste des admissions",
          "Facturation à envoyer",
          "Règlements réceptionnés",
          "Vérification des IPP",
          "Liste des fusions en attente",
        ],
      },
      { title: "HPRIM Médecin", items: ["Liste des fichiers envoyés", "Suivi des envois par modem"] },
    ],
  },
];

const toneClasses: Record<Group["tone"], { bar: string; soft: string; text: string; dot: string }> =
  {
    blue: {
      bar: "bg-g-blue",
      soft: "bg-g-blue-soft",
      text: "text-g-blue",
      dot: "bg-g-blue",
    },
    green: {
      bar: "bg-g-green",
      soft: "bg-g-green-soft",
      text: "text-g-green",
      dot: "bg-g-green",
    },
    amber: {
      bar: "bg-g-amber",
      soft: "bg-g-amber-soft",
      text: "text-g-amber",
      dot: "bg-g-amber",
    },
    orange: {
      bar: "bg-g-orange",
      soft: "bg-g-orange-soft",
      text: "text-g-orange",
      dot: "bg-g-orange",
    },
    violet: {
      bar: "bg-g-violet",
      soft: "bg-g-violet-soft",
      text: "text-g-violet",
      dot: "bg-g-violet",
    },
  };

function GroupCard({ group, query }: { group: Group; query: string }) {
  const t = toneClasses[group.tone];
  const q = query.trim().toLowerCase();

  const sections = useMemo(
    () =>
      group.sections
        .map((s) => ({
          ...s,
          items: q ? s.items.filter((i) => i.toLowerCase().includes(q)) : s.items,
        }))
        .filter((s) => s.items.length > 0),
    [group.sections, q],
  );

  if (sections.length === 0) return null;
  const count = sections.reduce((n, s) => n + s.items.length, 0);

  return (
    <section className="mb-6 break-inside-avoid overflow-hidden rounded-2xl border border-border bg-card shadow-panel">
      <header className={`flex items-center gap-3 ${t.soft} px-5 py-3.5`}>
        <span className={`grid size-8 shrink-0 place-items-center rounded-xl ${t.bar} text-white`}>
          <group.icon className="size-4" />
        </span>
        <h2 className={`truncate text-sm font-semibold tracking-[0.12em] uppercase ${t.text}`}>
          {group.title}
        </h2>
        <span className="ml-auto shrink-0 rounded-full bg-card px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
          {count}
        </span>
      </header>

      <div className="divide-y divide-border/70">
        {sections.map((section) => (
          <div key={section.title} className="px-5 py-4">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              {section.title}
            </p>
            <ul className="mt-2 grid gap-x-6 sm:grid-cols-2">
              {section.items.map((item) => (
                <li key={item}>
                  <button className="group flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-[13px] text-foreground transition-colors hover:bg-secondary">
                    <span
                      className={`size-1.5 shrink-0 rounded-full ${t.dot} opacity-40 transition-opacity group-hover:opacity-100`}
                    />
                    <span className="truncate">{item}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

const alerts = [
  { icon: Mail, label: "Messages", value: 5 },
  { icon: FileSearch, label: "À vérifier", value: 3 },
  { icon: ShieldCheck, label: "Validés", value: 2 },
  { icon: Users, label: "Patients", value: 1 },
];

const links = [
  { icon: Home, label: "Accueil" },
  { icon: Users, label: "Patients" },
  { icon: LayoutGrid, label: "Paillasses" },
  { icon: BarChart3, label: "Statistiques" },
  { icon: FileText, label: "Dictionnaire" },
  { icon: Link2, label: "Liens externes" },
];

function Index() {
  const [tab, setTab] = useState("Utilisation");
  const [query, setQuery] = useState("");
  const visible = groups.filter((g) => g.sections.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 bg-surface text-surface-foreground">
        <div className="mx-auto grid max-w-[1700px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-2.5 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex shrink-0 items-center gap-2 text-sm font-semibold">
              <span className="grid size-7 place-items-center rounded-lg bg-brand text-brand-foreground">
                <FlaskConical className="size-4" />
              </span>
              <span>KaliLab</span>
            </div>
            <button className="hidden min-w-0 items-center gap-1.5 rounded-full bg-surface-foreground/10 px-3 py-1.5 text-xs font-medium sm:flex">
              <MapPin className="size-3.5 shrink-0" />
              <span className="truncate">Tous mes sites</span>
              <ChevronDown className="size-3.5 shrink-0 opacity-70" />
            </button>
            <button className="hidden min-w-0 items-center gap-1.5 rounded-full bg-surface-foreground/10 px-3 py-1.5 text-xs font-medium md:flex">
              <Building2 className="size-3.5 shrink-0" />
              <span className="truncate">Laboratoire des Hôpitaux (A)</span>
              <ChevronDown className="size-3.5 shrink-0 opacity-70" />
            </button>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <div className="relative hidden lg:block">
              <Barcode className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-surface-foreground/50" />
              <Input
                placeholder="Code barre"
                className="h-9 w-44 border-surface-foreground/15 bg-surface-foreground/10 pl-9 text-sm text-surface-foreground placeholder:text-surface-foreground/50 focus-visible:ring-brand"
              />
            </div>
            <button className="relative grid size-9 place-items-center rounded-full bg-surface-foreground/10">
              <Bell className="size-4" />
              <Badge className="absolute -top-1 -right-1 h-4 min-w-4 justify-center rounded-full bg-brand px-1 text-[10px] text-brand-foreground">
                11
              </Badge>
            </button>
            <span className="hidden text-xs font-medium tracking-wide opacity-80 lg:inline">
              SomaDiag (SD)
            </span>
          </div>
        </div>

        <div className="border-t border-surface-foreground/10">
          <div className="mx-auto flex max-w-[1700px] gap-1.5 overflow-x-auto px-4 pb-2.5 sm:px-6 [&::-webkit-scrollbar]:hidden">
            {toolbar.map(({ label, icon: Icon }, i) => (
              <button
                key={label}
                className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors ${
                  i === 0
                    ? "bg-surface-foreground/15 text-surface-foreground"
                    : "text-surface-foreground/70 hover:bg-surface-foreground/10 hover:text-surface-foreground"
                }`}
              >
                <Icon className="size-4 shrink-0" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1700px] px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
              Général
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              Arborescence du laboratoire
            </h1>
          </div>
          <div className="flex shrink-0 gap-2">
            <div className="relative hidden sm:block">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filtrer les fonctions…"
                className="h-9 w-64 pl-9"
              />
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Printer className="size-4" />
              <span className="hidden sm:inline">Imprimer</span>
            </Button>
            <Button size="sm" className="gap-2">
              <Star className="size-4" />
              <span className="hidden sm:inline">Favoris</span>
            </Button>
          </div>
        </div>

        <div className="mt-6 flex gap-1 border-b border-border">
          {["Utilisation", "Paramétrage", "Aide"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`-mb-px border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
                tab === t
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="space-y-4 lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-4 shadow-panel">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                Liens
              </p>
              <ul className="mt-2 space-y-0.5">
                {links.map(({ icon: Icon, label }) => (
                  <li key={label}>
                    <button className="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-[13px] text-foreground transition-colors hover:bg-secondary">
                      <Icon className="size-4 shrink-0 text-muted-foreground" />
                      <span className="truncate">{label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-card p-4 shadow-panel">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                Alertes
              </p>
              <ul className="mt-2 space-y-1">
                {alerts.map(({ icon: Icon, label, value }) => (
                  <li key={label}>
                    <button className="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-[13px] transition-colors hover:bg-secondary">
                      <Icon className="size-4 shrink-0 text-muted-foreground" />
                      <span className="truncate">{label}</span>
                      <span className="ml-auto rounded-full bg-brand-soft px-2 py-0.5 text-[11px] font-semibold text-accent-foreground">
                        {value}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <nav className="hidden rounded-2xl border border-border bg-card p-4 shadow-panel lg:block">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                Sections
              </p>
              <ul className="mt-2 space-y-0.5">
                {visible.map((g) => (
                  <li key={g.id}>
                    <a
                      href={`#${g.id}`}
                      className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-[13px] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      <span
                        className={`size-2 shrink-0 rounded-full ${toneClasses[g.tone].bar}`}
                      />
                      <span className="truncate">{g.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="columns-1 gap-6 xl:columns-2">
            {visible.map((g) => (
              <div key={g.id} id={g.id} className="break-inside-avoid scroll-mt-32">
                <GroupCard group={g} query={query} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
