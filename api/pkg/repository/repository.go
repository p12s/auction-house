package repository

import (
	"github.com/jmoiron/sqlx"
	"github.com/p12s/auction-house/api/common"
)

type Authorization interface {
	CreateUser(user common.User) (int, error)
	GetUser(username, password string) (common.User, error)
}

type Lot interface {
	GetAll() ([]common.Lot, error)
	GetById(lotId string) (common.Lot, error)
}

type Repository struct {
	Authorization
	Lot
}

func NewRepository(db *sqlx.DB) *Repository {
	return &Repository{
		Authorization: NewAuthPostgres(db),
		Lot:           NewLotPostgres(db),
	}
}
