# Render Deployment Guide

## Critical Environment Variables

Set these **exactly** in Render → Service → Environment:

```
SPRING_DATASOURCE_URL=jdbc:mysql://lifewoodbackend-lloydscottcabido2017-6108.d.aivencloud.com:20089/defaultdb?sslMode=REQUIRED&useSSL=true&allowPublicKeyRetrieval=true&serverTimezone=UTC
SPRING_DATASOURCE_USERNAME=avnadmin
SPRING_DATASOURCE_PASSWORD=REMOVED_SECRET
SPRING_PROFILES_ACTIVE=prod
```

## Service Configuration

- **Build Method**: Docker
- **Docker Context Directory**: `backend/`
- **Dockerfile Path**: `backend/Dockerfile`
- **Clear Build Cache**: Yes (to avoid JDK 17 cached layers)

## Troubleshooting

If you see `Driver ... claims to not accept jdbcUrl, ${DB_URL}`:
- The environment variables above are NOT set in Render
- Double-check spelling: `SPRING_DATASOURCE_URL` (not `DB_URL`)
- Values should not be wrapped in quotes

If you see `release version 21 not supported`:
- Clear Render build cache and redeploy
- Verify service uses Docker with `backend/Dockerfile`

## After Successful Deploy

Remove this line from `application.properties`:
```
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
```

This allows Hibernate to auto-detect the dialect and removes deprecation warnings.
