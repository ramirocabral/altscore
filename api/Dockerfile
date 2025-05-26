# backend build
FROM golang:1.24 AS backend-builder
WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . . 
RUN CGO_ENABLED=0 GOOS=linux go build -o /api main.go

# final stage
FROM debian:stable-slim
WORKDIR /app

RUN apt-get update && \
    rm -rf /var/lib/apt/lists/*

COPY --from=backend-builder /api /api

COPY --from=frontend-builder /client/dist /dist

EXPOSE 8080 

CMD ["/api"]
