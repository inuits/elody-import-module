<p align="center">
  <a href="https://elody.eu"><img src="https://elody.eu/images/logo.svg" alt="Elody" width="96" /></a>
</p>

<p align="center">Part of <a href="https://elody.eu">Elody</a> — the open semantic data platform.<br /><a href="https://docs.elody.eu">Documentation</a> · <a href="https://elody.eu">Website</a></p>

# Import Module

A `graphql-modules` module that lets the frontend browse the importer service's filesystem and trigger imports. It ships a small GraphQL schema, one data source, and no Express endpoints — everything goes through GraphQL.

## What's included

| Layer | What it adds |
|-------|-------------|
| GraphQL schema | `Directory`, `ImportReturn`, one query, one mutation |
| GraphQL resolvers | Directory listing + start-import calls, with graceful fallback if the service URL is not configured |
| DataSource | `ImportAPI` — injected into every resolver context via declaration merging on `base-graphql`'s `DataSources` |

---

## GraphQL API

### Query

| Query | Description |
|-------|-------------|
| `Directories(dir: String)` | List directories under `dir` on the importer's filesystem. Returns `[]` if `ImportAPI` is not registered. |

### Mutation

| Mutation | Description |
|----------|-------------|
| `postStartImport(folder: String!)` | Start an import job for the given folder. Returns an empty `ImportReturn` if `ImportAPI` is not registered. |

### Types

```graphql
type Directory {
  id: String
  dir: String
  has_subdirs: Boolean
  parent: String!
}

type ImportReturn {
  status: Int
  message_id: String
  count: Int
  job_id: String
}
```

---

## DataSource

`ImportAPI` extends `AuthRESTDataSource` from `base-graphql` and targets `environment.api.fileSystemImporterServiceUrl`.

| Method | REST call | Description |
|--------|-----------|-------------|
| `getDirectories(dir)` | `GET /importer/directories?dir={dir}` | List directories; response is passed through `extractParentDirectory` to derive the `parent` field for each entry. |
| `startImport(folder)` | `POST /importer/start` (body: `{ "selected-folder": folder }`) | Kick off an import job for the given folder. |

If `fileSystemImporterServiceUrl` is not set in the environment, resolvers short-circuit to safe empty responses rather than throwing — the module is opt-in per deployment.

---

## Using the module

Unlike `mediafileModule`, this one exports the raw pieces — the consumer wires them into the `baseGraphql` config directly:

```ts
import start, { ElodyModuleConfig } from 'base-graphql';
import { importModule, ImportAPI } from 'import-module';

const config: ElodyModuleConfig = {
  modules: [importModule, /* ... */],
  dataSources: { ImportAPI, /* ... */ },
};

start({ customModuleConfig: config, /* ... */ });
```

The module declaration-merges `ImportAPI` into `base-graphql`'s `DataSources` interface, so `dataSources.ImportAPI` is fully typed inside resolvers without extra setup.

---

## Environment

| Variable / config key | Effect |
|-----------------------|--------|
| `api.fileSystemImporterServiceUrl` | Base URL of the file-system-importer service. If unset, `Directories` returns `[]` and `postStartImport` returns `{}`. |
