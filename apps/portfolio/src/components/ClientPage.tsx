"use client";

import { useState } from "react";
import MainSite from "./MainSite";
import WelcomePage from "./WelcomePage";
import { collectAnalytics } from "@/lib/analytics";

export default function ClientPage({ data }: { data: any }) {
  const [entered, setEntered] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const [entryTime, setEntryTime] = useState<string | null>(null);

  const handleEnter = async () => {
    if (transitioning) return;

    setTransitioning(true);
    const clickedAt = new Date().toISOString();
    setEntryTime(clickedAt);

    fetch("/api/analytics", {
      method: "POST",
      body: JSON.stringify({
        action: "record",
        ...collectAnalytics(),
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result?.visitorId) {
          setVisitorId(result.visitorId);
        }
      })
      .catch(console.error);

    setTimeout(() => {
      setEntered(true);
    }, 1100);
  };

  if (entered) {
    return (
      <MainSite
        data={data}
        initialVisitorId={visitorId}
        initialEntryTime={entryTime}
      />
    );
  }

  return (
    <WelcomePage
      profileImage={data.profile?.imageUrl}
      onEnter={handleEnter}
      transitioning={transitioning}
    />
  );
}
