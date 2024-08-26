package main
import  (
	infrastructure "e-learning/Infrastructure"
	router "e-learning/Routers"
)

func main(){
	config , err := infrastructure.LoadEnv()
	if err != nil{
		fmt.Println(err.Error())
	}
	server := gin.Default()
	router.Router(server, config, timeout)
	server.Run(fmt.Sprintf(":%d", config.Port))
}