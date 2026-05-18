.PHONY: help html serve clean
.DEFAULT_GOAL := help

help:
	@grep ": ##" Makefile | grep -v grep | tr -d '#'

html: ## Build site in `./_build`
html:
	myst build

serve: ## Serve site, typically on http://localhost:3000
serve:
	myst start

clean: ## Remove built files
clean:
	myst clean
