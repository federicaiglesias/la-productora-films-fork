import React from 'react'
import type { Employee } from '@/payload-types'

/** Utilidad: obtener nombre/email desde un item del array */
function resolvePerson(p: any): { name?: string; email?: string } {
  // Si viene relación a employees:
  const rel = p?.employee
  if (rel) {
    // Puede ser ID (number) o el objeto Employee
    if (typeof rel === 'object') {
      const e = rel as Employee
      return { name: e?.title ?? undefined, email: e?.email ?? undefined }
    }
  }
  // Manual (name/email)
  return { name: p?.name ?? undefined, email: p?.email ?? undefined }
}

/** Fallbacks para que no se rompa si el CMS está vacío */
const FALLBACK = {
  leftOrgTitle: 'LA PRODUCTORA FILMS',
  leftGroups: [
    {
      heading: 'EXECUTIVE PRODUCERS',
      people: [
        { name: 'Pepe Lamboglia', email: 'pepe@laproductorafilms.com' },
        { name: 'Jean Paul Bragard', email: 'jp@laproductorafilms.com' },
        { name: 'James Lloyd', email: 'james@laproductorafilms.com' },
      ],
    },
    {
      heading: 'HEAD ACCOUNTANT',
      people: [{ name: 'Agustina Orozco', email: 'agustina@laproductorafilms.com' }],
    },
  ],
  rightOrgTitle: 'LA PRODUCTORA IA',
  rightGroups: [
    {
      heading: 'AI CREATIVE DIRECTOR',
      people: [{ name: 'Rodrigo Méndez', email: 'rodrigo@laproductorafilms.com' }],
    },
  ],
}

type Group = { heading?: string; people?: any[] }
type Props = {
  leftOrgTitle?: string
  leftGroups?: Group[]
  rightOrgTitle?: string
  rightGroups?: Group[]
  /** Payload inyecta estas props internas en los bloques */
  blockType?: 'contactUs'
  id?: string
}

export const ContactUsBlock: React.FC<Props> = (props) => {
  const leftOrgTitle = props.leftOrgTitle || FALLBACK.leftOrgTitle
  const rightOrgTitle = props.rightOrgTitle || FALLBACK.rightOrgTitle
  const leftGroups = (props.leftGroups?.length ? props.leftGroups : FALLBACK.leftGroups) as Group[]
  const rightGroups = (
    props.rightGroups?.length ? props.rightGroups : FALLBACK.rightGroups
  ) as Group[]

  return (
    <section className="bg-black text-white px-8 md:px-12 lg:px-16 pt-20 pb-4 flex flex-col">
      <div className="">
        <div className="border-l border-[#8F8F8F] pl-6 md:pl-8">
          <h2 className="text-[16px] font-semibold tracking-wide mb-12">OUR TEAM</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 lg:gap-24">
            {leftGroups.map((g, i) => (
              <div key={`left-g-${i}`}>
                {g.heading && (
                  <h3 className="text-[16px] font-medium text-gray-300 mb-6">{g.heading}</h3>
                )}

                <div className="space-y-5">
                  {(g.people ?? []).map((p, j) => {
                    const { name, email } = resolvePerson(p)

                    if (!name && !email) return null

                    return (
                      <div key={`left-g-${i}-p-${j}`}>
                        {name && <p className="text-[16px] font-medium leading-tight">{name}</p>}

                        {email && (
                          <a
                            href={`mailto:${email}`}
                            className="text-[14px] text-gray-400 hover:text-white transition-colors"
                          >
                            {email}
                          </a>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            {rightGroups.map((g, i) => (
              <div key={`right-g-${i}`}>
                {g.heading && (
                  <h3 className="text-[16px] font-medium text-gray-300 mb-6">{g.heading}</h3>
                )}

                <div className="space-y-5">
                  {(g.people ?? []).map((p, j) => {
                    const { name, email } = resolvePerson(p)

                    if (!name && !email) return null

                    return (
                      <div key={`right-g-${i}-p-${j}`}>
                        {name && <p className="text-[16px] font-medium leading-tight">{name}</p>}

                        {email && (
                          <a
                            href={`mailto:${email}`}
                            className="text-[14px] text-gray-400 hover:text-white transition-colors"
                          >
                            {email}
                          </a>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactUsBlock
