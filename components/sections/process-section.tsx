"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, MessageSquare, Layout, Code, Zap, BarChart, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"

export function ProcessSection() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const tabsContainerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const sectionTitleRef = useRef<HTMLHeadingElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const handlePrevious = () => {
    setActiveTab(Math.max(0, activeTab - 1))
  }

  const handleNext = () => {
    setActiveTab(Math.min(tabs.length - 1, activeTab + 1))
  }

  const handleBottomPrevious = () => {
    handlePrevious()
    scrollToSectionTitle()
  }

  const handleBottomNext = () => {
    handleNext()
    scrollToSectionTitle()
  }

  const scrollToSectionTitle = () => {
    if (sectionTitleRef.current) {
      // Smooth scroll to the section title
      sectionTitleRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })

      // Add a slight delay and then scroll a bit more up to make sure the header is fully visible
      setTimeout(() => {
        window.scrollBy({
          top: -20, // Scroll up by 20px to ensure the header is fully visible
          behavior: 'smooth'
        })
      }, 300)
    }
  }

  // Set up ref callback for tab buttons
  const setTabRef = (el: HTMLButtonElement | null, index: number) => {
    tabRefs.current[index] = el
  }

  // Scroll the active tab into view when it changes
  useEffect(() => {
    if (tabRefs.current[activeTab] && tabsContainerRef.current) {
      const tabElement = tabRefs.current[activeTab]
      const container = tabsContainerRef.current

      // Calculate the center position for the tab
      const tabRect = tabElement!.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()

      const centerPosition = tabElement!.offsetLeft - (containerRect.width / 2) + (tabRect.width / 2)

      // Scroll the container to center the tab
      container.scrollTo({
        left: centerPosition,
        behavior: "smooth"
      })
    }
  }, [activeTab])

  const tabs = [
    {
      label: t("process.discovery.title"),
      icon: <MessageSquare className="h-5 w-5" />,
      content: {
        title: t("process.discovery.title"),
        description: t("process.discovery.description"),
        activities: [
          t("process.discovery.activities.consultation"),
          t("process.discovery.activities.research"),
          t("process.discovery.activities.identification"),
          t("process.discovery.activities.compliance"),
          t("process.discovery.activities.definition"),
        ],
        deliverables: [
          t("process.discovery.deliverables.brief"),
          t("process.discovery.deliverables.requirements"),
          t("process.discovery.deliverables.timeline"),
          t("process.discovery.deliverables.resources"),
        ],
      },
    },
    {
      label: t("process.design.title"),
      icon: <Layout className="h-5 w-5" />,
      content: {
        title: t("process.design.title"),
        description: t("process.design.description"),
        activities: [
          t("process.design.activities.concepts"),
          t("process.design.activities.ux"),
          t("process.design.activities.multilingual"),
          t("process.design.activities.sustainability"),
        ],
        deliverables: [
          t("process.design.deliverables.mockups"),
          t("process.design.deliverables.prototype"),
          t("process.design.deliverables.documentation"),
          t("process.design.deliverables.assets"),
        ],
      },
    },
    {
      label: t("process.development.title"),
      icon: <Code className="h-5 w-5" />,
      content: {
        title: t("process.development.title"),
        description: t("process.development.description"),
        activities: [
          t("process.development.activities.development"),
          t("process.development.activities.ai"),
          t("process.development.activities.integration"),
          t("process.development.activities.security"),
        ],
        deliverables: [
          t("process.development.deliverables.code"),
          t("process.development.deliverables.application"),
          t("process.development.deliverables.documentation"),
          t("process.development.deliverables.reports"),
        ],
      },
    },
    {
      label: t("process.testing.title"),
      icon: <Zap className="h-5 w-5" />,
      content: {
        title: t("process.testing.title"),
        description: t("process.testing.description"),
        activities: [
          t("process.testing.activities.testing"),
          t("process.testing.activities.accessibility"),
          t("process.testing.activities.optimization"),
          t("process.testing.activities.compliance"),
        ],
        deliverables: [
          t("process.testing.deliverables.application"),
          t("process.testing.deliverables.benchmark"),
          t("process.testing.deliverables.documentation"),
          t("process.testing.deliverables.training"),
        ],
      },
    },
    {
      label: t("process.support.title"),
      icon: <BarChart className="h-5 w-5" />,
      content: {
        title: t("process.support.title"),
        description: t("process.support.description"),
        activities: [
          t("process.support.activities.monitoring"),
          t("process.support.activities.security"),
          t("process.support.activities.improvements"),
          t("process.support.activities.remote"),
        ],
        deliverables: [
          t("process.support.deliverables.reports"),
          t("process.support.deliverables.documentation"),
          t("process.support.deliverables.strategy"),
          t("process.support.deliverables.support"),
        ],
      },
    },
  ]

  return (
    <section ref={ref} id="process" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 ref={sectionTitleRef} className="text-3xl md:text-4xl font-bold mb-4">{t("process.heading")}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("process.subheading")}
          </p>
        </motion.div>

        {/* Tab Navigation with Gradients */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-8 md:w-12 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex overflow-x-auto scrollbar-hide mb-4 pb-2 relative"
            ref={tabsContainerRef}
          >
            <div className="flex space-x-4 mx-auto px-4">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  ref={(el) => setTabRef(el, index)}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center px-4 py-2 rounded-full whitespace-nowrap cursor-pointer ${activeTab === index ? "bg-emerald-500 text-white" : "bg-white text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  {tab.icon}
                  <span className="ml-2 font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
          <div className="absolute right-0 top-0 bottom-0 w-8 md:w-12 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
        </div>

        {/* Navigation Arrows - Top */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex justify-start mb-8 ml-4"
        >
          <button
            onClick={handlePrevious}
            disabled={activeTab === 0}
            className="p-2 rounded-full bg-white shadow-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mr-3"
            aria-label="Previous phase"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            disabled={activeTab === tabs.length - 1}
            className="p-2 rounded-full bg-white shadow-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            aria-label="Next phase"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          ref={contentRef}
          id="process-content"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-6 md:p-8"
        >
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 lg:pr-8 mb-6 lg:mb-0">
              <h3 className="text-2xl font-bold mb-3">{tabs[activeTab].content.title}</h3>
              <p className="text-gray-600 mb-6">{tabs[activeTab].content.description}</p>

              <div className="mb-6">
                <h4 className="font-medium text-lg mb-3">{t("process.activities")}</h4>
                <ul className="space-y-2">
                  {tabs[activeTab].content.activities.map((activity, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="flex items-start"
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{activity}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:w-1/2 lg:pl-8 lg:border-l lg:border-gray-200">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-emerald-50 rounded-lg p-6"
              >
                <h4 className="font-medium text-lg mb-4">{t("process.deliverables")}</h4>
                <ul className="space-y-3">
                  {tabs[activeTab].content.deliverables.map((deliverable, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className="flex items-start"
                    >
                      <div className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-xs font-medium">{index + 1}</span>
                      </div>
                      <span>{deliverable}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Navigation Arrows - Bottom */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-6 flex justify-between items-center"
              >
                <button
                  onClick={handleBottomPrevious}
                  disabled={activeTab === 0}
                  className="px-4 py-2 text-sm font-medium rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {t("process.previousPhase")}
                </button>
                <button
                  onClick={handleBottomNext}
                  disabled={activeTab === tabs.length - 1}
                  className="px-4 py-2 bg-emerald-500 text-white text-sm font-medium rounded flex items-center disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {t("process.nextPhase")}
                  <ArrowRight className="ml-1 w-4 h-4" />
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="hidden text-center mt-12"
        >
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mt-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-6 md:mb-0 md:pr-6">
                <h3 className="text-2xl font-bold mb-4">{t("process.readyHeading")}</h3>
                <p className="text-gray-600">
                  {t("process.readyDescription")}
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center md:justify-end">
                <a
                  href="#contact"
                  className="inline-flex items-center px-6 py-3 bg-emerald-500 text-white font-medium rounded-md hover:bg-emerald-600 transition-colors cursor-pointer"
                >
                  {t("process.startButton")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
