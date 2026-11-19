type SkillGroup = {
  title: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages & Frameworks",
    skills: [
      "Java",
      "Kotlin",
      "Python",
      "React with TypeScript",
      "Spring Boot",
      "Google Guice",
      "JUnit",
    ],
  },
  {
    title: "APIs & Integration",
    skills: [
      "RESTful APIs",
      "Kafka and RabbitMQ",
      "gRPC",
      "Camunda and Flowable",
      "SOAP services",
      "Swagger",
    ],
  },
  {
    title: "Data & Infrastructure",
    skills: [
      "SQL and PL/SQL",
      "Oracle DB",
      "OpenShift",
      "Redis",
      "MongoDB",
      "Docker",
    ],
  },
]
