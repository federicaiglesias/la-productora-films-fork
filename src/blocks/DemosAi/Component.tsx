// components/blocks/DemosAi.tsx
'use client'
import { useMemo, useState } from 'react'

type Demo = {
  id: string
  title: string
  description?: string
  demoUrl: string
  image?: { url?: string; alt?: string }
  category?: string
  tags?: string[]
  featured?: boolean
}

type DemosAiProps = {
  heading?: string
  intro?: string
  layout?: 'grid' | 'list'
  columns?: number
  showSearch?: boolean
  showFilters?: boolean
  items: Array<{ demo: Demo; highlight?: boolean }>
}

export function DemosAiBlock({
  heading,
  intro,
  layout = 'grid',
  columns = 3,
  showSearch = false,
  showFilters = false,
  items = [],
}: DemosAiProps) {
  const demos = useMemo(() => items.map((i) => i.demo).filter(Boolean), [items])

  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string | 'all'>('all')

  const categories = useMemo(() => {
    const set = new Set<string>()
    demos.forEach((d) => d.category && set.add(d.category))
    return Array.from(set)
  }, [demos])

  const filtered = useMemo(() => {
    return demos.filter((d) => {
      const q = query.toLowerCase()
      const matchQuery =
        !q ||
        d.title?.toLowerCase().includes(q) ||
        d.description?.toLowerCase().includes(q) ||
        d.tags?.some((t) => t.toLowerCase().includes(q))
      const matchCat = category === 'all' || d.category === category
      return matchQuery && matchCat
    })
  }, [demos, query, category])

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      {heading && <h2 className="text-3xl font-bold mb-2">{heading}</h2>}
      {intro && <p className="opacity-80 mb-6">{intro}</p>}

      {(showSearch || showFilters) && (
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {showSearch && (
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar demos..."
              className="w-full md:w-1/2 border rounded-xl px-4 py-2"
            />
          )}
          {showFilters && (
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full md:w-1/3 border rounded-xl px-4 py-2"
            >
              <option value="all">Todas las categorías</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      {layout === 'grid' ? (
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: `repeat(${Math.max(1, Math.min(4, columns || 3))}, minmax(0, 1fr))`,
          }}
        >
          {filtered.map((d) => (
            <a
              key={d.id}
              href={d.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border p-4 hover:shadow-md transition"
            >
              {d.image?.url && (
                <img
                  src={d.image.url}
                  alt={d.image.alt || d.title}
                  className="w-full h-44 object-cover rounded-xl mb-3"
                />
              )}
              <h3 className="font-semibold text-lg">{d.title}</h3>
              {d.category && <p className="text-sm opacity-70">{d.category}</p>}
              {d.description && (
                <p className="text-sm mt-2 opacity-80 line-clamp-3">{d.description}</p>
              )}
            </a>
          ))}
        </div>
      ) : (
        <ul className="space-y-4">
          {filtered.map((d) => (
            <li key={d.id} className="rounded-2xl border p-4 hover:shadow-md transition">
              <a href={d.demoUrl} target="_blank" rel="noreferrer" className="flex gap-4">
                {d.image?.url && (
                  <img
                    src={d.image.url}
                    alt={d.image.alt || d.title}
                    className="w-28 h-20 object-cover rounded-lg"
                  />
                )}
                <div>
                  <h3 className="font-semibold">{d.title}</h3>
                  {d.category && <p className="text-sm opacity-70">{d.category}</p>}
                  {d.description && (
                    <p className="text-sm mt-1 opacity-80 line-clamp-2">{d.description}</p>
                  )}
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
