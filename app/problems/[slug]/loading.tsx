import { LoadingOverlay } from "@/components/layout/LoadingOverlay";

export default function ProblemPostLoading(): React.ReactElement {
    return <LoadingOverlay message="Loading solution..." />;
}
