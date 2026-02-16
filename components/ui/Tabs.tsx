"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type TabsRootProps = ComponentProps<typeof TabsPrimitive.Root>;
type TabsListProps = ComponentProps<typeof TabsPrimitive.List>;
type TabsTriggerProps = ComponentProps<typeof TabsPrimitive.Trigger>;
type TabsContentProps = ComponentProps<typeof TabsPrimitive.Content>;

export function Tabs(props: TabsRootProps): React.ReactElement {
    return <TabsPrimitive.Root data-slot="tabs" {...props} />;
}

export function TabsList({
    className,
    ...props
}: TabsListProps): React.ReactElement {
    return (
        <TabsPrimitive.List
            className={cn(
                "inline-flex h-auto items-center gap-2 rounded-md border-2 border-slate-700 bg-slate-800 p-2",
                className
            )}
            data-slot="tabs-list"
            {...props}
        />
    );
}

export function TabsTrigger({
    className,
    ...props
}: TabsTriggerProps): React.ReactElement {
    return (
        <TabsPrimitive.Trigger
            className={cn(
                "rounded-sm border border-transparent px-3 py-1.5 font-heading text-sm font-semibold text-slate-300 transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900",
                "data-[state=active]:border-sky-500 data-[state=active]:bg-sky-950/30 data-[state=active]:text-sky-300",
                className
            )}
            data-slot="tabs-trigger"
            {...props}
        />
    );
}

export function TabsContent({
    className,
    ...props
}: TabsContentProps): React.ReactElement {
    return (
        <TabsPrimitive.Content
            className={cn(
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900",
                className
            )}
            data-slot="tabs-content"
            {...props}
        />
    );
}
