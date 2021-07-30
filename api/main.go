package main

import (
	"context"
	"fmt"
	"net/http"
	_ "net/http/pprof" // Для live профилировки
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/getsentry/sentry-go"
	"github.com/p12s/auction-house/api/pkg/handler"
	"github.com/p12s/auction-house/api/pkg/repository"
	"github.com/p12s/auction-house/api/pkg/service"

	_ "github.com/lib/pq"
	"github.com/sirupsen/logrus"
)

func main() {
	if os.Getenv("APP_ENV") == "prod" { // TODO обернуть в декоратор логер? если в нем переменная окружения будет определена - будет отпраляться
		err := sentry.Init(sentry.ClientOptions{
			Dsn: os.Getenv("SENTRY_DSN"),
		})
		if err != nil {
			logrus.Fatalf("sentry.Init: %s", err)
		} // time="2021-07-25T19:46:30Z" level=fatal msg="sentry.Init: [Sentry] DsnParseError: invalid scheme"
		// Flush buffered events before the program terminates.
		defer sentry.Flush(2 * time.Second)
	}

	logrus.SetFormatter(new(logrus.JSONFormatter))

	fmt.Println("POSTGRES_HOST:", os.Getenv("POSTGRES_HOST"))
	fmt.Println("POSTGRES_PORT:", os.Getenv("POSTGRES_PORT"))
	fmt.Println("POSTGRES_USER:", os.Getenv("POSTGRES_USER"))
	fmt.Println("POSTGRES_PASSWORD:", os.Getenv("POSTGRES_PASSWORD"))
	fmt.Println("POSTGRES_DB:", os.Getenv("POSTGRES_DB"))
	fmt.Println("POSTGRES_SSL_MODE:", os.Getenv("POSTGRES_SSL_MODE"))

	db, err := repository.NewPostgresDB(repository.Config{
		Driver:   "postgres",
		Host:     os.Getenv("POSTGRES_HOST"),
		Port:     os.Getenv("POSTGRES_PORT"),
		Username: os.Getenv("POSTGRES_USER"),
		Password: os.Getenv("POSTGRES_PASSWORD"),
		DBName:   os.Getenv("POSTGRES_DB"),
		SSLMode:  os.Getenv("POSTGRES_SSL_MODE"),
	})
	if err != nil {
		logrus.Fatalf("👺👺👺 failed to initialize db: %s\n", err.Error())
		if os.Getenv("APP_ENV") == "prod" {
			sentry.CaptureException(err)
		}
	}

	repos := repository.NewRepository(db)
	services := service.NewService(repos)
	handlers := handler.NewHandler(services)

	srv := new(Server)
	go func() {
		if err := srv.Run(os.Getenv("API_PORT"), handlers.InitRoutes()); err != nil {
			logrus.Fatalf("error while running http server: %s\n", err.Error()) // TODO logrus убрать, выводить в stderr + sentry
			if os.Getenv("APP_ENV") == "prod" {
				sentry.CaptureException(err)
			}
		}
	}()
	logrus.Print("😀😀😀 service started 😀😀😀!!!")

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGTERM, syscall.SIGINT)
	<-quit

	logrus.Print("🧟🧟🧟 service shutting down 🧟🧟🧟")

	if err := srv.Shutdown(context.Background()); err != nil {
		logrus.Errorf("error occurred on server shutting down: %s", err.Error())
		if os.Getenv("APP_ENV") == "prod" {
			sentry.CaptureException(err)
		}
	}

	if err := db.Close(); err != nil {
		logrus.Errorf("error occurred on db connection close: %s", err.Error())
		if os.Getenv("APP_ENV") == "prod" {
			sentry.CaptureException(err)
		}
	}
}

// Server - сервер REST-API
type Server struct {
	httpServer *http.Server
}

// Run - запуск
func (s *Server) Run(port string, handler http.Handler) error {
	s.httpServer = &http.Server{
		Addr:           ":" + port,
		Handler:        handler,
		MaxHeaderBytes: 1 << 20, // 1 MB
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
	}
	return s.httpServer.ListenAndServe()
}

// Shutdown - grace-full-выключение
func (s *Server) Shutdown(ctx context.Context) error {
	return s.httpServer.Shutdown(ctx)
}
