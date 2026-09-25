# Matías Osvaldo Aguilar Barría — Full-Stack Software Engineering Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![NestJS](https://img.shields.io/badge/NestJS-11.0-ea2849?logo=nestjs)](https://nestjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ed?logo=docker)](https://www.docker.com/)
[![Jest Tests](https://img.shields.io/badge/Jest-7_Passed-c21325?logo=jest)](https://jestjs.io/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Live Portfolio: **[https://github.com/JKiddo-dev](https://github.com/JKiddo-dev)**

---

## 👨‍💻 About Me

Computer Engineer (*Universidad Tecnológica Metropolitana*, Chile) with an international academic exchange at *Universitat Jaume I* (Castellón, Spain). 

Specialized in:
- **Full-Stack Web Engineering**: React, Next.js 16 (App Router), Angular, TypeScript, MVVM architecture.
- **Cloud Microservices & BFF**: Enterprise service delivery with NestJS, clean architecture, and automated testing (IBM Consulting / Itaú Bank).
- **IoT & Distributed Systems**: End-to-end telemetry platform with ESP32 microcontrollers, LoRa mesh topology, and MQTT broker bridge (*Río Clarillo National Park capstone project*).

---

## 🏛️ Project Architecture

This repository features a dual full-stack architecture:

### 1. Frontend & Serverless Edge Engine (`/frontend`)
- **Framework**: Next.js 16 with Turbopack and React 19.
- **Pattern**: MVVM (Model-View-ViewModel) decoupling presentation components from custom hooks (`usePortfolio`).
- **Styling**: Tailwind CSS v4 with bespoke Dark/Light theme design system (`ThemeContext`).
- **Bilingual Engine**: Real-time runtime language switching (Spanish / English) with local storage persistence.
- **Interactive Tools**:
  - **LoRa Mesh Telemetry Simulator**: Real-time multi-hop RF packet routing visualization.
  - **SOLID & Clean Architecture Explorer**: Interactive code inspector demonstrating SRP, OCP, LSP, ISP, DIP and Hexagonal layers.
  - **Device Studio Simulator**: Live interactive smartphone canvas (iPhone 15 Pro, Pixel 8, iPad Mini) for viewport auditing.
- **Serverless API**: Native Next.js Route Handlers (`/api/v1/health`, `/api/v1/telemetry/packet`, `/api/v1/contact`, `/api/v1/projects`) ready for zero-cost deployment on Vercel.

### 2. Enterprise Companion Microservice (`/backend`)
- **Framework**: NestJS 11 with Express runtime.
- **Standards**: SOLID principles, strict `ValidationPipe` with `class-validator`, `@nestjs/throttler` IP-based rate limiting, and global RFC 7807 exception filter.
- **Observability**: Request duration interceptor logging method, route, and latency in milliseconds.
- **Documentation**: Swagger OpenAPI 3.0 auto-generated documentation (`/api/docs`).
- **Testing**: 100% passing unit test suite with Jest (`7 passed, 7 total`).
- **Docker**: Multi-stage Alpine container running as unprivileged `USER node`.

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 22.x+
- npm 11.x+
- Docker & Docker Compose (optional)

### Running Frontend
```bash
cd frontend
npm install
npm run dev
# App running at: http://localhost:3000
```

### Running Backend (NestJS Microservice)
```bash
cd backend
npm install
npm run start:dev
# REST API running at: http://localhost:3001/api/v1
# Swagger Docs at: http://localhost:3001/api/docs
```

### Running Tests
```bash
cd backend
npm test
```

### Running with Docker Compose
```bash
docker compose up --build
```

---

## 📬 Contact & Socials

- **GitHub**: [https://github.com/JKiddo-dev](https://github.com/JKiddo-dev)
- **LinkedIn**: [https://www.linkedin.com/in/matias-aguilar-barria/](https://www.linkedin.com/in/matias-aguilar-barria/)
- **Email**: m.oaguilarbarria@gmail.com
- **Phone**: (+56) 9 5220 5342
