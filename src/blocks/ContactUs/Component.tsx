import React from 'react'
import type { Employee } from '@/payload-types'

function resolvePerson(p: any): { name?: string; email?: string } {
  const rel = p?.employee

  if (rel && typeof rel === 'object') {
    const e = rel as Employee

    return {
      name: e?.title ?? undefined,
      email: e?.email ?? undefined,
    }
  }

  return {
    name: p?.name ?? undefined,
    email: p?.email ?? undefined,
  }
}

const FALLBACK = {
  title: 'OUR TEAM',
  sections: [
    {
      heading: 'EXECUTIVE PRODUCERS',
      people: [
        {
          name: 'Pepe Lamboglia',
          email: 'pepe@laproductorafilms.com',
        },
        {
          name: 'Jean Paul Bragard',
          email: 'jp@laproductorafilms.com',
        },
        {
          name: 'James Lloyd',
          email: 'james@laproductorafilms.com',
        },
      ],
    },
    {
      heading: 'HEAD ACCOUNTANT',
      people: [
        {
          name: 'Agustina Orozco',
          email: 'agustina@laproductorafilms.com',
        },
      ],
    },
    {
      heading: 'AI CREATIVE DIRECTOR',
      people: [
        {
          name: 'Rodrigo Méndez',
          email: 'rodrigo@laproductorafilms.com',
        },
      ],
    },
  ],
}

type Section = {
  heading?: string
  people?: any[]
}

type Props = {
  title?: string
  sections?: Section[]
  blockType?: 'contactUs'
  id?: string
}

export const ContactUsBlock: React.FC<Props> = (props) => {
  const title = props.title || FALLBACK.title

  const sections = (props.sections?.length ? props.sections : FALLBACK.sections) as Section[]

  return (
    <section className="bg-black text-white px-8 md:px-12 lg:px-16 pt-20 pb-4 flex flex-col">
      <div>
        <div className="border-l border-[#8F8F8F] pl-6 md:pl-8">
          <h2 className="text-[16px] font-semibold tracking-wide mb-12">{title}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 lg:gap-24">
            {sections.map((section, i) => (
              <div key={`section-${i}`}>
                {section.heading && (
                  <h3 className="text-[16px] font-medium text-gray-300 mb-6">{section.heading}</h3>
                )}

                <div className="space-y-5">
                  {(section.people ?? []).map((person, j) => {
                    const { name, email } = resolvePerson(person)

                    if (!name && !email) return null

                    return (
                      <div key={`section-${i}-person-${j}`}>
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
