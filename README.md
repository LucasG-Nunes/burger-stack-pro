# burger-stack-pro

Template de landing page de alta conversão para hamburguerias artesanais.
Next.js 15 (App Router) · Tailwind CSS 4 · Framer Motion 12 · arquitetura hexagonal herdada do `dragon_community`.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
```

> Requer Node 20.17+. O Tailwind está fixado em 4.1.14: versões 4.3+ dependem de um `magic-string` só-ESM que não carrega em Node < 20.19.

## Trocar os placeholders pelos PNGs finais

1. Coloque os arquivos em `public/images/` (PNG com fundo transparente) e o vídeo em `public/videos/`.
2. Preencha os caminhos em **`src/shared/constants/assets.constants.ts`** (hero, vídeo de faíscas, chef, 5 camadas do burger).
3. Imagens dos produtos: campo `image` em `src/infrastructure/mocks/menu.mock.ts`.
4. Camadas do burger: `public/images/burger/01-bun-top.png` … `06-bun-bottom.png`, **todas exportadas no mesmo canvas** (mesmas dimensões, fundo transparente, cada ingrediente já na sua posição final). Assim, quando a animação termina em `y = 0`, elas se encaixam perfeitamente. O deslocamento inicial de cada uma fica em `LAYER_CONFIG` (`BurgerAssembly.tsx`).

Dados do negócio (nome, WhatsApp, horário, chef): `src/shared/constants/brand.constants.ts`.
Cores do tema: bloco `@theme` em `src/app/globals.css` (`coal`, `ember`, `brasa`, `cream`, `ash`).

## Estrutura

```
src/
├─ app/                      layout.tsx, page.tsx, globals.css (tema)
├─ core/                     domínio puro — sem React, sem Next
│  ├─ entities/              Product, Review, BurgerLayer
│  ├─ ports/in|out/          contratos dos use cases e dos serviços
│  └─ useCases/              GetTopSellers, GetSignatureBurger, GetFeaturedReviews
├─ infrastructure/
│  ├─ mocks/                 dados de exemplo
│  ├─ services/              MockMenuService, MockReviewService
│  └─ instance.ts            composition root (troque o mock pela API aqui)
├─ presentation/
│  ├─ components/atoms       PulsingCTA, MagneticButton, EmberBackdrop, ImagePlaceholder…
│  ├─ components/molecules   ProductCard, ReviewCard, SectionHeading
│  ├─ components/organisms   os 5 blocos + Header
│  ├─ components/templates   LandingTemplate
│  ├─ hooks/                 useMouseParallax, useMagnetic, useClosingCountdown
│  └─ pages/HomePage         Server Component que chama os use cases
└─ shared/                   constants, helpers (whatsapp, currency, cn)
```

Pastas com apenas `index.ts` (`core/types`, `useCases/auth`, `infrastructure/http|mappers|storage`, `shared/validators`, `app/providers`, `test`) estão reservadas para o sistema de pedidos.

## Blocos

| # | Organism | Técnica |
|---|----------|---------|
| 1 | `HeroSection` | Vídeo de brasa com máscara `hero-vignette` (gradientes que escondem as bordas), CTA com glow CSS `ember-pulse`. Server Component; só o `BackgroundVideo` hidrata |
| 2 | `BurgerAssembly` | `useScroll` + `useTransform` numa seção de 320vh com palco `sticky` |
| 3 | `TopSellers` | `whileInView` + `staggerChildren: 0.2` (fade-up em cascata) |
| 4 | `SocialProof` | Avaliações em órbita com flutuação infinita no eixo Y |
| 5 | `FinalCTA` | Botão magnético com física de mola + contagem até 23h |

Todas as animações respeitam `prefers-reduced-motion`.

## Plugando o sistema de pedidos

Crie `HttpMenuService implements IMenuService` em `infrastructure/services/` e troque a instância em `infrastructure/instance.ts`. Use cases e UI não mudam.
