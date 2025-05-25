package middleware

import (
    "net/http"
    "log"
)

type Middleware func(next http.Handler) http.Handler

func MiddlewareChain(ms ... Middleware) Middleware{
    return func(next http.Handler) http.Handler{
        for i := len(ms) - 1; i >= 0; i--{
            m := ms[i]
            next = m(next)
        }
        return next
    }
}

func LoggingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        log.Printf("Method: %s, Path: %s, RemoteAddr: %s, UserAgent: %s", r.Method, r.URL.Path, r.RemoteAddr, r.UserAgent())
        next.ServeHTTP(w, r)
    })
}

func CORSMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Access-Control-Allow-Origin", "*")
        w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
        w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
        next.ServeHTTP(w, r)
    })
}
