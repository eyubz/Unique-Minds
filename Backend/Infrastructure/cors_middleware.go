package infrastructure

import (
	"log"

	"github.com/gin-gonic/gin"
)


type Core struct{
}
type CoreInterface interface{
	CORSMiddleware() gin.HandlerFunc
}

func NewCorsMiddleware ()*Core{
	return &Core{
	}
}

func (c *Core) CORSMiddleware() gin.HandlerFunc {
    return func(ctx *gin.Context) {
        // Log to confirm execution
        log.Println("CORS Middleware executed")

        ctx.Writer.Header().Set("Access-Control-Allow-Origin", "*")
        ctx.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        ctx.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

        if ctx.Request.Method == "OPTIONS" {
            ctx.AbortWithStatus(204)
            return
        }

        ctx.Next()
    }
}
