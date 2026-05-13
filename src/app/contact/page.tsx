"use client";

import Image from "next/image";
import { SiteShell } from "@/components/site-shell";
import { motion } from "framer-motion";
import { brandImages } from "@/lib/content";

export default function ContactPage() {
  return (
    <SiteShell>
      <motion.section className="section card-stack" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} aria-labelledby="contact-heading">
        <p className="eyebrow">Contact &amp; Hours</p>
        <h1 id="contact-heading">Book your consultation in Brandon</h1>
        <Image className="section-image" src={brandImages.facial} alt="Skin by Emely studio treatment" width={1200} height={900} />
        <address className="card not-italic">
          <p><strong>Studio:</strong> <span>1111 Oakfield Dr, Brandon, FL 33511</span></p>
          <p><strong>Phone:</strong> <a href="tel:+19142997739">(914) 299-7739</a></p>
          <p><strong>Email:</strong> <a href="mailto:skinbyemely@gmail.com">skinbyemely@gmail.com</a></p>
          <p><strong>Service Area:</strong> Brandon, Valrico, Tampa Bay</p>
        </address>
        <article className="card" aria-labelledby="hours-heading">
          <h2 id="hours-heading">Hours</h2>
          <p>Tuesday: 11:00 am - 4:00 pm</p>
          <p>Wednesday - Friday: 10:30 am - 8:00 pm</p>
          <p>Saturday: 9:00 am - 4:00 pm</p>
          <p>Sunday: 9:00 am - 3:00 pm</p>
          <p>Monday: Closed</p>
        </article>
        <a className="btn-primary" href="/book">
          Reserve Appointment
        </a>
      </motion.section>
    </SiteShell>
  );
}

