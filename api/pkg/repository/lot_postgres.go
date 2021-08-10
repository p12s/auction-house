package repository

import (
	"fmt"

	"github.com/jmoiron/sqlx"
	"github.com/p12s/auction-house/api/common"
)

type LotPostgres struct {
	db *sqlx.DB
}

func NewLotPostgres(db *sqlx.DB) *LotPostgres {
	return &LotPostgres{db: db}
}

// GetAll - получение всех ЭЛЕМЕТОВ выбранного списка
func (l *LotPostgres) GetAll() ([]common.Lot, error) {
	var items []common.Lot
	query := fmt.Sprintf(`SELECT * FROM %s ORDER BY id ASC`, lotTable)
	if err := l.db.Select(&items, query); err != nil {
		return nil, err
	}

	return items, nil
}

// GetById - получение ЭЛЕМЕНТА
func (l *LotPostgres) GetById(lotId string) (common.Lot, error) {
	var item common.Lot
	query := fmt.Sprintf(`SELECT * FROM %s WHERE id = $1`, lotTable)
	if err := l.db.Get(&item, query, lotId); err != nil {
		return item, err
	}

	return item, nil
}
