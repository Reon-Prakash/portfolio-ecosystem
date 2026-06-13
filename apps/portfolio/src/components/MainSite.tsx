"use client";

import { useEffect, useRef } from "react";
import Navbar from "./Navbar";
import AboutSection from "./AboutSection";
import TimelineSection from "./TimelineSection";
import SkillsSection from "./SkillsSection";
import CertificationsSection from "./CertificationsSection";
import ResumeSection from "./ResumeSection";
import Footer from "./Footer";
import { collectAnalytics } from "@/lib/analytics";

export default function MainSite({
  data,
  initialVisitorId,
  initialEntryTime,
}: {
  data: any;
  initialVisitorId?: string | null;
  initialEntryTime?: string | null;
}) {
  const visitorIdRef = useRef<string | null>(initialVisitorId || null);
  const entryTimeRef = useRef<Date>(
    initialEntryTime ? new Date(initialEntryTime) : new Date()
  );

  useEffect(() => {
    if (initialVisitorId) {
      visitorIdRef.current = initialVisitorId;
    }
  }, [initialVisitorId]);

  useEffect(() => {
    if (!visitorIdRef.current) {
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
            visitorIdRef.current = result.visitorId;
          }
        })
        .catch(console.error);
    }

    const handleBeforeUnload = () => {
      if (!visitorIdRef.current) return;

      const exitTime = new Date();
      const sessionDuration = Math.round(
        (exitTime.getTime() - entryTimeRef.current.getTime()) / 1000
      );

      navigator.sendBeacon(
        "/api/analytics",
        JSON.stringify({
          action: "exit",
          visitorId: visitorIdRef.current,
          exitTime: exitTime.toISOString(),
          sessionDuration,
        })
      );
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar profileImage={data.profile?.imageUrl} />
      <main className="pt-16">
        <AboutSection content={data.about?.content} />
        <TimelineSection entries={data.timeline || []} />
        <SkillsSection skills={data.skills || []} />
        <CertificationsSection
          courseCerts={data.courseCerts || []}
          participationCerts={data.participationCerts || []}
        />
        <ResumeSection hasResume={!!data.resume?.fileUrl} />
      </main>
      <Footer socialLinks={data.socialLinks || []} quote={data.quote || null} />
    </div>
  );
}
