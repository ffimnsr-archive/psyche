set shell := ["powershell.exe", "-c"]

run:
  yarn start

outdated:
  yarn upgrade-interactive

update:
  yarn up
