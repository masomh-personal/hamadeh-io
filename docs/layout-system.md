# Layout System

## Overview
ThoughtfulCode uses a consistent layout system with a fixed max-width content container and edge-to-edge backgrounds.

## Layout Structure

```
┌─────────────────────────────────────────┐
│ Header (full-width background)          │
│  ┌─────────────────────────────────┐   │
│  │ Content (max-w-6xl, centered)   │   │
│  └─────────────────────────────────┘   │
├─────────────────────────────────────────┤
│ Main (full-width background)            │
│  ┌─────────────────────────────────┐   │
│  │ Content (max-w-6xl, centered)   │   │
│  └─────────────────────────────────┘   │
├─────────────────────────────────────────┤
│ Footer (full-width background)          │
│  ┌─────────────────────────────────┐   │
│  │ Content (max-w-6xl, centered)   │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

## Content Container

### Standard Max Width
- **Desktop**: `max-w-6xl` (1152px)
- **Padding**: `px-6` (24px horizontal padding)
- **Centering**: `mx-auto` (auto horizontal margins)

### Usage Pattern
All page content should follow this pattern:

```tsx
export default function MyPage() {
    return (
        <div className="mx-auto max-w-6xl px-6 py-16">
            {/* Your page content here */}
        </div>
    );
}
```

## Layout Components

### Header
- **Layout**: Sticky, full-width, with theme border and background
- **Classes**: `sticky top-0 z-50 w-full border-b border-(--border) bg-(--background)`
- **Content**: Constrained to `max-w-6xl px-6`
- **Height**: Fixed at `h-16` (64px)

### Footer
- **Layout**: Full-width with theme border and background
- **Classes**: `w-full border-t border-(--border) bg-(--background)`
- **Content**: Constrained to `max-w-6xl px-6`
- **Padding**: `py-6` (24px vertical)

### Main Content
- **Container**: Applied at page level, not in layout
- **Pattern**: `mx-auto max-w-6xl px-6 py-16`
- **Vertical Padding**: `py-16` for standard pages, adjust as needed

## Responsive Behavior

### Mobile (< 640px)
- Content uses full width minus `px-6` padding
- Stack elements vertically
- Reduce font sizes and spacing

### Tablet (640px - 1024px)
- Content still constrained to `max-w-6xl`
- Adjust grid layouts (e.g., 2 columns instead of 3)

### Desktop (> 1024px)
- Full layout with `max-w-6xl` centered
- Multi-column layouts
- Optimal line lengths for readability

## Best Practices

1. **Always use the content container pattern** for pages
2. **Don't add extra padding** to header/footer—they already have `px-6`
3. **Keep backgrounds edge-to-edge** for visual consistency
4. **Use consistent vertical spacing** (`py-16` for pages, `py-6` for footer)
5. **Test responsive behavior** at all breakpoints

## Examples

### Standard Page
```tsx
export default function AboutPage() {
    return (
        <div className="mx-auto max-w-6xl px-6 py-16">
            <h1>About Me</h1>
            <p>Content goes here...</p>
        </div>
    );
}
```

### Full-Width Section with Constrained Content
```tsx
export default function HomePage() {
    return (
        <>
            {/* Hero section with background */}
            <section className="bg-slate-900">
                <div className="mx-auto max-w-6xl px-6 py-20">
                    <h1>Welcome</h1>
                </div>
            </section>
            
            {/* Regular content */}
            <div className="mx-auto max-w-6xl px-6 py-16">
                <p>More content...</p>
            </div>
        </>
    );
}
```

## Related Files
- `app/layout.tsx` - Root layout with Header/Footer
- `components/layout/Header.tsx` - Header component (layout styles colocated)
- `components/layout/Footer.tsx` - Footer component (layout styles colocated)
