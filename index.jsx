import React, { useState } from 'react';
import { ChevronRight, ChevronDown, BookOpen, Shield, Cog, TrendingUp, Cloud, Database } from 'lucide-react';

const StudyCardsApp = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (cardIndex, sectionIndex) => {
    const key = `${cardIndex}-${sectionIndex}`;
    setExpandedSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const cards = [
    {
      id: 0,
      title: "Servicios Web - Conceptos Fundamentales",
      icon: <Cloud className="w-6 h-6" />,
      color: "bg-blue-500",
      sections: [
        {
          title: "¿Qué son los Servicios Web?",
          content: "Aplicaciones modulares que se comunican a través de internet, utilizando estándares como XML y HTTP para intercambiar datos.",
          details: [
            "Permiten la interoperabilidad entre sistemas",
            "Utilizan protocolos estándar de internet",
            "Facilitan la integración de aplicaciones"
          ]
        },
        {
          title: "Tipos de Servicios Web",
          content: "SOAP, RESTful y gRPC",
          details: [
            "SOAP: Protocolo más formal y estructurado",
            "RESTful: Más ligero y fácil de implementar",
            "gRPC: Alta eficiencia para comunicación entre servicios"
          ]
        },
        {
          title: "Características Principales",
          content: "Interoperabilidad, descubrimiento dinámico y escalabilidad",
          details: [
            "Interoperabilidad: Comunicación entre diferentes sistemas",
            "Descubrimiento dinámico: Utilizan estándares como UDDI",
            "Escalabilidad: Manejan gran volumen de solicitudes"
          ]
        }
      ]
    },
    {
      id: 1,
      title: "Arquitectura de Microservicios",
      icon: <Cog className="w-6 h-6" />,
      color: "bg-green-500",
      sections: [
        {
          title: "Escalabilidad",
          content: "Dinámica, independiente y elástica",
          details: [
            "Dinámica: Escalar sin afectar rendimiento",
            "Independiente: Cada servicio escala por separado",
            "Elástica: Adaptación automática a la demanda"
          ]
        },
        {
          title: "Flexibilidad y Agilidad",
          content: "Despliegue independiente y tecnologías variadas",
          details: [
            "Despliegue independiente: Agiliza desarrollo y actualizaciones",
            "Tecnologías variadas: Cada servicio puede usar diferentes tecnologías",
            "Mejora continua: Permite iteraciones ágiles"
          ]
        },
        {
          title: "Resiliencia",
          content: "Aislamiento de fallos y recuperación rápida",
          details: [
            "Aislamiento: Servicios independientes",
            "Tolerancia a fallos: Un fallo no afecta todo el sistema",
            "Recuperación rápida: Minimiza impacto de problemas"
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Tecnologías Comunes",
      icon: <Database className="w-6 h-6" />,
      color: "bg-purple-500",
      sections: [
        {
          title: "Comunicación",
          content: "HTTP, REST, gRPC, RabbitMQ, Kafka",
          details: [
            "Protocolos: HTTP, REST y gRPC",
            "Mensajería asíncrona: RabbitMQ o Kafka",
            "Middleware: Apache Camel o MuleSoft"
          ]
        },
        {
          title: "Gestión de Datos",
          content: "NoSQL, Cache distribuida, Event sourcing",
          details: [
            "Bases NoSQL: MongoDB, Cassandra",
            "Cache distribuida: Redis, Memcached",
            "Event sourcing y CQRS para eventos"
          ]
        },
        {
          title: "Seguridad y Monitorización",
          content: "OAuth, JWT, Prometheus, Grafana",
          details: [
            "Seguridad API: OAuth, JWT",
            "Monitorización: Prometheus, Grafana",
            "Logs: ELK Stack, Splunk"
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Seguridad en Aplicaciones Web",
      icon: <Shield className="w-6 h-6" />,
      color: "bg-red-500",
      sections: [
        {
          title: "Métodos de Autenticación",
          content: "Basic, Digest, Form, Client-Cert",
          details: [
            "Basic: Método más inseguro, usuario/contraseña en cabecera",
            "Digest: Similar a Basic pero con contraseña encriptada",
            "Form: Formulario con datos por POST/GET",
            "Client-Cert: Certificados digitales"
          ]
        },
        {
          title: "Principales Vulnerabilidades",
          content: "Inyección SQL, XSS, pérdida de autenticación",
          details: [
            "Inyección SQL/OS/LDAP: Datos no confiables ejecutan comandos",
            "XSS: Datos no validados enviados al navegador",
            "Pérdida de autenticación: Tokens no protegidos",
            "Referencias inseguras: Exposición sin autorización"
          ]
        },
        {
          title: "Principios de Seguridad",
          content: "CIA + Autenticidad + Trazabilidad",
          details: [
            "Confidencialidad: Información no revelada a no autorizados",
            "Integridad: Información no alterada sin autorización",
            "Disponibilidad: Acceso autorizado cuando se requiere",
            "Autenticidad: Garantiza la fuente de los datos",
            "Trazabilidad: Actuaciones imputables a una entidad"
          ]
        }
      ]
    },
    {
      id: 4,
      title: "Desafíos y Consideraciones",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-orange-500",
      sections: [
        {
          title: "Escalabilidad y Disponibilidad",
          content: "Balance de carga, consistencia, tolerancia a fallos",
          details: [
            "Balance de carga y escalabilidad horizontal",
            "Consistencia y sincronización en entornos distribuidos",
            "Tolerancia a fallos y recuperación",
            "Monitoreo y diagnóstico continuo"
          ]
        },
        {
          title: "Seguridad y Control de Acceso",
          content: "Autenticación robusta, gestión de secretos",
          details: [
            "Mecanismos robustos de autenticación y autorización",
            "Gestión segura de credenciales y secretos",
            "Prevención proactiva de ataques",
            "Cumplimiento normativo riguroso"
          ]
        },
        {
          title: "Gestión de Versiones",
          content: "Control de versiones, despliegue continuo",
          details: [
            "Control sólido para coexistencia de versiones",
            "Automatización de despliegue e integración",
            "Gestión eficiente de entornos",
            "Mecanismos de rollback y reversión"
          ]
        }
      ]
    },
    {
      id: 5,
      title: "Tendencias Futuras",
      icon: <BookOpen className="w-6 h-6" />,
      color: "bg-indigo-500",
      sections: [
        {
          title: "Eficiencia en Desarrollo",
          content: "Serverless, contenedores, automatización",
          details: [
            "Arquitecturas sin servidor y contenedores",
            "Automatización de pruebas y despliegue",
            "Gestión de versiones y despliegue continuo",
            "Monitorización y observabilidad avanzada"
          ]
        },
        {
          title: "Seguridad Avanzada",
          content: "Autenticación robusta, gestión centralizada",
          details: [
            "Mecanismos sólidos de autenticación y autorización",
            "Gestión centralizada de secretos",
            "Protección avanzada contra ataques",
            "Cumplimiento normativo automatizado"
          ]
        },
        {
          title: "Arquitecturas Orientadas a Eventos",
          content: "Procesamiento en tiempo real, mensajería asíncrona",
          details: [
            "Procesamiento de eventos en tiempo real",
            "Patrones de mensajería asíncrona",
            "Gestión de flujos de eventos",
            "Escalabilidad elástica basada en eventos"
          ]
        }
      ]
    }
  ];

  const popularityData = [
    { name: "Contenedores Docker", percentage: 85 },
    { name: "Serverless", percentage: 80 },
    { name: "Kubernetes", percentage: 75 },
    { name: "Micro-Frontend", percentage: 70 },
    { name: "API Gateway", percentage: 65 }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📚 Cartillas de Estudio
          </h1>
          <p className="text-xl text-gray-600">
            Servicios Web, Microservicios y Seguridad
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {cards.map((card, index) => (
            <button
              key={card.id}
              onClick={() => setActiveCard(index)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeCard === index
                  ? `${card.color} text-white shadow-lg`
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {card.icon}
              <span className="font-medium hidden sm:inline">{card.title}</span>
            </button>
          ))}
        </div>

        {/* Active Card Content */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-3 rounded-lg ${cards[activeCard].color} text-white`}>
              {cards[activeCard].icon}
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              {cards[activeCard].title}
            </h2>
          </div>

          <div className="space-y-4">
            {cards[activeCard].sections.map((section, sectionIndex) => {
              const isExpanded = expandedSections[`${activeCard}-${sectionIndex}`];
              
              return (
                <div key={sectionIndex} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleSection(activeCard, sectionIndex)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {section.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {section.content}
                      </p>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  
                  {isExpanded && (
                    <div className="px-4 pb-4">
                      <ul className="space-y-2">
                        {section.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                            <span className="text-gray-700">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Popularity Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            📊 Tendencias de Popularidad en Tecnologías
          </h3>
          <div className="space-y-4">
            {popularityData.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-32 text-sm font-medium text-gray-700">
                  {item.name}
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-4 relative overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <div className="w-12 text-sm font-bold text-gray-800">
                  {item.percentage}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 p-4 bg-gray-800 text-white rounded-lg">
          <p className="text-sm">
            💡 Haz clic en las secciones para expandir el contenido y estudiar en detalle
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudyCardsApp;