import { GetSignatureBurgerUseCase } from "@/core/useCases/menu/GetSignatureBurgerUseCase";
import { GetTopSellersUseCase } from "@/core/useCases/menu/GetTopSellersUseCase";
import { GetFeaturedReviewsUseCase } from "@/core/useCases/reviews/GetFeaturedReviewsUseCase";
import { menuService, reviewService } from "@/infrastructure/instance";

import {
  BurgerAssembly,
  FinalCTA,
  HeroSection,
  SocialProof,
  TopSellers,
} from "../../components/organisms";
import { LandingTemplate } from "../../components/templates";

/**
 * Server Component: busca os dados pelos use cases (hoje mock, amanhã API) e
 * entrega objetos planos aos blocos animados (Client Components).
 */
export async function HomePage() {
  const [layers, topSellers, reviews] = await Promise.all([
    new GetSignatureBurgerUseCase(menuService).execute(),
    new GetTopSellersUseCase(menuService).execute(3),
    new GetFeaturedReviewsUseCase(reviewService).execute(6),
  ]);

  return (
    <LandingTemplate footer={<FinalCTA />}>
      <HeroSection />
      <BurgerAssembly layers={layers} />
      <TopSellers products={topSellers} />
      <SocialProof reviews={reviews} />
    </LandingTemplate>
  );
}
