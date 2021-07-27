FROM migrate/migrate:latest as migrate

FROM postgres:latest

COPY --from=migrate /usr/local/bin/migrate /usr/local/bin/migrate

COPY ./schema /migrations

RUN mkdir -p /var/lib/postgresql/data
RUN chown -R postgres:postgres /var/lib/postgresql/

COPY ./docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
USER postgres

CMD ["/docker-entrypoint.sh"]
