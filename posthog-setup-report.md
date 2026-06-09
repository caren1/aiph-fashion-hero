<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the FashionHero shop. The project already had `posthog-js` installed and a basic `PostHogProvider` wrapper, but no event tracking. The integration was upgraded to the recommended Next.js 16 approach using `instrumentation-client.ts` for initialization, a reverse proxy in `next.config.ts` to route PostHog traffic through the app domain (improving data quality and ad-blocker resilience), and 12 custom events across 9 files covering the full purchase funnel, user identity, and engagement signals.

| Event | Description | File |
|---|---|---|
| `product_viewed` | User views a product detail page — top of the purchase funnel | `src/components/product-info.tsx` |
| `product_added_to_cart` | User adds a product to the cart from the product detail page | `src/components/product-info.tsx` |
| `product_added_to_cart` | User adds a product to the cart via the quick view modal | `src/components/quick-view-modal.tsx` |
| `quick_view_opened` | User opens the quick view modal from a product card | `src/components/product-card.tsx` |
| `cart_item_removed` | User removes an item from the shopping cart | `src/components/cart-provider.tsx` |
| `checkout_started` | User clicks Checkout in the cart drawer | `src/components/cart-drawer.tsx` |
| `checkout_completed` | User clicks Place Order on the checkout page | `src/app/checkout/page.tsx` |
| `user_signed_in` | User signs in — also calls `posthog.identify()` | `src/app/account/login/page.tsx` |
| `user_registered` | User creates a new account — also calls `posthog.identify()` | `src/app/account/register/page.tsx` |
| `product_wishlisted` | User adds a product to their wishlist | `src/components/wishlist-button.tsx` |
| `product_unwishlisted` | User removes a product from their wishlist | `src/components/wishlist-button.tsx` |
| `search_performed` | User submits a search query by pressing Enter | `src/components/search-modal.tsx` |

**Other changes:**
- `instrumentation-client.ts` — PostHog initialization with EU reverse proxy, exception capture, and debug mode in development
- `next.config.ts` — reverse proxy rewrites: `/ingest/*` → `eu.i.posthog.com`, `/ingest/static/*` and `/ingest/array/*` → `eu-assets.i.posthog.com`
- `src/app/providers.tsx` — removed the old `PostHogProvider` / `useEffect` init pattern (replaced by `instrumentation-client.ts`)
- `src/app/layout.tsx` — removed `PostHogProvider` wrapper
- `.env.local` — verified `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` are set correctly
- `src/components/cart-drawer.tsx` — fixed pre-existing lint error (`<a>` → `<Link>`)
- `src/components/search-modal.tsx` + `src/components/header.tsx` — fixed pre-existing lint error (removed `setQuery("")` from `useEffect`, reset via `key` prop instead)

## Next steps

We've built a dashboard and insights to keep an eye on user behaviour based on the events just instrumented:

- [Analytics basics (wizard) — Dashboard](https://eu.posthog.com/project/197668/dashboard/735597)
- [Purchase Conversion Funnel](https://eu.posthog.com/project/197668/insights/LKvh0VuZ) — 4-step funnel: product viewed → added to cart → checkout started → checkout completed
- [Add to Cart — Daily Trend](https://eu.posthog.com/project/197668/insights/22abh1C4) — daily volume of cart additions
- [New User Registrations](https://eu.posthog.com/project/197668/insights/JrnY0L7o) — daily registration count
- [Wishlist Activity](https://eu.posthog.com/project/197668/insights/WNRW9tom) — wishlist additions vs removals over time
- [Sign-ins vs Registrations](https://eu.posthog.com/project/197668/insights/4Hcq2uJn) — returning users vs new growth side by side

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
