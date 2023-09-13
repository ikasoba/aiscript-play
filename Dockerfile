FROM denoland/deno:1.36.4

WORKDIR /miplay-hub/
COPY frontend .

RUN deno cache main.ts

EXPOSE 8000

CMD ["run", "-A", "--unstable", "./main.ts"]