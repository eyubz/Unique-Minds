package infrastucture

import (
	domain "e-learning/Domain"
	"os"

	"github.com/joho/godotenv"
	"github.com/rs/zerolog/log"
)

func LoadEnv() (*domain.Config, errors){
	err := godotenv.Load()
	if err != nil {
		return domain.Config{}, errors.New("Error loading environmental variable")
	}
	dbUrl := os.Getenv("DATABASE_URL")
	dbName := os.Getenv("DB_NAME")
	dbPort := os.Getenv("DB_PORT")
	userCollection := os.Getenv("USER_COLLECTION")
	port := os.Getenv("PORT")
	timeOut := os.Getenv("CONTEXT_TIMEOUT")
	user_collection := os.Getenv("USER_COLLECTION")
	return &domain.Config{
		DatabaseUrl:    dbUrl,
		DBName:         dbName,
		DatabasePort:   dbPort,
		UserCollection: userCollection,
		Port: port,
		ContextTimeout: timeOut,
		UserCollection: user_collection
	}, nil
}