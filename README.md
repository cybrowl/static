# Static

Demo for scaling file storage

## Components library UI

https://github.com/cybrowl/static-components

## Getting Started

```
npm install

dfx deploy file_scaling_manager --argument='(false)'

dfx canister call file_scaling_manager init

dfx deploy file_storage --argument='(false)'
```

NOTE: false is local and true is production

## Unit Testing

```
make
```

## Canister Testing

```
npm run test-all
```
