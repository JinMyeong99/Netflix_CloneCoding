import { useSelector } from "react-redux";

export default function ProfilePage() {
  const { user } = useSelector((state) => state.login);

  if (!user) {
    return;
  }

  return (
    <div className="pt-24 px-[5%]">
      <h1 className="text-3xl font-bold mb-6">프로필 관리</h1>

      <div className="space-y-4 max-w-md">
        <div>
          <div className="text-sm text-neutral-400">이름</div>
          <div className="text-lg">{user.name}</div>
        </div>
        <div>
          <div className="text-sm text-neutral-400">이메일</div>
          <div className="text-lg">{user.email}</div>
        </div>
      </div>
    </div>
  );
}
