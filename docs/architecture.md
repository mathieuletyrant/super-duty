# Super Duty Architecture

This document describes the architecture of the Super Duty project.

## Overview

Super Duty follows a Domain-Driven Design (DDD) architecture, which separates concerns into distinct layers: 

```
src/
├── domains/ # Business logic and domain rules
│ ├── calendar/ # Calendar-related domain logic
│ └── support/ # Support rotation domain logic
├── infrastructure/ # Implementation details
│ └── filesystemDatabase/ # Database implementation
├── providers/ # Utility services
└── index.ts # Application entry point
```
## Key Components

### Domains

The `domains` directory contains the core business logic and rules. It defines interfaces and types that represent the business concepts.

- **support**: Contains interfaces and types for managing maintenance rotations
- **calendar**: Contains logic for generating calendar files (ICS)

### Infrastructure

The `infrastructure` directory contains implementations of the domain interfaces. It handles the technical details of how the business logic is executed.

- **filesystemDatabase**: Implements database operations using the filesystem
- **rotation.ts**: Implements the rotation logic for maintenance duties

### Providers

The `providers` directory contains utility services that can be used across the application.

- **git.ts**: Provides Git operations for version control
- **database.ts**: Provides database access utilities

## Dependency Flow

The application follows a dependency rule where:

- Domains should not depend on infrastructure or providers
- Infrastructure can depend on domains
- Providers can be used by both domains and infrastructure

## Infrastructure Instances

The application uses a singleton pattern to manage infrastructure instances through the `getInfrastructureInstances()` function, which ensures that only one instance of each infrastructure component exists during runtime. 