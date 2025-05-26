"use client";

import { useParams } from "next/navigation";
import { ejesGenerales } from "@/utils/ejesGenerales";
import EjeGeneral from '../../../components/ejeGeneral/EjeGeneral';
<<<<<<< HEAD

=======
>>>>>>> 4d80f75 (prueba)

export default function EjeGeneralPage() {
  const { slug } = useParams();

  if (!slug) return null;

  const eje = ejesGenerales.find((item) => item.slug === slug);

  return <EjeGeneral eje={eje} />;
}
