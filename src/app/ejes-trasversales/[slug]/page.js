"use client";

import { useParams } from "next/navigation";
import { ejesTransversales } from "../../../utils/ejesTransversales";
import Transversal from "../../../components/ejeTransversal/EjeTransversal";

export default function TransversalPage() {
  const { slug } = useParams();
  if (!slug) return null;

  const transversal = ejesTransversales.find((item) => item.slug === slug);
  return <Transversal transversal={transversal} />;
}
