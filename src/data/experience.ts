export type ExperienceEntry = {
  id: string
  role: string
  company: string
  dateRange: string
  accomplishments: string[]
}

export const experience: ExperienceEntry[] = [
  {
    id: "citi-avp",
    role: "Applications Development Senior Programmer",
    company: "Citi",
    dateRange: "2022 – Present",
    accomplishments: [
      "Developed services to support document authoring, enrichment, and text extraction as part of an agile team using Java, Kotlin, Spring, SQL, PL/SQL, Python, React with Typescript, and Oracle DB",
      "Architected and executed migration from Camunda 7 workflows to Flowable, simplifying existing process definitions, optimizing workflow architecture, and reducing orchestration instances needed by 50%",
      "Led cross-team integration of 8 enterprise document systems into a centralized companywide document platform, expanding accessible records from 200M to nearly 1B documents. Drove requirement gathering, architected metadata validation enhancements, and ensured seamless interoperability without disrupting existing workflows",
      "Directed design and implementation of a maker-checker enhancement within a critical document management system (~200M records), ensuring backward compatibility and zero disruptions to existing document flows.",
      "Architected and implemented two document workflows to resolve discrepancies between legal contracts and internal digital records, helping legal teams remediate 40,000 documents and avoid millions in fines",
      "Collaborated with a global team of developers and legal stakeholders to enhance a machine learning based document processing workflow, expanding support for 30 additional document types and dozens of data points",
      "Integrated ABBYY OCR engine, enhancing table extraction logic and configuring containerized deployment within an elastic environment, replacing a legacy vendor solution and reducing annual costs by $250,000+",
      "Designed and implemented automated integration and regression testing using Selenium and Cucumber, improving release confidence and proactively detecting production-impacting defects",
      "Mentored and trained junior developers and interns on coding, testing, and communication best practices",
    ],
  },
  {
    id: "citi-officer",
    role: "Applications Development Analyst",
    company: "Citi",
    dateRange: "2021 – 2022",
    accomplishments: [
      "Contributed to a microservice-based middle office trade processing platform for institutional clients, which supports multiple trade asset types and formats using Java, Spring, Kafka, MongoDb, and Oracle DB",
      "Planned and instituted changes to allow for manual trade modifications to be tracked, reviewed, and approved or rejected following regulatory maker-checker and audit trail requirements",
      "Designed and developed a Tax Lot processing flow that handles over 20,000 records daily and integrated with an internal trade enrichment platform and an external accounting system",
      "Enhanced an internal testing service to allow for the initiation and monitoring of platform-wide tests",
    ],
  },
]
