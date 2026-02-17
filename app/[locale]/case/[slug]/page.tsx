// CORREÇÕES MOBILE - CASE PAGE

// ===== CORREÇÃO 1: LOGO DA EMPRESA SEM DISTORÇÃO =====

/* ANTES - logo distorcida em container quadrado */
<div className="flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-600 bg-card overflow-hidden">
  <Image
    src={`/companies/${companyLogo}`}
    alt={`${study.company} logo`}
    width={48}
    height={48}
    className="h-full object-cover"  // ← object-cover corta/distorce
    style={{ width: "auto" }}
  />
</div>

/* DEPOIS - logo proporcional, container retangular */
<div className="flex h-12 w-24 sm:w-32 items-center justify-center rounded-lg border border-neutral-600 bg-card px-2">
  <Image
    src={`/companies/${companyLogo}`}
    alt={`${study.company} logo`}
    width={64}
    height={48}
    className="max-h-full w-auto object-contain"  // ← object-contain mantém proporção
    style={{ maxWidth: "100%" }}
    unoptimized
  />
</div>

// ===== CORREÇÃO 2: VÍDEO MAIOR EM MOBILE =====

/* ANTES - vídeo pequeno */
<section className="px-6 py-16 lg:px-8">
  <div className="mx-auto max-w-4xl">
    {/* conteúdo */}
  </div>
</section>

/* DEPOIS - vídeo usa largura total em mobile, max-w-4xl apenas em desktop */
<section className="px-0 sm:px-6 py-12 sm:py-16 lg:px-8">
  <div className="mx-auto w-full sm:max-w-4xl">
    <div className="px-6 sm:px-0 mb-6 sm:mb-8">
      {/* Label "Conteúdo Relacionado" */}
      <div className="flex items-center gap-2">
        <Play className="h-4 w-4 text-primary" />
        <h2 className="text-xs font-medium uppercase tracking-widest text-primary">
          {playlistLabel}
        </h2>
      </div>
    </div>

    {/* Vídeo - full width em mobile, bordered em desktop */}
    <div className="relative aspect-video w-full overflow-hidden sm:rounded-lg border-0 sm:border sm:border-neutral-600 bg-background">
      <iframe
        width="100%"
        height="100%"
        src={embedUrl}
        title={`${brandDisplay} - Playlist`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
    </div>

    {/* Link */}
    <div className="mt-4 px-6 sm:px-0 flex justify-center">
      <a
        href={study.playlist_url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <span>{viewFullLabel}</span>
        <ArrowUpRight className="h-4 w-4" />
      </a>
    </div>
  </div>
</section>

// ===== CÓDIGO COMPLETO COM AMBAS CORREÇÕES =====

{/* Meta Info - Logo sem distorção */ }
<div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-600 pt-6">
  <div className="flex items-center gap-3 sm:gap-4">
    {companyLogo && (
      // Container retangular + object-contain
      <div className="flex h-10 w-20 sm:h-12 sm:w-24 items-center justify-center rounded-lg border border-neutral-600 bg-card px-2">
        <Image
          src={`/companies/${companyLogo}`}
          alt={`${study.company} logo`}
          width={64}
          height={48}
          className="max-h-full w-auto object-contain"
          style={{ maxWidth: "100%" }}
          unoptimized
        />
      </div>
    )}

    <div>
      <p className="text-sm font-semibold text-foreground">{study.company}</p>
      <p className="text-xs text-muted-foreground">{role}</p>
    </div>
  </div>

  <div className="flex items-center gap-2 text-sm">
    <Calendar className="h-4 w-4 text-muted-foreground" />
    <span className="font-medium text-foreground">{study.period}</span>
  </div>
</div>

{/* Playlist Section - Vídeo maior em mobile */ }
{
  study.playlist_url && (() => {
    const playlistId = (() => {
      try {
        const url = new URL(study.playlist_url);
        return url.searchParams.get('list');
      } catch {
        return null;
      }
    })();

    if (!playlistId) return null;

    const embedUrl = `https://www.youtube.com/embed/videoseries?list=${playlistId}`;
    const playlistLabel = locale === 'pt' ? 'CONTEÚDO RELACIONADO' : 'RELATED CONTENT';
    const viewFullLabel = locale === 'pt' ? 'Ver playlist completa no YouTube' : 'View full playlist on YouTube';

    return (
      <section className="px-0 sm:px-6 py-12 sm:py-16 lg:px-8">
        <div className="mx-auto w-full sm:max-w-4xl">
          {/* Label com padding apenas em mobile */}
          <div className="px-6 sm:px-0 mb-6 sm:mb-8">
            <div className="flex items-center gap-2">
              <Play className="h-4 w-4 text-primary" />
              <h2 className="text-xs font-medium uppercase tracking-widest text-primary">
                {playlistLabel}
              </h2>
            </div>
          </div>

          {/* Vídeo full-width em mobile, bordered em desktop */}
          <div className="relative aspect-video w-full overflow-hidden sm:rounded-lg border-0 sm:border sm:border-neutral-600 bg-background">
            <iframe
              width="100%"
              height="100%"
              src={embedUrl}
              title={`${brandDisplay} - Playlist`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>

          {/* Link com padding em mobile */}
          <div className="mt-4 px-6 sm:px-0 flex justify-center">
            <a
              href={study.playlist_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <span>{viewFullLabel}</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    );
  })()
}