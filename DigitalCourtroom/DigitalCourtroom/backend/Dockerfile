FROM rust:alpine AS builder

WORKDIR /app
RUN apk add musl-dev openssl-dev openssl-libs-static
COPY src src/
COPY Cargo.toml .
COPY Cargo.lock .
RUN rustup target add x86_64-unknown-linux-musl
RUN cargo install sqlx-cli
COPY migrations migrations/
ENV SQLX_OFFLINE=true
RUN cargo build --target x86_64-unknown-linux-musl

FROM rust:alpine

WORKDIR /app
COPY --from=builder $HOME/.cargo/bin/sqlx-cli sqlx-cli
RUN sqlx database setup
COPY --from=builder /app/target/x86_64-unknown-linux-musl/debug /app
CMD ["./backend"]
