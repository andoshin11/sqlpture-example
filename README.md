# sqlpture example
This is an example repository for [sqlpture](https://github.com/andoshin11/sqlpture), a type-level SQL interpretor.

This repository contains following:

- PostgreSQL DB
- Node.js API Server(express)

With this combination, you could get a sence of what it looks like to write fully type-safe backend application with Node.js + TypeScript.

## Step by Step Guide

Requirements:
- Docker
- Node.js

1. Starting up Database
 - `make start-db` to start PostgreSQL container
 - The container will be accessible on `localhost:15432`

2. Retore Database
  - `dvdrental.tar` is a dumpt PostgreSQL data which contains both migration history, and actual data
  - `make restore-db` to restore data
  - The database will be accesible on `postgres://postgres:mysecretpassword1234@localhost:15432/dvdrental`

3. Start Server
  - `make start-server` to start Node.js(Express) server, locally
  - The server will be acceible on `localhost:3010`
  - Make sure to restart the server everytime you change files under `/server`

4. Call API
