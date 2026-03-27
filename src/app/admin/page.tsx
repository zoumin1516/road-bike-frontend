import { AdminWorkspace } from "@/components/admin/admin-workspace";
import { PageIntro } from "@/components/layout/page-intro";

export default function AdminPage() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-6xl px-6 py-12 sm:px-10 lg:px-12">
        <PageIntro
          eyebrow="Admin"
          title="内容管理后台"
          description="先登录拿到 JWT，再通过受保护接口维护品牌、车型、配置和零部件的媒体地址。"
          stats={[
            { label: "鉴权方式", value: "JWT" },
            { label: "当前能力", value: "Media CRUD" },
          ]}
        />

        <div className="mt-7">
          <AdminWorkspace />
        </div>
      </section>
    </main>
  );
}
