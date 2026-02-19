import { LoadingIndicator } from "@/components/layout/LoadingIndicator";
import { PageContainer } from "@/components/layout/PageContainer";

export default function BlogPostLoading(): React.ReactElement {
    return (
        <PageContainer>
            <LoadingIndicator message="Loading post..." className="mb-4" />

            <div className="surface-card radius-card p-5">
                <div className="space-y-3">
                    <div className="h-4 w-1/3 rounded bg-slate-700/50" />
                    <div className="h-4 w-full rounded bg-slate-700/40" />
                    <div className="h-4 w-5/6 rounded bg-slate-700/40" />
                    <div className="h-4 w-11/12 rounded bg-slate-700/35" />
                    <div className="h-4 w-2/3 rounded bg-slate-700/35" />
                </div>
            </div>
        </PageContainer>
    );
}
