import { Helmet } from 'react-helmet-async'
import { Link, Navigate, useParams } from 'react-router-dom'
import { FadeUp } from '@/components/ui/AnimatedSection'
import { getProjectById, projects, getLocalizedProjectFields } from '@/data/projects'
import { getProjectCoverImage } from '@/data/projectCovers'
import { useI18n } from '@/i18n/LanguageContext'

export default function ProjectDetails() {
  const { projectId } = useParams()
  const project = getProjectById(projectId)
  const { t, language } = useI18n()

  if (!project) {
    return <Navigate to="/projects" replace />
  }

  const copy = getLocalizedProjectFields(project, language)
  const cover = getProjectCoverImage(project.id)
  const otherProjects = projects.filter((item) => item.id !== project.id)

  return (
    <>
      <Helmet>
        <title>{`${copy.title} – Pixl Develop`}</title>
        <meta name="description" content={copy.fullDescription} />
        <link rel="canonical" href={`https://pixl-develop.com/projects/${project.id}`} />
      </Helmet>

      <main className="relative pt-40 md:pt-44 pb-24 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl animate-orb pointer-events-none" />
        <div className="container-max px-4 sm:px-6 lg:px-8 relative">
          <FadeUp className="mb-8">
            <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-brand-blue-light transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t('Back to all projects', 'Zurück zu allen Projekten')}
            </Link>
          </FadeUp>

          <FadeUp className="card-glass rounded-3xl p-7 sm:p-9">
            <div
              className={`relative h-52 sm:h-72 rounded-2xl bg-gradient-to-br ${project.gradient} border border-white/10 overflow-hidden mb-8`}
              style={{ borderColor: `${project.accent}35` }}
            >
              {cover && (
                <img
                  src={cover}
                  alt={`${copy.title} preview`}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />
              <div className="relative p-6 sm:p-8 h-full flex flex-col justify-end">
                <p className="text-xs uppercase tracking-wider text-brand-blue-light/90 mb-2">{copy.type}</p>
                <h1 className="font-display font-bold text-3xl sm:text-4xl text-white leading-tight">{copy.title}</h1>
              </div>
            </div>

            <p className="text-white/70 text-lg leading-relaxed mb-7">{copy.fullDescription}</p>

            <h2 className="text-white font-display text-xl mb-4">
              {t('Project Highlights', 'Projekt-Highlights')}
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3 mb-8">
              {copy.highlights.map((item, idx) => (
                <li key={idx} className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white/70 text-sm">
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3 mb-10">
              {copy.links.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="btn-primary text-sm">
                  <span>{link.label}</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7m0 0v7m0-7L10 14m-1 7H3V9" />
                  </svg>
                </a>
              ))}
            </div>

            <div className="border-t border-white/10 pt-6">
              <h3 className="text-white font-display text-lg mb-4">
                {t('Other Projects', 'Weitere Projekte')}
              </h3>
              <div className="flex flex-wrap gap-3">
                {otherProjects.map((item) => (
                  <Link key={item.id} to={`/projects/${item.id}`} className="btn-outline text-sm">
                    {getLocalizedProjectFields(item, language).title}
                  </Link>
                ))}
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {otherProjects.map((item) => {
                  const itemCopy = getLocalizedProjectFields(item, language)
                  const itemCover = getProjectCoverImage(item.id)

                  return (
                    <Link
                      key={item.id}
                      to={`/projects/${item.id}`}
                      className="group block overflow-hidden rounded-2xl border border-white/10 bg-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/35 hover:bg-white/[0.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50"
                    >
                      <div
                        className={`relative h-36 overflow-hidden bg-gradient-to-br ${item.gradient}`}
                        style={{ borderBottom: `1px solid ${item.accent}30` }}
                      >
                        {itemCover && (
                          <img
                            src={itemCover}
                            alt={`${itemCopy.title} preview`}
                            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <p
                            className="mb-1 text-[10px] font-semibold uppercase tracking-[0.22em]"
                            style={{ color: item.accent }}
                          >
                            {itemCopy.type}
                          </p>
                          <h4 className="font-display text-base font-bold leading-tight text-white">
                            {itemCopy.title}
                          </h4>
                        </div>
                      </div>

                      <div className="p-4">
                        <p className="line-clamp-2 min-h-[2.75rem] text-sm leading-relaxed text-white/55">
                          {itemCopy.shortDescription}
                        </p>
                        <div className="mt-4 flex items-center justify-between gap-3">
                          <span className="text-xs font-semibold text-brand-blue-light">
                            {t('View project', 'Projekt ansehen')}
                          </span>
                          <span
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/60 transition-colors group-hover:border-brand-blue/40 group-hover:text-white"
                            aria-hidden="true"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </FadeUp>
        </div>
      </main>
    </>
  )
}
