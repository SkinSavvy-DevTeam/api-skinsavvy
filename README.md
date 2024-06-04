# SkinSavvy API

[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)
![GitHub License](https://img.shields.io/github/license/SkinSavvy-DevTeam/api-skinsavvy)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/SkinSavvy-DevTeam/api-skinsavvy/staging-cloud-run-deployment.yml?branch=staging&label=build%20staging)

A RESTful interface to interact with the backend services.

## To-do 📜

- [ ] Create `Articles` table
- [ ] CRUD on `/articles` endpoint
- [ ] Add responses example in the docs page
- [ ] Meaningful message when client error emitted
- [ ] Feature to provide solutions to skin diseases
- [ ] CRUD Skin Dieseases
- [ ] Update response status code
- [x] Add request query to docs
- [ ] To `POST` an article, user must attach the `thumbnailId`. Therefore, user either upload a new thumbnail first to get a `thumbnailId`, or retrieve one of the available thumbnail. Cuz you cannot send these two types of request simultaneously
