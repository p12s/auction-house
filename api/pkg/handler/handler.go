package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/p12s/auction-house/api/pkg/service"
)

// Handler - хендлер, принимающий слой сервисов
type Handler struct {
	services *service.Service
}

// NewHandler - конструируем хендлер передачей в него сервиса
func NewHandler(services *service.Service) *Handler {
	return &Handler{services: services}
}

// InitRoutes - инициализаруем пути и их хендлеры
func (h *Handler) InitRoutes() *gin.Engine {
	router := gin.New()

	router.GET("/health", h.health)

	auth := router.Group("/auth")
	{
		auth.POST("/sign-up", h.signUp)
		auth.POST("/sign-in", h.signIn)
		// TODO отправка подтверждения на мыло
		// TODO получение хита подтверждения мейла, подтверждение регистрации - активация польз.
		// TODO регистрация через соц. сети
		// TODO восстановление пароля
		// TODO смена пароля/мейла
	}

	lot := router.Group("/lot") // идентификация не нужна, чтобы незарегистрированные посетители могли просматривать лоты
	{
		lot.GET("/", h.getAllLots)
		lot.GET("/:id", h.getLotById)
	}

	api := router.Group("/api", h.userIdentity) // TODO without /api
	{
		company := api.Group("/company")
		{
			company.POST("/", h.signIn)
			company.GET("/", h.signIn)
		}
	}
	return router
}
