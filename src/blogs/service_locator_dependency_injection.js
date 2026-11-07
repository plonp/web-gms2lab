export default {
  "slug": "service_locator_dependency_injection",
  "title": "Modern Architecture: Service Locator Pattern for Subsystems in GML",
  "description": "Replace messy global variable soup (global.audio_mgr, global.save_mgr) with a type-safe Service Locator for decoupled subsystem management.",
  "category": "Architecture",
  "categoryColor": "text-gm-green",
  "readTime": "7 min read",
  "date": "April 2025",
  "tags": [
    "service-locator",
    "architecture",
    "dependency-injection",
    "structs",
    "design-patterns"
  ],
  "author": "GMS2Lab Team",
  "overview": "Scattering global.variable pointers throughout codebase scripts makes testing and mocking subsystems impossible. A Service Locator acts as a registry where subsystems register on startup and retrieve dependencies cleanly.",
  "sections": [
    {
      "id": "service-locator-code",
      "title": "1. Implementing the ServiceLocator Struct",
      "content": "Provide register() and get() methods for decoupled subsystem resolution.",
      "code": "function ServiceLocator() constructor {\n    services = {};\n\n    static provide = function(_name, _service_instance) {\n        services[$ _name] = _service_instance;\n    };\n\n    static get = function(_name) {\n        return services[$ _name];\n    };\n}\n\n// Global instance setup:\nglobal.services = new ServiceLocator();"
    }
  ]
}
