"use client";

import { useProfile } from "@/app/features/profile/presentation/hooks/useProfile.hook";

export default function Home() {
  const { deleteProfile } = useProfile();

  const handleDelete = async () => {
    const didConfirm = confirm("Are you sure you want to delete your profile?");
    if (!didConfirm) return;
    await deleteProfile();
  };
  return (
    <div>
      Home
      <button onClick={handleDelete}>Delete profile</button>
    </div>
  );
}
