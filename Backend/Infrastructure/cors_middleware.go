package infrastructure

import (
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
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	//	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
