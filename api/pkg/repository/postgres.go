package repository

import (
	"fmt"

	"github.com/jmoiron/sqlx"
)

const (
	usersTable = "users"
)

type Config struct {
	Driver      string
	Host        string
	Port        string
	Username    string
	Password    string
	DBName      string
	SSLMode     string
	SSLRootCert string
}

func NewPostgresDB(cfg Config) (*sqlx.DB, error) { // sslrootcert=%s
	db, err := sqlx.Open(cfg.Driver, fmt.Sprintf("host=%s port=%s dbname=%s user=%s password=%s sslmode=%s",
		cfg.Host, cfg.Port, cfg.DBName, cfg.Username, cfg.Password, cfg.SSLMode)) //, cfg.SSLRootCert
	if err != nil {
		return nil, err
	}

	err = db.Ping()
	if err != nil {
		return nil, err
	}

	return db, nil
}
