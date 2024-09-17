package infrastructure

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

type Core struct {
}

type CoreInterface interface {
    CORSMiddleware() gin.HandlerFunc
}

func NewCorsMiddleware() *Core {
    return &Core{}
}

func (c *Core) CORSMiddleware() gin.HandlerFunc {
    return func(ctx *gin.Context) {
        fmt.Println("Lopping through the CORS middleware")
        fmt.Println("CORS middleware executed for:", ctx.Request.Method, ctx.Request.URL.Path)
        ctx.Writer.Header().Set("Access-Control-Allow-Origin", "https://unique-minds.onrender.com")
        ctx.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        ctx.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
        ctx.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
        ctx.Writer.Header().Set("Access-Control-Expose-Headers", "Content-Length")
        if ctx.Request.Method == "OPTIONS" {
            fmt.Println("Preflight request handled")
            ctx.AbortWithStatus(204)
            return
        }
        ctx.Next()
    }
}
