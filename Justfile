set shell := ["powershell.exe", "-c"]

run:
  yarn start

outdated:
  yarn outdated

update:
  yarn update

schema-update:
  apollo client:download-schema -c apollo.manager.config.js schema.manager.graphql
  apollo client:download-schema -c apollo.member.config.js schema.member.graphql
  apollo client:download-schema -c apollo.anonymous.config.js schema.anonymous.graphql