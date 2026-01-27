import Header from "@/components/layout/header/Header";
import AuroraBg from "@/components/ui/AuroraBg";
import { useState,useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";

export default function CheckOutPage() {
  const { id } = useParams();

  useEffect(() => {
    // Fetch checkout details using the id
  }, [id]);
  return (
    <AuroraBg>
      <Header />
      
    </AuroraBg>
  );
}
