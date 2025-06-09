
import { Suspense } from "react";
import LoginClient from "./LoginClient";

export default function LoginPage() {
  return (
    <Suspense fallback={<div>در حال بارگذاری فرم لاگین...</div>}>
      <LoginClient />
    </Suspense>
  );
}