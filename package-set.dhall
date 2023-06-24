let upstream = https://github.com/dfinity/vessel-package-set/releases/download/mo-0.9.3-20230619/package-set.dhall

let Package = { name : Text, version : Text, repo : Text, dependencies : List Text }

let additions = [
  { 
    name = "upload-file",
    repo = "https://github.com/cybrowl/upload-file",
    version = "main", 
    dependencies = [] : List Text
  },
  {
    name = "hashmap",
    repo = "https://github.com/ZhenyaUsenko/motoko-hash-map",
    version = "v8.1.0",
    dependencies = [] : List Text
  },
] : List Package

let overrides = [
  { name = "base"
  , repo = "https://github.com/dfinity/motoko-base"
  , version = "master"
  , dependencies = [] : List Text
  },
] : List Package

in  upstream # additions # overrides
