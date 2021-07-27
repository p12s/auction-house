package repository

import (
	"github.com/jmoiron/sqlx"
	"github.com/p12s/auction-house/api"
)

type Authorization interface {
	CreateUser(user common.User) (int, error)
	GetUser(username, password string) (common.User, error)
}

type Repository struct {
	Authorization
}

func NewRepository(db *sqlx.DB) *Repository {
	return &Repository{
		Authorization: NewAuthPostgres(db),
	}
}