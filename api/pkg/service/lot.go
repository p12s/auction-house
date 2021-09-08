package service

import (
	"github.com/p12s/auction-house/api/common"
	"github.com/p12s/auction-house/api/pkg/repository"
)

type LotService struct {
	repo repository.Lot
}

func NewLotService(repo repository.Lot) *LotService {
	return &LotService{repo: repo}
}

// GetAll - получение всех
func (s *LotService) GetAll() ([]common.Lot, error) {
	return s.repo.GetAll()
}

// GetById - получение по id
func (s *LotService) GetById(lotId string) (common.Lot, error) {
	return s.repo.GetById(lotId)
}
