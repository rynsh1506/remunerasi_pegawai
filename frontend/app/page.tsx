"use client";

import Navbar from "@/app/components/Navbar";
import withAuth from "@/app/components/withAuth";
import MyTasksPage from "./mytaks/page";

function HomePage() {
  return (
    <div>
      <Navbar />
      <MyTasksPage />
    </div>
  );
}

export default withAuth(HomePage);
