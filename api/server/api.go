package server

import (
	"altscore-api/server/middleware"
	"log"
	"net/http"
	"time"
)

type app struct {
	Addr	string
}

func NewApp (addr string) (*app){
    return &app{
        Addr: addr,
    }
}

func (a *app) Mount() http.Handler{
    mux := http.NewServeMux()

    chain := middleware.MiddlewareChain(
        middleware.LoggingMiddleware,
        middleware.CORSMiddleware,
    )

    mux.HandleFunc("GET /status", a.GetStatus)
    mux.HandleFunc("POST /teapot", a.Teapot)
    mux.HandleFunc("GET /repair-bay", a.GetIndex)
    // /phase-change-diagram?pressure=10
    mux.HandleFunc("GET /phase-change-diagram", a.GetSpecificVolumes)

    v1 := http.NewServeMux()

    v1.Handle("/api/v1/", http.StripPrefix("/api/v1", mux))

    return chain(v1)
}

func (app *app) Run(handler http.Handler) error {
    srv := &http.Server{
	    Addr:         app.Addr,
	    Handler:      handler,
	    WriteTimeout: time.Second * 30,
	    ReadTimeout:  time.Second * 10,
	    IdleTimeout:  time.Minute,
    }

    log.Printf("Starting server on port %s", app.Addr)

    return srv.ListenAndServe()
}
