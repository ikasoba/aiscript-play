FROM denoland/deno:1.36.4

ARG GIT_REVISION
ENV DENO_DEPLOYMENT_ID=${GIT_REVISION}

WORKDIR /miplay-hub/
COPY frontend .

RUN deno cache main.ts

EXPOSE 8000

CMD ["run", "-A", "--unstable", "./main.ts"]