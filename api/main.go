package main

import (
	"altscore-api/server"
	"log"
)

const ADDR = ":8000"

func main(){
	app := server.NewApp(ADDR)

	mux := app.Mount()

	err := app.Run(mux)

	if err != nil{
		log.Fatalf("Error running server: %s", err)
	}
}
