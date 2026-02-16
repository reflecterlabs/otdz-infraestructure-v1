# OTDZ Infrastructure - Unified Agentic Framework  🚀

Bienvenido a la infraestructura central de **OPTZ**, un ecosistema diseñado para potenciar la adopción de Starknet mediante la integración de Social Login, Smart Wallets y el protocolo de identidad de agentes **ERC-8004**.

Este repositorio es un monorepo gestionado con **pnpm workspaces** y **Turborepo**, garantizando un desarrollo modular, escalable y eficiente.

---

## 🏗️ Arquitectura del Monorepo

La estructura está dividida en aplicaciones (apps) y paquetes reutilizables (packages):

| Componente | Ruta | Descripción |
| :--- | :--- | :--- |
| **Agent Dashboard** | [`/apps/agent-dashboard`](./apps/agent-dashboard) | Interfaz administrativa (Next.js) para la gestión de agentes, wallets y analíticas. |
| **Wallet Provider** | [`/packages/wallet-provider`](./packages/wallet-provider) | SDK que orquesta la autenticación (Clerk) y la abstracción de cuenta (Chipi Pay). |
| **Agentic Core** | [`/packages/agentic-core`](./packages/agentic-core) | El corazón del protocolo: gestión de identidad, reputación y validación on-chain. |
| **Shared Configs** | [`/packages/shared-configs`](./packages/shared-configs) | Centralización de ABIs, constantes de red (Starknet Mainnet) y utilidades compartidas. |

---

## ✨ Características Principales

-   **Social Login Native:** Autenticación fluida con Google, Apple y más vía Clerk.
-   **Smart Wallets Instantáneas:** Despliegue automático de wallets inteligentes en Starknet al registro.
-   **Identidad ERC-8004:** Implementación de identidad única y reputación para agentes autónomos.
-   **Producción Ready:** Configurado por defecto para operar en **Starknet Mainnet**.
-   **Turbocharged Workflow:** Builds ultra-rápidos y compartición de caché mediante Turborepo.

---

## 🚀 Inicio Rápido para Desarrolladores

### 1. Requisitos Previos

Asegúrate de tener instalado:
- **Node.js** (v18 o superior)
- **pnpm** (Preferiblemente la última versión estable)

### 2. Instalación

Desde la raíz del proyecto, ejecuta:

```bash
pnpm install
```

### 3. Configuración de Variables de Entorno

El sistema requiere configuración en los siguientes niveles:

*   **Dashboard (`/apps/agent-dashboard`)**: Configura el `.env.local` con las claves de Clerk y endpoints de API.
*   **Wallet Provider (`/packages/wallet-provider`)**: Configura las credenciales necesarias para la interacción con los proveedores de AA (Account Abstraction).

---

## 🛠️ Scripts de Desarrollo

Puedes gestionar todo el proyecto desde la raíz:

| Comando | Acción |
| :--- | :--- |
| `pnpm dev` | Inicia todas las apps y paquetes en modo watch/dev. |
| `pnpm build` | Compila todo el monorepo para producción. |
| `pnpm lint` | Analiza el código en busca de errores de estilo o lógica. |
| `pnpm test` | Ejecuta las suites de pruebas en todos los módulos. |

> **Tip:** Para trabajar en un solo módulo, usa filtros:
> `pnpm --filter agent-dashboard dev`

---

## 🔐 Identidad y Seguridad

El protocolo **ERC-8004** integrado permite que cada interacción de un agente sea trazable y verificable. La clave pública de la Smart Wallet se registra en el `IdentityRegistry` de Starknet, vinculándola permanentemente a la identidad del agente.

---

## 📄 Licencia

Este proyecto es propiedad privada de **OTDZ Infrastructure**. Todos los derechos reservados.

---

Desarrollado con precisión para el futuro de la Web3 por el equipo de **Reflecterlabs**. 🌐
