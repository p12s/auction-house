package service

import (
	"github.com/p12s/auction-house/api/common"
	"github.com/p12s/auction-house/api/pkg/repository"
)

//go:generate go run github.com/golang/mock/mockgen -source=service.go -destination=mocks/mock.go

type Authorization interface {
	CreateUser(user common.User) (int, error)
	GenerateToken(username, password string) (string, error)
	ParseToken(token string) (int, error)
}

type Lot interface {
	GetAll() ([]common.Lot, error)
	GetById(lotId string) (common.Lot, error)
}

type Service struct {
	Authorization
	Lot
}

func NewService(repos *repository.Repository) *Service {
	return &Service{
		Authorization: NewAuthService(repos.Authorization),
		Lot:           NewLotService(repos.Lot),
	}
}
