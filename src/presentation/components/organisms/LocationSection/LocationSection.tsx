import { BRAND, LOCATION, SCHEDULE } from "@/shared/constants/brand.constants";
import { buildWhatsAppUrl } from "@/shared/helpers/whatsapp";

import { WhatsAppIcon } from "../../atoms/WhatsAppIcon/WhatsAppIcon";
import { LocationMap } from "../../molecules/LocationMap/LocationMap";
import { SectionHeading } from "../../molecules/SectionHeading/SectionHeading";

const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${LOCATION.lat},${LOCATION.lng}`;

/** BLOCO 4b — Onde estamos: mapa + endereço, horário e "Como chegar". Server Component. */
export function LocationSection() {
  return (
    <section id="localizacao" aria-labelledby="localizacao-title" className="py-24 md:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="Onde estamos"
          title={
            <span id="localizacao-title">
              A brasa fica <span className="text-fire">em Candeias.</span>
            </span>
          }
          description="Passa aqui pra comer na chapa quentinha ou pede no WhatsApp que a gente leva."
        />

        <div className="mt-14 grid overflow-hidden rounded-3xl border border-white/10 bg-coal-900/60 lg:grid-cols-[1.6fr_1fr]">
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Abrir rota até ${BRAND.name} no Google Maps`}
            className="group relative block"
          >
            <LocationMap
              lat={LOCATION.lat}
              lng={LOCATION.lng}
              label={`Mapa: ${BRAND.name}, ${LOCATION.label}`}
              className="h-80 transition-transform duration-500 group-hover:scale-[1.02] md:h-[440px]"
            />
          </a>

          <div className="flex flex-col justify-center gap-6 p-8 md:p-10">
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] text-ember-400 uppercase">
                Endereço
              </p>
              <address className="mt-2 text-lg leading-snug text-cream-100 not-italic">
                {LOCATION.street}
                <br />
                <span className="text-ash-400">{LOCATION.district}</span>
                <br />
                <span className="text-sm text-ash-500">CEP {LOCATION.zipCode}</span>
              </address>
            </div>

            <div>
              <p className="text-xs font-semibold tracking-[0.3em] text-ember-400 uppercase">
                Horário
              </p>
              <p className="mt-2 text-lg text-cream-100">
                Todos os dias · {SCHEDULE.openingHour}h às {SCHEDULE.closingHour}h
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <a
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-flame px-6 py-3 font-display text-lg tracking-wider text-coal-950 uppercase transition-transform hover:scale-105"
              >
                Como chegar
              </a>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 font-display text-lg tracking-wider text-cream-100 uppercase transition-colors hover:border-ember-400 hover:text-ember-300"
              >
                <WhatsAppIcon className="size-5" />
                Pedir delivery
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
