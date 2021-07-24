package main

import (
	"fmt"
	"net/http"
	_ "net/http/pprof" // Для live профилировки

	"github.com/sirupsen/logrus"
)

func main() {
	fmt.Println("📍📍📍 start 📍📍📍")
	http.HandleFunc("/", HelloServer)
	http.HandleFunc("/hello", HelloServer)
	http.HandleFunc("/test", HelloServer)
	http.HandleFunc("/health", Health)
	http.HandleFunc("/new", NewResponse)
	//fmt.Println("API_PORT: ", os.Getenv("API_PORT"))
	//err := http.ListenAndServe(":"+os.Getenv("API_PORT"), nil)

	err := http.ListenAndServe(":8081", nil)
	if err != nil {
		fmt.Println("error server running:", err.Error())
		logrus.Fatalf("👺👺👺 error server running: %s\n", err.Error())
	}

	fmt.Println("📍📍📍 END!! 📍📍📍")
}

func HelloServer(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "text/plain")

	_, err := fmt.Fprintf(w, "📳📳📳Hello, %s!📳📳📳\n", r.URL.Path[1:])
	if err != nil {
		logrus.Fatalf("⁉️ print message: %s\n", err.Error())
	}
}

func Health(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "text/plain")

	_, err := fmt.Fprintf(w, "OK from Go api\n")
	if err != nil {
		logrus.Fatalf("⁉️ print message: %s\n", err.Error())
	}
}

func NewResponse(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "text/plain")

	_, err := fmt.Fprintf(w, "I am new here🌔🌏☄️💥\n")
	if err != nil {
		logrus.Fatalf("⁉️ print message: %s\n", err.Error())
	}
}
