/**
 * Página raíz del esqueleto: misión y disclaimer anti-estafa (ADR-0009).
 * La búsqueda y el reporte llegan con las slices 2 y 3.
 */
export default function HomePage() {
  return (
    <main>
      <h1>Reencuentro</h1>
      <p>
        Base de datos universal y pública de personas desaparecidas y
        encontradas tras el terremoto de Venezuela de junio de 2026.
        Consolidamos las listas dispersas de hospitales, refugios y
        comunidades en un solo lugar, sin perder a nadie.
      </p>
      <p>
        Muy pronto podrás <strong>buscar</strong> a una persona y{" "}
        <strong>reportar</strong> una desaparición o un hallazgo, de forma
        gratuita, anónima y sin fricción.
      </p>
      <aside className="disclaimer" role="note">
        <strong>Aviso importante:</strong> Reencuentro nunca te pedirá dinero
        ni nada a cambio de información. Nadie legítimo lo hará. Si alguien te
        contacta pidiendo un pago, es una estafa. Para verificar a quien te
        contacte, pídele datos que solo un familiar sabría.
      </aside>
    </main>
  );
}
