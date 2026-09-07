import Head from 'next/head'

// Emits one JSON-LD block. Pass a plain object; "<" is escaped so CMS text can
// never break out of the script tag.
export default function JsonLd({ data }) {
  if (!data) return null
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
      />
    </Head>
  )
}
