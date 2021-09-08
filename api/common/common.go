package common

import (
	"time"

	"database/sql/driver"
	"errors"

	"github.com/google/uuid"
)

type NullFloat32 float32

func (f *NullFloat32) Scan(value interface{}) error {
	if value == nil {
		*f = 0
		return nil
	}
	float32Val, ok := value.(float32)
	if !ok {
		return errors.New("Can't be convert into float32")
	}
	*f = NullFloat32(float32Val)
	return nil
}

func (f NullFloat32) Value() (driver.Value, error) {
	if f == 0 {
		return nil, nil
	}
	return float32(f), nil
}

type User struct {
	Id       int    `json:"-" db:"id"`
	Name     string `json:"name" binding:"required"`
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type Lot struct {
	Id                   uuid.UUID   `json:"id" db:"id"`
	Title                string      `json:"title" db:"title"`
	Description          string      `json:"description" db:"description"`
	DateLotCreate        time.Time   `json:"date_lot_create" db:"date_lot_create"`
	DateLotUpdate        time.Time   `json:"date_lot_update" db:"date_lot_update"`
	DateSellingStart     time.Time   `json:"date_selling_start" db:"date_selling_start"`
	DateSellingFinish    time.Time   `json:"date_selling_finish" db:"date_selling_finish"`
	PriceMin             float32     `json:"price_min" db:"price_min"`
	PriceStart           float32     `json:"price_start" db:"price_start"`
	PriceRaisingUpStep   float32     `json:"price_raising_up_step" db:"price_raising_up_step"`
	PriceRaisingDownStep float32     `json:"price_raising_down_step" db:"price_raising_down_step"`
	PriceFinishSelling   NullFloat32 `json:"price_finish_selling" db:"price_finish_selling"`
	Status               Status      `json:"status_id" db:"status_id"`
	Comment              string      `json:"comment" db:"comment"`
	CategoryId           int         `json:"category_id" db:"category_id"`
}

type Status int

const (
	Edited      Status = iota // Создается, редактируется в процессе подготовки
	Active                    // Активен, выставлен в участие
	Closed                    // Завершен, успешно продан
	NotInDemand               // Не востребован, никто не купил
)
