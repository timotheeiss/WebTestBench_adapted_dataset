export type ModuleType = 'api' | 'auth' | 'data' | 'ui' | 'core';

export interface DocumentSection {
  id: string;
  title: string;
  content: string;
  links?: { docId: string; text: string }[];
}

export interface TechDocument {
  id: string;
  title: string;
  module: ModuleType;
  description: string;
  sections: DocumentSection[];
  relatedDocs: string[];
  lastUpdated: string;
  version: string;
}

export const moduleInfo: Record<ModuleType, { name: string; color: string }> = {
  api: { name: 'API', color: 'api' },
  auth: { name: 'Authentication', color: 'auth' },
  data: { name: 'Data Layer', color: 'data' },
  ui: { name: 'UI Components', color: 'ui' },
  core: { name: 'Core System', color: 'core' },
};

export const documents: TechDocument[] = [
  {
    id: 'rest-api-design',
    title: 'REST API Design Guidelines',
    module: 'api',
    description: 'Comprehensive guide for designing RESTful APIs with best practices for endpoints, versioning, and error handling.',
    sections: [
      {
        id: 'rest-principles',
        title: 'REST Principles',
        content: 'REST (Representational State Transfer) is an architectural style that defines a set of constraints for creating web services. Key principles include statelessness, client-server separation, cacheability, and a uniform interface. Our APIs follow these principles to ensure scalability and maintainability.',
        links: [
          { docId: 'api-versioning', text: 'API Versioning Strategy' },
          { docId: 'error-handling', text: 'Error Handling Standards' }
        ]
      },
      {
        id: 'endpoint-naming',
        title: 'Endpoint Naming Conventions',
        content: 'Use nouns for resources (e.g., /users, /products). Avoid verbs in URLs. Use plural forms for collections. Nest resources to show relationships (e.g., /users/{id}/orders). Keep URLs lowercase and use hyphens for multi-word resources.',
        links: [
          { docId: 'http-methods', text: 'HTTP Methods Guide' }
        ]
      },
      {
        id: 'pagination',
        title: 'Pagination & Filtering',
        content: 'Implement cursor-based pagination for large datasets. Support query parameters: limit, offset, cursor, sort, and filter. Return pagination metadata in response headers or body. Maximum page size should be configurable per endpoint.',
        links: []
      }
    ],
    relatedDocs: ['api-versioning', 'error-handling', 'http-methods', 'rate-limiting'],
    lastUpdated: '2024-01-15',
    version: '2.3.0'
  },
  {
    id: 'api-versioning',
    title: 'API Versioning Strategy',
    module: 'api',
    description: 'Standards for versioning APIs to maintain backward compatibility while enabling evolution.',
    sections: [
      {
        id: 'versioning-approaches',
        title: 'Versioning Approaches',
        content: 'We use URL path versioning (e.g., /v1/users, /v2/users) as our primary strategy. This provides clear visibility and easy routing. Header-based versioning is supported as a secondary option for clients that prefer it.',
        links: [
          { docId: 'rest-api-design', text: 'REST API Guidelines' }
        ]
      },
      {
        id: 'deprecation-policy',
        title: 'Deprecation Policy',
        content: 'Deprecated APIs receive a 6-month sunset period. Deprecation headers (Sunset, Deprecation) must be included in responses. Migration guides are required for all breaking changes. Clients are notified via email and dashboard alerts.',
        links: [
          { docId: 'error-handling', text: 'Error Handling' }
        ]
      }
    ],
    relatedDocs: ['rest-api-design', 'error-handling'],
    lastUpdated: '2024-01-10',
    version: '1.2.0'
  },
  {
    id: 'error-handling',
    title: 'Error Handling Standards',
    module: 'api',
    description: 'Unified error response format and handling strategies across all API endpoints.',
    sections: [
      {
        id: 'error-format',
        title: 'Error Response Format',
        content: 'All errors follow RFC 7807 (Problem Details). Structure: { "type": "uri", "title": "string", "status": number, "detail": "string", "instance": "uri" }. Additional fields may include "errors" array for validation failures.',
        links: []
      },
      {
        id: 'error-codes',
        title: 'Standard Error Codes',
        content: 'Use appropriate HTTP status codes: 400 for validation, 401 for authentication, 403 for authorization, 404 for not found, 429 for rate limiting, 500 for server errors. Custom error codes use format: ERR_MODULE_DESCRIPTION.',
        links: [
          { docId: 'rate-limiting', text: 'Rate Limiting' },
          { docId: 'jwt-authentication', text: 'JWT Authentication' }
        ]
      }
    ],
    relatedDocs: ['rest-api-design', 'rate-limiting', 'jwt-authentication'],
    lastUpdated: '2024-01-12',
    version: '1.5.0'
  },
  {
    id: 'http-methods',
    title: 'HTTP Methods Guide',
    module: 'api',
    description: 'Proper usage of HTTP methods for CRUD operations and beyond.',
    sections: [
      {
        id: 'method-semantics',
        title: 'Method Semantics',
        content: 'GET: Retrieve resources (idempotent, safe). POST: Create resources. PUT: Full resource replacement (idempotent). PATCH: Partial updates. DELETE: Remove resources (idempotent). OPTIONS: CORS preflight and capability discovery.',
        links: [
          { docId: 'rest-api-design', text: 'REST API Guidelines' }
        ]
      },
      {
        id: 'idempotency',
        title: 'Idempotency Requirements',
        content: 'All non-POST requests must be idempotent. POST requests should support idempotency keys via X-Idempotency-Key header. Idempotency keys are stored for 24 hours. Duplicate requests with same key return cached response.',
        links: []
      }
    ],
    relatedDocs: ['rest-api-design'],
    lastUpdated: '2024-01-08',
    version: '1.1.0'
  },
  {
    id: 'rate-limiting',
    title: 'Rate Limiting',
    module: 'api',
    description: 'API rate limiting strategies and implementation details.',
    sections: [
      {
        id: 'rate-limit-tiers',
        title: 'Rate Limit Tiers',
        content: 'Free tier: 100 requests/minute. Pro tier: 1000 requests/minute. Enterprise: Custom limits. Limits apply per API key. Burst allowance: 20% above limit for 10 seconds.',
        links: [
          { docId: 'api-key-management', text: 'API Key Management' }
        ]
      },
      {
        id: 'rate-limit-headers',
        title: 'Rate Limit Headers',
        content: 'Response headers: X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset (Unix timestamp). When exceeded: 429 status with Retry-After header.',
        links: [
          { docId: 'error-handling', text: 'Error Handling' }
        ]
      }
    ],
    relatedDocs: ['error-handling', 'api-key-management'],
    lastUpdated: '2024-01-05',
    version: '2.0.0'
  },
  {
    id: 'jwt-authentication',
    title: 'JWT Authentication',
    module: 'auth',
    description: 'JSON Web Token implementation for secure API authentication.',
    sections: [
      {
        id: 'token-structure',
        title: 'Token Structure',
        content: 'JWTs contain: Header (alg: RS256, typ: JWT), Payload (sub, iat, exp, iss, aud, roles, permissions), Signature. Access tokens expire in 15 minutes. Refresh tokens expire in 7 days.',
        links: [
          { docId: 'oauth-integration', text: 'OAuth Integration' },
          { docId: 'session-management', text: 'Session Management' }
        ]
      },
      {
        id: 'token-validation',
        title: 'Token Validation',
        content: 'Validate signature using public key. Check exp claim for expiration. Verify iss matches expected issuer. Confirm aud includes your service. Extract roles/permissions for authorization.',
        links: [
          { docId: 'rbac-system', text: 'RBAC System' }
        ]
      }
    ],
    relatedDocs: ['oauth-integration', 'session-management', 'rbac-system'],
    lastUpdated: '2024-01-14',
    version: '3.1.0'
  },
  {
    id: 'oauth-integration',
    title: 'OAuth 2.0 Integration',
    module: 'auth',
    description: 'OAuth 2.0 flows and third-party authentication integration.',
    sections: [
      {
        id: 'oauth-flows',
        title: 'Supported OAuth Flows',
        content: 'Authorization Code with PKCE (recommended for web/mobile). Client Credentials (service-to-service). Implicit flow is deprecated. Device Authorization for IoT devices.',
        links: [
          { docId: 'jwt-authentication', text: 'JWT Authentication' }
        ]
      },
      {
        id: 'provider-config',
        title: 'Provider Configuration',
        content: 'Supported providers: Google, GitHub, Microsoft, Apple. Custom OIDC providers via configuration. Each provider requires: client_id, client_secret, redirect_uri, scopes.',
        links: []
      }
    ],
    relatedDocs: ['jwt-authentication', 'session-management'],
    lastUpdated: '2024-01-11',
    version: '2.2.0'
  },
  {
    id: 'session-management',
    title: 'Session Management',
    module: 'auth',
    description: 'User session handling, storage, and security considerations.',
    sections: [
      {
        id: 'session-storage',
        title: 'Session Storage',
        content: 'Sessions stored in Redis with 24-hour TTL. Session ID: cryptographically random 256-bit value. Session data: user_id, created_at, last_active, device_info, ip_address.',
        links: [
          { docId: 'redis-caching', text: 'Redis Caching Strategy' }
        ]
      },
      {
        id: 'session-security',
        title: 'Session Security',
        content: 'Rotate session ID after authentication. Implement absolute and idle timeouts. Bind sessions to user agent and IP range. Support concurrent session limits per user.',
        links: [
          { docId: 'jwt-authentication', text: 'JWT Authentication' }
        ]
      }
    ],
    relatedDocs: ['jwt-authentication', 'redis-caching'],
    lastUpdated: '2024-01-09',
    version: '1.4.0'
  },
  {
    id: 'rbac-system',
    title: 'Role-Based Access Control',
    module: 'auth',
    description: 'RBAC implementation for fine-grained authorization.',
    sections: [
      {
        id: 'role-hierarchy',
        title: 'Role Hierarchy',
        content: 'Roles: Super Admin > Admin > Manager > User > Guest. Role inheritance: higher roles include lower role permissions. Custom roles can be created with specific permission sets.',
        links: [
          { docId: 'jwt-authentication', text: 'JWT Authentication' }
        ]
      },
      {
        id: 'permission-model',
        title: 'Permission Model',
        content: 'Permissions follow: resource:action format (e.g., users:read, orders:write). Wildcards supported: users:* for all user actions. Negative permissions: !users:delete to explicitly deny.',
        links: []
      }
    ],
    relatedDocs: ['jwt-authentication'],
    lastUpdated: '2024-01-07',
    version: '2.0.0'
  },
  {
    id: 'database-schema',
    title: 'Database Schema Design',
    module: 'data',
    description: 'PostgreSQL schema design patterns and conventions.',
    sections: [
      {
        id: 'naming-conventions',
        title: 'Naming Conventions',
        content: 'Tables: snake_case, plural (e.g., user_accounts). Columns: snake_case. Primary keys: id (UUID). Foreign keys: referenced_table_id. Timestamps: created_at, updated_at, deleted_at.',
        links: [
          { docId: 'data-migrations', text: 'Data Migrations' }
        ]
      },
      {
        id: 'indexing-strategy',
        title: 'Indexing Strategy',
        content: 'Primary keys auto-indexed. Create indexes for: foreign keys, frequently queried columns, columns in WHERE/ORDER BY. Use partial indexes for filtered queries. Monitor index usage quarterly.',
        links: [
          { docId: 'query-optimization', text: 'Query Optimization' }
        ]
      }
    ],
    relatedDocs: ['data-migrations', 'query-optimization'],
    lastUpdated: '2024-01-13',
    version: '1.3.0'
  },
  {
    id: 'data-migrations',
    title: 'Data Migrations',
    module: 'data',
    description: 'Database migration strategies and rollback procedures.',
    sections: [
      {
        id: 'migration-workflow',
        title: 'Migration Workflow',
        content: 'Create migration file with timestamp prefix. Include up() and down() functions. Test migrations in staging first. Never modify deployed migrations. Use transactions for atomicity.',
        links: [
          { docId: 'database-schema', text: 'Schema Design' }
        ]
      },
      {
        id: 'zero-downtime',
        title: 'Zero-Downtime Migrations',
        content: 'For schema changes: add new column, backfill data, update application, remove old column. Use feature flags during transition. Monitor query performance during and after migration.',
        links: []
      }
    ],
    relatedDocs: ['database-schema'],
    lastUpdated: '2024-01-06',
    version: '1.1.0'
  },
  {
    id: 'query-optimization',
    title: 'Query Optimization',
    module: 'data',
    description: 'SQL query optimization techniques and monitoring.',
    sections: [
      {
        id: 'query-analysis',
        title: 'Query Analysis',
        content: 'Use EXPLAIN ANALYZE for query plans. Identify sequential scans on large tables. Check for index usage. Monitor query execution time. Set query timeout at 30 seconds.',
        links: [
          { docId: 'database-schema', text: 'Schema Design' }
        ]
      },
      {
        id: 'common-patterns',
        title: 'Common Optimization Patterns',
        content: 'Use LIMIT for pagination. Avoid SELECT *. Use EXISTS instead of COUNT for existence checks. Batch inserts/updates. Use connection pooling (PgBouncer).',
        links: [
          { docId: 'redis-caching', text: 'Redis Caching' }
        ]
      }
    ],
    relatedDocs: ['database-schema', 'redis-caching'],
    lastUpdated: '2024-01-04',
    version: '1.2.0'
  },
  {
    id: 'redis-caching',
    title: 'Redis Caching Strategy',
    module: 'data',
    description: 'Caching patterns and Redis implementation guidelines.',
    sections: [
      {
        id: 'cache-patterns',
        title: 'Caching Patterns',
        content: 'Cache-aside: Application checks cache first, fetches from DB if miss. Write-through: Write to cache and DB simultaneously. TTL-based expiration for most use cases.',
        links: [
          { docId: 'session-management', text: 'Session Management' }
        ]
      },
      {
        id: 'cache-invalidation',
        title: 'Cache Invalidation',
        content: 'Use key prefixes for group invalidation. Event-driven invalidation for real-time updates. Background refresh for high-traffic keys. Monitor cache hit rate (target: >90%).',
        links: []
      }
    ],
    relatedDocs: ['session-management', 'query-optimization'],
    lastUpdated: '2024-01-03',
    version: '2.1.0'
  },
  {
    id: 'component-library',
    title: 'Component Library',
    module: 'ui',
    description: 'Reusable UI component standards and documentation.',
    sections: [
      {
        id: 'component-structure',
        title: 'Component Structure',
        content: 'Components follow atomic design: atoms, molecules, organisms. Each component has: TypeScript interface, Storybook story, unit tests, accessibility tests. Use composition over inheritance.',
        links: [
          { docId: 'design-tokens', text: 'Design Tokens' }
        ]
      },
      {
        id: 'prop-patterns',
        title: 'Prop Patterns',
        content: 'Use discriminated unions for variant props. Spread HTML attributes for flexibility. Provide sensible defaults. Document all props with JSDoc. Export types for consumer use.',
        links: [
          { docId: 'accessibility-standards', text: 'Accessibility Standards' }
        ]
      }
    ],
    relatedDocs: ['design-tokens', 'accessibility-standards'],
    lastUpdated: '2024-01-14',
    version: '4.2.0'
  },
  {
    id: 'design-tokens',
    title: 'Design Tokens',
    module: 'ui',
    description: 'Design system tokens for colors, spacing, typography.',
    sections: [
      {
        id: 'color-system',
        title: 'Color System',
        content: 'Primary palette: brand colors with 9 shades each. Semantic colors: success, warning, error, info. Neutral palette: grays for text and backgrounds. Dark mode: automatic color inversion.',
        links: [
          { docId: 'component-library', text: 'Component Library' }
        ]
      },
      {
        id: 'spacing-scale',
        title: 'Spacing Scale',
        content: 'Base unit: 4px. Scale: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24. Use consistent spacing for margins and padding. Grid: 12 columns, 24px gutter, responsive breakpoints.',
        links: []
      }
    ],
    relatedDocs: ['component-library'],
    lastUpdated: '2024-01-12',
    version: '3.0.0'
  },
  {
    id: 'accessibility-standards',
    title: 'Accessibility Standards',
    module: 'ui',
    description: 'WCAG 2.1 AA compliance guidelines for UI development.',
    sections: [
      {
        id: 'wcag-requirements',
        title: 'WCAG Requirements',
        content: 'Minimum contrast ratio: 4.5:1 for text, 3:1 for large text. Keyboard navigation for all interactive elements. Focus indicators visible. ARIA labels for icons and images.',
        links: [
          { docId: 'component-library', text: 'Component Library' }
        ]
      },
      {
        id: 'testing-a11y',
        title: 'Accessibility Testing',
        content: 'Automated testing with axe-core. Manual testing with screen readers (NVDA, VoiceOver). Keyboard-only navigation testing. Color blindness simulation testing.',
        links: []
      }
    ],
    relatedDocs: ['component-library'],
    lastUpdated: '2024-01-10',
    version: '1.2.0'
  },
  {
    id: 'api-key-management',
    title: 'API Key Management',
    module: 'core',
    description: 'API key generation, rotation, and security practices.',
    sections: [
      {
        id: 'key-generation',
        title: 'Key Generation',
        content: 'Keys are 32-byte cryptographically random values. Prefix: sk_ for secret keys, pk_ for publishable keys. Store only hashed values in database. Display full key only once at creation.',
        links: [
          { docId: 'rate-limiting', text: 'Rate Limiting' }
        ]
      },
      {
        id: 'key-rotation',
        title: 'Key Rotation',
        content: 'Recommended rotation: every 90 days. Grace period: 7 days overlap for migration. Revocation takes effect immediately. Audit log all key operations.',
        links: []
      }
    ],
    relatedDocs: ['rate-limiting'],
    lastUpdated: '2024-01-08',
    version: '1.3.0'
  },
  {
    id: 'logging-standards',
    title: 'Logging Standards',
    module: 'core',
    description: 'Structured logging format and best practices.',
    sections: [
      {
        id: 'log-format',
        title: 'Log Format',
        content: 'JSON structured logs with: timestamp, level, message, service, trace_id, span_id, user_id (if authenticated). Levels: DEBUG, INFO, WARN, ERROR, FATAL.',
        links: [
          { docId: 'monitoring-alerts', text: 'Monitoring & Alerts' }
        ]
      },
      {
        id: 'sensitive-data',
        title: 'Sensitive Data Handling',
        content: 'Never log: passwords, tokens, full credit card numbers, PII. Mask email addresses and phone numbers. Sanitize request/response bodies. Use log redaction middleware.',
        links: []
      }
    ],
    relatedDocs: ['monitoring-alerts'],
    lastUpdated: '2024-01-07',
    version: '2.0.0'
  },
  {
    id: 'monitoring-alerts',
    title: 'Monitoring & Alerts',
    module: 'core',
    description: 'System monitoring, metrics collection, and alerting rules.',
    sections: [
      {
        id: 'key-metrics',
        title: 'Key Metrics',
        content: 'Track: request rate, error rate, latency (p50, p95, p99), CPU/memory usage, database connections, cache hit rate. Use RED method for services, USE method for resources.',
        links: [
          { docId: 'logging-standards', text: 'Logging Standards' }
        ]
      },
      {
        id: 'alert-rules',
        title: 'Alerting Rules',
        content: 'Critical: error rate >5%, p99 latency >5s, service down. Warning: error rate >1%, p95 latency >2s, resource usage >80%. Use PagerDuty for critical, Slack for warnings.',
        links: []
      }
    ],
    relatedDocs: ['logging-standards'],
    lastUpdated: '2024-01-05',
    version: '1.5.0'
  }
];

export const getDocumentById = (id: string): TechDocument | undefined => {
  return documents.find(doc => doc.id === id);
};

export const getDocumentsByModule = (module: ModuleType): TechDocument[] => {
  return documents.filter(doc => doc.module === module);
};

export const getAllModules = (): ModuleType[] => {
  return ['api', 'auth', 'data', 'ui', 'core'];
};
