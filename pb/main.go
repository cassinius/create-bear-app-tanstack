package main

import (
	"log"
	"net/http"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func main() {
	app := pocketbase.New()

	app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		se.Router.GET("/v1/hello/:name", func(e *core.RequestEvent) error {
			name := e.Request.PathValue("name")

			return e.JSON(http.StatusOK, map[string]string{"message": "Hello " + name})
		})

		return se.Next()
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
