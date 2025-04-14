'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { useTranslation } from '@/hooks/use-translation'

export function BlogSection() {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const blogPosts = [
    {
      id: 'nextjs-15-features',
      title: t('blog.post1.title'),
      excerpt: t('blog.post1.excerpt'),
      date: '2023-11-15',
      image: '/placeholder.svg?height=400&width=600',
      category: 'Next.js',
    },
    {
      id: 'typescript-best-practices',
      title: t('blog.post2.title'),
      excerpt: t('blog.post2.excerpt'),
      date: '2023-10-22',
      image: '/placeholder.svg?height=400&width=600',
      category: 'TypeScript',
    },
    {
      id: 'tailwind-v4-guide',
      title: t('blog.post3.title'),
      excerpt: t('blog.post3.excerpt'),
      date: '2023-09-18',
      image: '/placeholder.svg?height=400&width=600',
      category: 'CSS',
    },
  ]

  return (
    <section id="blog" ref={ref} className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-accent/10 text-accent hover:bg-accent/20">
            {t('sections.blog')}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('blog.heading')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t('blog.subheading')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col overflow-hidden">
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={post.image || '/placeholder.svg'}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                  />
                </div>
                <CardContent className="pt-6 flex-grow">
                  <Badge variant="secondary" className="mb-2">
                    {post.category}
                  </Badge>
                  <h3 className="text-xl font-semibold text-foreground mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                  {/* <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(post.date).toLocaleDateString()}
                  </div> */}
                </CardContent>
                <CardFooter className="pt-0">
                  <Button
                    variant="ghost"
                    className="text-accent hover:text-accent/80 p-0 h-auto"
                    asChild
                  >
                    <Link href={`/blog/${post.id}`}>
                      {t('cta.readMore')} <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-accent text-accent hover:bg-accent/10"
            asChild
          >
            <Link href="/blog">{t('cta.viewAllPosts')}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
