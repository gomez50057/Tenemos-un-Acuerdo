"use client";

import { useParams } from "next/navigation";
import { ejesGenerales } from "@/utils/ejesGenerales";
import EjeGeneral from '@/components/ejeGeneral/EjeGeneral';
import Navbar from "@/components/shared/Navbar";

export default function EjeGeneralPage() {
  const { slug } = useParams();

  if (!slug) return null;

  const eje = ejesGenerales.find((item) => item.slug === slug);

  return (
    <div>
      <Navbar />
      <EjeGeneral eje={eje} />
    </div>
  );
}
