"use client";
import DeleteProfileButton from "@/app/components/buttons/DeleteProfileButton";
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
      <div className="max-w-sm mx-auto p-4">
        <DeleteProfileButton onClick={handleDelete} />
      </div>
    </div>
  );
}
