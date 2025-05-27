"use client";

import { useParams } from "next/navigation";
import { ejesTransversales } from "@/utils/ejesTransversales";
import Transversal from "@/components/ejeTransversal/EjeTransversal";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function TransversalPage() {
  const { slug } = useParams();
  if (!slug) return null;

  const transversal = ejesTransversales.find((item) => item.slug === slug);

  return (
    <div>
      <Navbar />
      <Transversal transversal={transversal} />
      <Footer />
    </div>
  );

}
