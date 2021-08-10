package handler

import (
	"net/http"
	"regexp"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/p12s/auction-house/api/common"
)

func (h *Handler) getLotById(c *gin.Context) {
	lotId := strings.TrimSpace(c.Param("id"))
	if !isValidUUID(lotId) {
		newErrorResponse(c, http.StatusBadRequest, "invalid lot id param")
		return
	}

	lot, err := h.services.Lot.GetById(lotId)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, lot)
}

func (h *Handler) getAllLots(c *gin.Context) {
	lists, err := h.services.Lot.GetAll()
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, getAllListsResponse{
		Data: lists,
	})
}

type getAllListsResponse struct {
	Data []common.Lot `json:"data"`
}

func isValidUUID(uuid string) bool {
	r := regexp.MustCompile("^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-4[a-fA-F0-9]{3}-[8|9|aA|bB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}$")
	return r.MatchString(uuid)
}
