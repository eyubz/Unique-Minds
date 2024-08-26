package infrastucture

import (
	domain "e-learning/Domain"
	"os"

	"github.com/joho/godotenv"
	"github.com/rs/zerolog/log"
)

func LoadEnv() *domain.Config{
	err := godotenv.Load()
	if err != nil {
		log.Fatal()
		return nil
	}
	dbUrl := os.Getenv("DATABASE_URL")
	dbName := os.Getenv("DB_NAME")
	dbPort := os.Getenv("DB_PORT")
	userCollection := os.Getenv("USER_COLLECTION")
	return &domain.Config{
		DatabaseUrl:    dbUrl,
		DBName:         dbName,
		DatabasePort:   dbPort,
		UserCollection: userCollection,
	}

}