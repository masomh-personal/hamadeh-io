"use client";

import { useState } from "react";
import { SearchInput } from "@/components/ui";

export function SearchInputShowcase(): React.ReactElement {
    const [query, setQuery] = useState("");
    const [lastSubmitted, setLastSubmitted] = useState<string | null>(null);

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-heading text-xl font-bold">Search Input</h2>
                <p className="text-content-subtle mt-1 text-sm">
                    Sidebar search field with keyboard shortcuts (Enter to
                    submit, Escape to clear) and branded inline searching
                    indicators.
                </p>
            </div>

            <div className="grid max-w-sm gap-6">
                <div className="space-y-2">
                    <p className="text-content-subtle font-mono text-xs uppercase tracking-widest">
                        Interactive
                    </p>
                    <SearchInput
                        label="Interactive search demo"
                        placeholder="Search all posts..."
                        value={query}
                        onValueChange={setQuery}
                        onSubmitImmediate={(val) => setLastSubmitted(val)}
                        onClear={() => {
                            setQuery("");
                            setLastSubmitted(null);
                        }}
                    />
                    {lastSubmitted ? (
                        <p className="text-content-subtle text-xs">
                            Submitted:{" "}
                            <span className="font-mono text-white">
                                {lastSubmitted}
                            </span>
                        </p>
                    ) : null}
                </div>

                <div className="space-y-2">
                    <p className="text-content-subtle font-mono text-xs uppercase tracking-widest">
                        Searching · Equalizer (Default)
                    </p>
                    <SearchInput
                        label="Searching equalizer demo"
                        placeholder="Search all posts..."
                        value="circuit breaker"
                        isSearching
                        loadingIndicator="equalizer"
                    />
                </div>

                <div className="space-y-2">
                    <p className="text-content-subtle font-mono text-xs uppercase tracking-widest">
                        Searching · Terminal
                    </p>
                    <SearchInput
                        label="Searching terminal demo"
                        placeholder="Search all posts..."
                        value="circuit breaker"
                        isSearching
                        loadingIndicator="terminal"
                    />
                </div>

                <div className="space-y-2">
                    <p className="text-content-subtle font-mono text-xs uppercase tracking-widest">
                        Disabled
                    </p>
                    <SearchInput
                        label="Disabled search demo"
                        placeholder="Search all posts..."
                        value=""
                        disabled
                    />
                </div>
            </div>
        </div>
    );
}
