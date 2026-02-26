# Copa Naciones Pádel

Landing page premium para el torneo nacional por equipos de pádel en Honduras. Inspirado en el formato Copa Davis.

## Tech Stack

- **React 18** + **Vite**
- **Tailwind CSS 4**
- Fully responsive
- Smooth scroll
- Animated countdown & statistics

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Torneo en vivo

- **`/live`** – Lista de partidos en vivo y próximos
- **`/live/:id`** – Detalle del partido con marcador y transmisión (YouTube/Instagram)
- **`/admin`** – Panel de árbitros (login)
- **`/admin/matches`** – Gestión de partidos y marcadores

### Supabase (opcional)

Para datos en tiempo real y panel de árbitros:

1. Crea un proyecto en [supabase.com](https://supabase.com)
2. Copia `.env.example` a `.env` y añade `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`
3. Ejecuta el SQL en `supabase-schema.sql` en el editor SQL de Supabase
4. Activa Realtime para la tabla `matches` (Database → Replication)
5. Crea un usuario árbitro en Authentication

Sin Supabase, la app usa datos de ejemplo.

## Secciones

1. **Hero** – Título, CTA, countdown
2. **About** – Concepto del torneo (Davis Cup style)
3. **Formato** – Fase de grupos, eliminatorias, categorías
4. **Registro** – Formulario completo con subida de comprobante
5. **Patrocinadores** – Tiers Oro, Plata, Bronce
6. **Impacto** – Estadísticas animadas + proyección
7. **Donaciones** – Transferencia bancaria + crypto
8. **Galería** – Placeholder images
9. **Contacto** – Email, WhatsApp, formulario
10. **Footer**

## Estilo

- Dark background (#0a0a0a)
- Blue accents (inspirado en bandera Honduras #0073CF)
- Premium sports aesthetic
- Animaciones sutiles
