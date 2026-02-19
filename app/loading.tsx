import { LoadingIndicator } from "@/components/layout/LoadingIndicator";

export default function AppLoading(): React.ReactElement {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 backdrop-blur-sm">
            <LoadingIndicator />
        </div>
    );
}
