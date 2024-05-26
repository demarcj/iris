import { get_all_properties } from '@/_server';
import { MetadataRoute } from 'next';
import { PropertyModel } from '@/_models';

export default async function sitemap(): Promise<MetadataRoute.Sitemap>  {
  const base_url = `https://irispattayaproperties.com`;
  let properties: PropertyModel[] = (await get_all_properties()).properties;
  const xml: MetadataRoute.Sitemap = properties.map(property => (
      {
        url: `${base_url}/en/properties/${property.id}`,
        lastModified: property?.updated_at,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: {
            th: `${base_url}/th/properties/${property.id}`
          }
        }
      }
    )
  )
  return [
    {
      url: `${base_url}/en/contact_us`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
      alternates: {
        languages: {
          th: `${base_url}/th/contact_us`
        }
      }
    },
    {
      url: `${base_url}/en/login`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
      alternates: {
        languages: {
          th: `${base_url}/th/login`
        }
      }
    },
    {
      url: `${base_url}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
      alternates: {
        languages: {
          th: `${base_url}/th`
        }
      }
    },
    {
      url: `${base_url}/en/properties`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
      alternates: {
        languages: {
          th: `${base_url}/th/properties`
        }
      }
    },
    ...xml
  ]
}