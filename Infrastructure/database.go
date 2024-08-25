package infrastucture

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type DB struct {
}

type DBInterface interface {
	ConnectDB(string, int)*mongo.Client
	CreateDB(string, int, string, string)*mongo.Collection
}
func NewDb() DBInterface{
	return &DB{}
}

func (d *DB) ConnectDB(url string, dbTimeout int)*mongo.Client {
	ctx, cancelCtx := context.WithTimeout(context.Background(), time.Duration(dbTimeout)*time.Second)
	defer cancelCtx()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(url))
	if err != nil{
		log.Fatal(err.Error())
	}
	err = client.Ping(ctx, nil)
	if err != nil{
		log.Fatal(err.Error())
	}
	fmt.Println("Connecting to DB")
	return client
}

func (d *DB) CreateDB(url string, dbTimeout int, dbName string, collectionName string)*mongo.Collection{
	connection := d.ConnectDB(url, dbTimeout)
	dbCollection := connection.Database(dbName).Collection(collectionName)
	return dbCollection
}

func (d *DB)CloseDb(client *mongo.Client){
	err := client.Disconnect(context.Background())
	if err != nil{
		log.Fatal(err.Error())
	}
	fmt.Println("Connection to DB closed")
}