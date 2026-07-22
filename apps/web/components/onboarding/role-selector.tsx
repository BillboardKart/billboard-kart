"use client";

import { RoleCard } from "@/components/onboarding/role-card";
import type { RoleOption, UserRole } from "@/lib/types";

type RoleSelectorProps = {
  roles: readonly RoleOption[];
  selectedRole: UserRole | null;
  onSelectAction: (role: UserRole) => void;
};

export function RoleSelector({
  roles,
  selectedRole,
  onSelectAction,
}: RoleSelectorProps) {
  return (
    <div className="mt-10 grid gap-5 md:grid-cols-2">
      {roles.map((role) => (
        <RoleCard
          key={role.id}
          role={role}
          selected={selectedRole === role.id}
          onClickAction={() => onSelectAction(role.id)}
        />
      ))}
    </div>
  );
}
