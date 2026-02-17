import { existsSync } from "node:fs";
import path from "node:path";
import { HiArrowLeft, HiDocumentText, HiDownload } from "react-icons/hi";
import { Link } from "@/components/ui";

const RESUME_PUBLIC_PATH = "/resume.pdf";

function hasResumePdf(): boolean {
    const filePath = path.join(process.cwd(), "public", "resume.pdf");
    return existsSync(filePath);
}

export default function ResumePage(): React.ReactElement {
    const resumeExists = hasResumePdf();

    return (
        <div className="mx-auto max-w-6xl px-6 py-8 md:py-10">
            <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                    <h1 className="font-extrabold text-white">Resume</h1>
                    <p className="text-content-muted mt-2">
                        View or download the latest PDF version.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm font-semibold">
                    <Link
                        href="/"
                        variant="muted"
                        icon={<HiArrowLeft className="h-3.5 w-3.5" />}
                        iconPosition="left"
                        className="inline-flex items-center"
                    >
                        Back to Home
                    </Link>
                    <Link
                        href={RESUME_PUBLIC_PATH}
                        external
                        variant="primary"
                        className="inline-flex items-center"
                    >
                        Open in New Tab
                    </Link>
                    <Link
                        href={RESUME_PUBLIC_PATH}
                        download
                        variant="secondary"
                        icon={<HiDownload className="h-3.5 w-3.5" />}
                        iconPosition="left"
                        className="inline-flex items-center"
                    >
                        Download PDF
                    </Link>
                </div>
            </header>

            {resumeExists ? (
                <section className="surface-card radius-card overflow-hidden">
                    <iframe
                        src={`${RESUME_PUBLIC_PATH}#view=FitH`}
                        title="Resume PDF Viewer"
                        className="h-[75vh] min-h-[620px] w-full"
                    />
                </section>
            ) : (
                <section className="rounded-xl border-2 border-amber-500/40 bg-amber-500/10 p-6 text-amber-100">
                    <div className="mb-2 inline-flex items-center gap-2 font-heading text-lg font-bold">
                        <HiDocumentText className="h-5 w-5" />
                        Resume PDF not found
                    </div>
                    <p className="text-sm leading-6 text-amber-200/90">
                        Add your file at{" "}
                        <code className="rounded bg-slate-900/50 px-1.5 py-0.5">
                            public/resume.pdf
                        </code>
                        . Once it exists, this page will automatically render
                        the embedded viewer.
                    </p>
                </section>
            )}
        </div>
    );
}
